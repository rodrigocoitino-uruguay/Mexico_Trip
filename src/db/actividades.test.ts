import { beforeEach, describe, expect, it, vi } from 'vitest';

// Cada test usa su propia base (el módulo `db` es un singleton).
vi.mock('./db', async (orig) => {
  const m = await orig<typeof import('./db')>();
  return { ...m, db: m.createDB(`acts-${Math.random()}`) };
});

const { db } = await import('./db');
const { aplicarSeed } = await import('./seed');
const acts = await import('./actividades');

beforeEach(async () => {
  await Promise.all([db.actividades.clear(), db.meta.clear()]);
  await aplicarSeed(db, { forzar: true });
});

describe('acciones sobre actividades (se guardan en IndexedDB)', () => {
  it('hecho, nota y gasto real', async () => {
    await acts.setEstado('2027-02-13-02', 'hecho');
    await acts.setNota('2027-02-13-02', '  increíble  ');
    await acts.setGastoReal('2027-02-13-02', 216);
    const a = await db.actividades.get('2027-02-13-02');
    expect([a?.estado, a?.nota, a?.gastoRealMXN]).toEqual(['hecho', 'increíble', 216]);
  });

  it('mover a otro día', async () => {
    await acts.mover('2027-02-13-07', '2027-02-15');
    const a = await db.actividades.get('2027-02-13-07');
    expect(a?.diaId).toBe('2027-02-15');
    expect(await db.actividades.where('diaId').equals('2027-02-13').count()).toBe(6);
  });

  it('borrar y deshacer; lo borrado no vuelve con el seed', async () => {
    const borrada = await acts.borrar('2027-02-14-09');
    expect(await db.actividades.get('2027-02-14-09')).toBeUndefined();
    await aplicarSeed(db, { forzar: true });
    expect(await db.actividades.get('2027-02-14-09')).toBeUndefined();
    await acts.deshacerBorrado(borrada!);
    expect((await db.actividades.get('2027-02-14-09'))?.titulo).toBe('Salón Los Ángeles');
    expect((await db.meta.get('borradosSeed'))?.value).not.toContain('actividades:2027-02-14-09');
  });

  it('editar la hora y agregar una nueva', async () => {
    await acts.editar('2027-02-12-04', { hora: '17:30' });
    expect((await db.actividades.get('2027-02-12-04'))?.editadoPorUsuario).toBe(true);
    const n = await acts.agregar('2027-02-12', { hora: '20:30', titulo: 'Churros', categoria: 'comida', descripcion: '' });
    const dia = (await db.actividades.where('diaId').equals('2027-02-12').sortBy('orden')).map((a) => a.titulo);
    expect(dia.indexOf('Churros')).toBe(dia.indexOf('A dormir') - 1);
    expect(n.estado).toBe('pendiente');
  });

  it('activar una opcional', async () => {
    await acts.setActiva('2027-02-20-01', true);
    expect((await db.actividades.get('2027-02-20-01'))?.activa).toBe(true);
  });
});
