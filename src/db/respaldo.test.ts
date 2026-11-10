import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./db', async (orig) => {
  const m = await orig<typeof import('./db')>();
  return { ...m, db: m.createDB(`resp-${Math.random()}`) };
});

const { db } = await import('./db');
const { aplicarSeed } = await import('./seed');
const { exportarEstado, importarEstado } = await import('./respaldo');
const acts = await import('./actividades');
const gastos = await import('./gastos');
const pend = await import('./pendientes');

beforeEach(async () => {
  await Promise.all(db.tables.map((t) => t.clear()));
  await aplicarSeed(db, { forzar: true });
});

describe('exportar e importar JSON (pasar datos entre celular y compu)', () => {
  it('lo exportado se puede volver a importar en un dispositivo limpio', async () => {
    await acts.setEstado('2027-02-13-02', 'hecho');
    await gastos.agregarGasto({ fecha: '2027-02-13', categoria: 'Comida', monto: 200, moneda: 'MXN', nota: 'tacos' });
    await pend.agregarPendiente({ titulo: 'Comprar adaptador', grupo: 'Más adelante' });
    const json = await exportarEstado();

    await Promise.all(db.tables.map((t) => t.clear()));
    await aplicarSeed(db, { forzar: true });
    const r = await importarEstado(json);
    expect(r.nuevos).toBe(2); // el gasto y la tarea nueva
    expect(r.actualizados).toBe(1); // la actividad marcada
    expect((await db.actividades.get('2027-02-13-02'))?.estado).toBe('hecho');
    expect(await db.gastos.count()).toBe(1);
    expect((await db.pendientes.toArray()).some((p) => p.titulo === 'Comprar adaptador')).toBe(true);
  });

  it('gana el cambio más reciente y lo borrado queda borrado', async () => {
    const json = await exportarEstado();
    const otro = JSON.parse(json);
    // En "el otro dispositivo": nota más nueva y una actividad borrada.
    otro.tablas.actividades = otro.tablas.actividades.map((a: { id: string }) =>
      a.id === '2027-02-14-01' ? { ...a, nota: 'del celu', updatedAt: '2099-01-01T00:00:00.000Z' } : a,
    );
    otro.borrados = ['actividades:2027-02-14-09'];
    await importarEstado(JSON.stringify(otro));
    expect((await db.actividades.get('2027-02-14-01'))?.nota).toBe('del celu');
    expect(await db.actividades.get('2027-02-14-09')).toBeUndefined();
    // Importar dos veces no cambia nada.
    expect(await importarEstado(JSON.stringify(otro))).toEqual({ nuevos: 0, actualizados: 0, borrados: 0 });
  });

  it('rechaza archivos que no son un respaldo', async () => {
    await expect(importarEstado('hola')).rejects.toThrow('no es JSON');
    await expect(importarEstado('{"format":"finanzas-backup"}')).rejects.toThrow('no es un respaldo de esta app');
  });

  it('borrar un gasto y deshacer', async () => {
    const g = await gastos.agregarGasto({ fecha: '2027-02-15', categoria: 'Transporte', monto: 75, moneda: 'MXN' });
    const borrado = await gastos.borrarGasto(g.id);
    expect(await db.gastos.count()).toBe(0);
    await gastos.deshacerBorradoGasto(borrado!);
    expect(await db.gastos.count()).toBe(1);
    expect((await db.meta.get('borradosSeed'))?.value).toEqual([]);
  });
});
