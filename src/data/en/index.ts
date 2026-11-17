/**
 * Versión en inglés de los datos. No repite el itinerario: toma el seed en español y le cambia
 * solo los textos (por id). Lo que no tiene traducción queda en español, y `en.test.ts` avisa.
 */
import { SEED_ES } from '../es';
import { ACTIVIDADES_EN } from './actividades';
import { DIAS_EN, LUGARES_EN } from './lugares';
import { PRESUPUESTO_EN, RESUMEN_EN } from './plan';
import { CONTACTOS_EN, DECISIONES_EN, INFO_EN, PENDIENTES_EN, PLAN_B_EN } from './reservas';
import { ALOJAMIENTOS_EN, NOTA_PRECIOS_ALOJAMIENTO_EN, TRAMOS_EN, VUELOS_EN } from './transporte';

export { PRESUPUESTO_EN, RESUMEN_EN };
export const NOTA_EN = NOTA_PRECIOS_ALOJAMIENTO_EN;

function traducir<F extends { id: string }>(filas: readonly F[], textos: Record<string, object>): F[] {
  return filas.map((f) => ({ ...f, ...(textos[f.id] ?? {}) }));
}

export const SEED_EN: typeof SEED_ES = {
  dias: traducir(SEED_ES.dias, DIAS_EN),
  actividades: traducir(SEED_ES.actividades, ACTIVIDADES_EN),
  alojamientos: traducir(SEED_ES.alojamientos, ALOJAMIENTOS_EN),
  vuelos: traducir(SEED_ES.vuelos, VUELOS_EN),
  tramos: traducir(SEED_ES.tramos, TRAMOS_EN),
  lugares: traducir(SEED_ES.lugares, LUGARES_EN),
  pendientes: traducir(SEED_ES.pendientes, PENDIENTES_EN),
  decisiones: traducir(SEED_ES.decisiones, DECISIONES_EN),
  planB: traducir(SEED_ES.planB, PLAN_B_EN),
  info: traducir(SEED_ES.info, INFO_EN),
  contactos: traducir(SEED_ES.contactos, CONTACTOS_EN),
};
