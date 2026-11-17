/**
 * Datos originales del viaje en español (sección 6 del plan). Para corregir algo:
 * editá el archivo de `seed/` que corresponda y subí SEED_VERSION en `seed/util.ts`.
 * La versión en inglés (`en/`) copia estos datos y reemplaza solo los textos.
 */
import { SEED_ACTIVIDADES } from './seed/actividades';
import { SEED_ALOJAMIENTO } from './seed/alojamiento';
import { SEED_DIAS } from './seed/dias';
import { SEED_INFO, SEED_PLAN_B } from './seed/info';
import { SEED_LUGARES } from './seed/lugares';
import { SEED_CONTACTOS, SEED_DECISIONES, SEED_PENDIENTES } from './seed/reservas';
import { SEED_TRAMOS, SEED_VUELOS } from './seed/transporte';

export { NOTA_PRECIOS_ALOJAMIENTO as NOTA_PRECIOS_ALOJAMIENTO_ES } from './seed/alojamiento';
export { PRESUPUESTO as PRESUPUESTO_ES, RESUMEN as RESUMEN_ES } from './seed/plan';

/** Una entrada por tabla editable de la base de datos. */
export const SEED_ES = {
  dias: SEED_DIAS,
  actividades: SEED_ACTIVIDADES,
  alojamientos: SEED_ALOJAMIENTO,
  vuelos: SEED_VUELOS,
  tramos: SEED_TRAMOS,
  lugares: SEED_LUGARES,
  pendientes: SEED_PENDIENTES,
  decisiones: SEED_DECISIONES,
  planB: SEED_PLAN_B,
  info: SEED_INFO,
  contactos: SEED_CONTACTOS,
} as const;

export type SeedTable = keyof typeof SEED_ES;
export const SEED_TABLES = Object.keys(SEED_ES) as SeedTable[];
