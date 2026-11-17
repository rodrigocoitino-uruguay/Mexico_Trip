import { PRESUPUESTO, SEED, SEED_RETIRADOS, SEED_TABLES, SEED_VERSION, type SeedTable } from '../data/seed';
import type { Table } from 'dexie';
import { claveBorrado, planSeedSync } from '../domain/seedSync';
import type { Ajustes, Registro } from '../domain/types';
import type { ViajeDB } from './db';

const META_VERSION = 'seedVersion';
/** Registros del seed que borraste (claves 'tabla:id'). */
export const META_BORRADOS = 'borradosSeed';

export function ajustesPorDefecto(now = new Date()): Ajustes {
  return { id: 'ajustes', updatedAt: now.toISOString(), tipoCambio: PRESUPUESTO.tipoCambioDefault, tema: 'sistema' };
}

/**
 * Carga el seed la primera vez y lo actualiza cuando sube SEED_VERSION,
 * sin pisar lo que editaste. Devuelve true si escribió algo.
 */
export async function aplicarSeed(db: ViajeDB, { forzar = false } = {}): Promise<boolean> {
  const tablas = [...SEED_TABLES.map((t) => db[t]), db.meta, db.ajustes];
  return db.transaction('rw', tablas, async () => {
    const version = (await db.meta.get(META_VERSION))?.value;
    if (!forzar && version === SEED_VERSION) return false;
    const borrados = new Set(((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? []);
    await retirarDelSeed(db, borrados);
    for (const t of SEED_TABLES) {
      const tabla = db[t] as unknown as Table<Registro, string>;
      const existentes = new Map((await tabla.toArray()).map((r) => [r.id, r]));
      const cambios = planSeedSync(t, SEED[t] as readonly Registro[], existentes, borrados);
      if (cambios.length) await tabla.bulkPut(cambios);
    }
    if (!(await db.ajustes.get('ajustes'))) await db.ajustes.put(ajustesPorDefecto());
    await db.meta.put({ key: META_VERSION, value: SEED_VERSION });
    return true;
  });
}

/** Saca lo que el seed ya no trae y lo anota como borrado (así un respaldo viejo no lo trae de vuelta). */
async function retirarDelSeed(db: ViajeDB, borrados: Set<string>): Promise<void> {
  const antes = borrados.size;
  for (const clave of SEED_RETIRADOS) {
    borrados.add(clave);
    const [t, id] = clave.split(':') as [SeedTable, string];
    const tabla = db[t] as unknown as Table<Registro, string>;
    if ((await tabla.get(id))?.delSeed) await tabla.delete(id);
  }
  if (borrados.size !== antes) await db.meta.put({ key: META_BORRADOS, value: [...borrados] });
}

/** Borra todo lo que cargaste y vuelve a los datos originales (mantiene los ajustes). */
export async function restaurarSeed(db: ViajeDB): Promise<void> {
  const tablas = [...SEED_TABLES.map((t) => db[t]), db.gastos, db.meta];
  await db.transaction('rw', tablas, async () => {
    await Promise.all(tablas.map((t) => t.clear()));
  });
  await aplicarSeed(db, { forzar: true });
}

/**
 * Anota un registro como borrado por vos: el seed no lo resucita y, al importar
 * un respaldo de otro dispositivo, tampoco vuelve.
 */
export async function marcarBorradoSeed(db: ViajeDB, tabla: SeedTable | 'gastos', id: string): Promise<void> {
  const actual = ((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? [];
  const clave = claveBorrado(tabla, id);
  if (!actual.includes(clave)) await db.meta.put({ key: META_BORRADOS, value: [...actual, clave] });
}
