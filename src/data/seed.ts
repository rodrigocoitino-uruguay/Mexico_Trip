/**
 * Datos originales del viaje (sección 6 del plan). Para corregir algo:
 * editá el archivo de `seed/` que corresponda y subí SEED_VERSION en `seed/util.ts`.
 */
import { SEED_ACTIVIDADES } from './seed/actividades';
import { SEED_ALOJAMIENTO } from './seed/alojamiento';
import { SEED_DIAS } from './seed/dias';
import { SEED_INFO, SEED_PLAN_B } from './seed/info';
import { SEED_LUGARES } from './seed/lugares';
import { SEED_CONTACTOS, SEED_DECISIONES, SEED_PENDIENTES } from './seed/reservas';
import { SEED_TRAMOS, SEED_VUELOS } from './seed/transporte';
import { EN } from '../i18n';
import { NOTA_PRECIOS_ALOJAMIENTO_EN } from './seed/en/alojamiento';
import { SEED_EN } from './seed/en';
import { PRESUPUESTO_EN, RESUMEN_EN } from './seed/en/plan';
import { NOTA_PRECIOS_ALOJAMIENTO as NOTA_ES } from './seed/alojamiento';
import { PRESUPUESTO as PRES_ES, RESUMEN as RES_ES } from './seed/plan';

export const NOTA_PRECIOS_ALOJAMIENTO = EN ? NOTA_PRECIOS_ALOJAMIENTO_EN : NOTA_ES;
export const PRESUPUESTO = EN ? PRESUPUESTO_EN : PRES_ES;
export const RESUMEN = EN ? RESUMEN_EN : RES_ES;
export { SEED_RETIRADOS, SEED_TS, SEED_VERSION } from './seed/util';

/** Una entrada por tabla editable de la base de datos. */
const SEED_ES = {
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

/** Datos según el idioma activo (el inglés es una capa de traducción sobre el seed en español). */
export const SEED: typeof SEED_ES = EN ? (SEED_EN as unknown as typeof SEED_ES) : SEED_ES;

export type SeedTable = keyof typeof SEED;
export const SEED_TABLES = Object.keys(SEED) as SeedTable[];
