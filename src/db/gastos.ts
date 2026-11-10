import type { Ajustes, CategoriaGasto, Gasto, Moneda } from '../domain/types';
import { newId } from '../lib/id';
import { quitarBorrado } from './borrados';
import { db } from './db';
import { ajustesPorDefecto, marcarBorradoSeed } from './seed';

export async function agregarGasto(d: {
  fecha: string;
  categoria: CategoriaGasto;
  monto: number;
  moneda: Moneda;
  nota?: string;
}): Promise<Gasto> {
  const g: Gasto = { id: newId(), updatedAt: new Date().toISOString(), ...d, nota: d.nota?.trim() || undefined };
  await db.gastos.add(g);
  return g;
}

export async function borrarGasto(id: string): Promise<Gasto | undefined> {
  return db.transaction('rw', db.gastos, db.meta, async () => {
    const g = await db.gastos.get(id);
    if (!g) return undefined;
    await db.gastos.delete(id);
    await marcarBorradoSeed(db, 'gastos', id);
    return g;
  });
}

export async function deshacerBorradoGasto(g: Gasto) {
  await db.transaction('rw', db.gastos, db.meta, async () => {
    await db.gastos.put(g);
    await quitarBorrado('gastos', g.id);
  });
}

export async function setAjustes(cambios: Partial<Omit<Ajustes, 'id' | 'updatedAt'>>) {
  const actual = (await db.ajustes.get('ajustes')) ?? ajustesPorDefecto();
  await db.ajustes.put({ ...actual, ...cambios, updatedAt: new Date().toISOString() });
}
