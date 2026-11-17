import { beforeEach, describe, expect, it } from 'vitest';
import { SEED } from '../data/seed';
import { planRetiros, planSeedSync } from '../domain/seedSync';
import type { Actividad } from '../domain/types';
import { createDB, type ViajeDB } from './db';
import { aplicarSeed, marcarBorradoSeed, restaurarSeed } from './seed';

let db: ViajeDB;
let n = 0;

beforeEach(async () => {
  db = createDB(`test-${++n}`);
  await db.open();
});

describe('aplicarSeed', () => {
  it('carga todo la primera vez y no repite', async () => {
    expect(await aplicarSeed(db)).toBe(true);
    expect(await db.dias.count()).toBe(SEED.dias.length);
    expect(await db.actividades.count()).toBe(SEED.actividades.length);
    expect(await db.alojamientos.count()).toBe(9);
    expect((await db.ajustes.get('ajustes'))?.tipoCambio).toBe(18.7);
    expect(await aplicarSeed(db)).toBe(false);
  });

  it('restaurar borra lo tuyo y vuelve al original', async () => {
    await aplicarSeed(db);
    await db.actividades.update('2027-02-13-02', { estado: 'hecho', nota: 'genial' });
    await db.gastos.add({ id: 'g1', updatedAt: '', fecha: '2027-02-13', categoria: 'Comida', monto: 100, moneda: 'MXN' });
    await db.actividades.delete('2027-02-13-03');
    await marcarBorradoSeed(db, 'actividades', '2027-02-13-03');
    await restaurarSeed(db);
    expect((await db.actividades.get('2027-02-13-02'))?.estado).toBe('pendiente');
    expect(await db.actividades.get('2027-02-13-03')).toBeDefined();
    expect(await db.gastos.count()).toBe(0);
  });
});

describe('planRetiros (borrar lo que el seed ya no tiene)', () => {
  const fila = (id: string, extra: object = {}) => ({ id, updatedAt: '', delSeed: true as const, ...extra });

  it('borra lo retirado que no editaste y deja lo demás', () => {
    const existentes = new Map([
      ['a', fila('a')],
      ['b', fila('b', { editadoPorUsuario: true })],
      ['c', { id: 'c', updatedAt: '' }],
    ]);
    expect(planRetiros(['a', 'b', 'c', 'z'], existentes)).toEqual(['a']);
    expect(planRetiros(undefined, existentes)).toEqual([]);
  });

  it('al actualizar elimina la tarea retirada del dispositivo', async () => {
    await db.pendientes.add({ ...fila('p-empresa'), orden: 1, grupo: 'Reservar ya', titulo: 'viejo', hecho: false });
    await aplicarSeed(db);
    expect(await db.pendientes.get('p-empresa')).toBeUndefined();
  });
});

describe('planSeedSync (actualizar el seed sin pisar lo tuyo)', () => {
  const seed = SEED.actividades.filter((a) => a.diaId === '2027-02-13');
  const nuevo = seed.map((a) => (a.id === '2027-02-13-02' ? { ...a, descripcion: 'corregido' } : a));

  it('actualiza el texto pero conserva estado y nota', () => {
    const existentes = new Map<string, Actividad>(
      seed.map((a) => [a.id, a.id === '2027-02-13-02' ? { ...a, estado: 'hecho', nota: 'ok' } : a]),
    );
    const out = planSeedSync('actividades', nuevo, existentes, new Set());
    const a = out.find((x) => x.id === '2027-02-13-02');
    expect(a?.descripcion).toBe('corregido');
    expect(a?.estado).toBe('hecho');
    expect(a?.nota).toBe('ok');
  });

  it('no toca lo que editaste ni resucita lo que borraste', () => {
    const existentes = new Map<string, Actividad>(
      seed
        .filter((a) => a.id !== '2027-02-13-05')
        .map((a) => [a.id, a.id === '2027-02-13-02' ? { ...a, editadoPorUsuario: true, titulo: 'mío' } : a]),
    );
    const out = planSeedSync('actividades', nuevo, existentes, new Set(['actividades:2027-02-13-05']));
    expect(out.find((x) => x.id === '2027-02-13-02')).toBeUndefined();
    expect(out.find((x) => x.id === '2027-02-13-05')).toBeUndefined();
  });

  it('agrega lo nuevo del seed', () => {
    const out = planSeedSync('actividades', seed, new Map(), new Set());
    expect(out).toHaveLength(seed.length);
  });
});
