/**
 * Datos del viaje para el idioma de esta pantalla: español, o inglés con `?lang=en`
 * (ver `lib/idioma.ts`). El español vive en `es.ts` y `seed/`; el inglés (`en/`) copia
 * esos datos y reemplaza solo los textos, así los montos, horas e ids no se desincronizan.
 */
import { IDIOMA } from '../lib/idioma';
import { NOTA_EN, PRESUPUESTO_EN, RESUMEN_EN, SEED_EN } from './en';
import { NOTA_PRECIOS_ALOJAMIENTO_ES, PRESUPUESTO_ES, RESUMEN_ES, SEED_ES, SEED_TABLES, type SeedTable } from './es';

export { SEED_RETIRADOS, SEED_TS, SEED_VERSION } from './seed/util';
export { SEED_TABLES, type SeedTable };

const ingles = IDIOMA === 'en';

/** Una entrada por tabla editable de la base de datos. */
export const SEED: typeof SEED_ES = ingles ? SEED_EN : SEED_ES;
export const PRESUPUESTO = ingles ? PRESUPUESTO_EN : PRESUPUESTO_ES;
export const RESUMEN = ingles ? RESUMEN_EN : RESUMEN_ES;
export const NOTA_PRECIOS_ALOJAMIENTO = ingles ? NOTA_EN : NOTA_PRECIOS_ALOJAMIENTO_ES;
