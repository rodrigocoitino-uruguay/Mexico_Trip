import { SEED_ACTIVIDADES } from '../actividades';
import { SEED_ALOJAMIENTO } from '../alojamiento';
import { SEED_DIAS } from '../dias';
import { SEED_INFO, SEED_PLAN_B } from '../info';
import { SEED_LUGARES } from '../lugares';
import { SEED_CONTACTOS, SEED_DECISIONES, SEED_PENDIENTES } from '../reservas';
import { SEED_TRAMOS, SEED_VUELOS } from '../transporte';
import { ACTIVIDADES_EN } from './actividades';
import { ALOJAMIENTO_EN } from './alojamiento';
import { DIAS_EN } from './dias';
import { INFO_EN, PLAN_B_EN } from './info';
import { LUGARES_EN } from './lugares';
import { CONTACTOS_EN, DECISIONES_EN, PENDIENTES_EN } from './reservas';
import type { Traduccion } from './tipos';
import { TRAMOS_EN, VUELOS_EN } from './transporte';

/** Aplica la traducción por id sobre el seed en español; lo que no se traduce queda igual. */
export function traducir<T extends { id: string }>(es: readonly T[], en: Traduccion<T>): T[] {
  return es.map((r) => ({ ...r, ...(en[r.id] ?? {}) }));
}

export const SEED_EN = {
  dias: traducir(SEED_DIAS, DIAS_EN),
  actividades: traducir(SEED_ACTIVIDADES, ACTIVIDADES_EN),
  alojamientos: traducir(SEED_ALOJAMIENTO, ALOJAMIENTO_EN),
  vuelos: traducir(SEED_VUELOS, VUELOS_EN),
  tramos: traducir(SEED_TRAMOS, TRAMOS_EN),
  lugares: traducir(SEED_LUGARES, LUGARES_EN),
  pendientes: traducir(SEED_PENDIENTES, PENDIENTES_EN),
  decisiones: traducir(SEED_DECISIONES, DECISIONES_EN),
  planB: traducir(SEED_PLAN_B, PLAN_B_EN),
  info: traducir(SEED_INFO, INFO_EN),
  contactos: traducir(SEED_CONTACTOS, CONTACTOS_EN),
} as const;
