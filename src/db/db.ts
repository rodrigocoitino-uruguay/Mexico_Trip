import Dexie, { type EntityTable } from 'dexie';
import { IDIOMA } from '../lib/idioma';
import type {
  Actividad,
  Ajustes,
  Contacto,
  Decision,
  Dia,
  Gasto,
  InfoSeccion,
  Lugar,
  OpcionAlojamiento,
  Pendiente,
  PlanB,
  Tramo,
  Vuelo,
} from '../domain/types';

export interface Meta {
  key: string;
  value: unknown;
}

export type ViajeDB = Dexie & {
  dias: EntityTable<Dia, 'id'>;
  actividades: EntityTable<Actividad, 'id'>;
  alojamientos: EntityTable<OpcionAlojamiento, 'id'>;
  vuelos: EntityTable<Vuelo, 'id'>;
  tramos: EntityTable<Tramo, 'id'>;
  lugares: EntityTable<Lugar, 'id'>;
  pendientes: EntityTable<Pendiente, 'id'>;
  decisiones: EntityTable<Decision, 'id'>;
  planB: EntityTable<PlanB, 'id'>;
  info: EntityTable<InfoSeccion, 'id'>;
  contactos: EntityTable<Contacto, 'id'>;
  gastos: EntityTable<Gasto, 'id'>;
  ajustes: EntityTable<Ajustes, 'id'>;
  meta: EntityTable<Meta, 'key'>;
};

/** Versión del esquema de IndexedDB (también va en los respaldos). */
export const SCHEMA_VERSION = 1;

/** La versión en inglés (para mostrar en una reunión) tiene su propia base: no mezcla los datos personales de la real. */
const NOMBRE_DB = IDIOMA === 'en' ? 'mexico-2027-en' : 'mexico-2027';

export function createDB(name = NOMBRE_DB): ViajeDB {
  const db = new Dexie(name) as ViajeDB;
  // Migraciones: nunca editar una versión publicada; agregar db.version(2)… con .upgrade().
  db.version(1).stores({
    dias: 'id',
    actividades: 'id, diaId, [diaId+orden]',
    alojamientos: 'id, ciudad',
    vuelos: 'id',
    tramos: 'id',
    lugares: 'id, tipo, ciudad',
    pendientes: 'id, grupo',
    decisiones: 'id',
    planB: 'id',
    info: 'id',
    contactos: 'id',
    gastos: 'id, fecha, categoria, actividadId',
    ajustes: 'id',
    meta: 'key',
  });
  return db;
}

export const db = createDB();
