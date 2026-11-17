import { IDIOMA } from './idioma';
import { EN } from '../i18n/en';

/** true en la versión en inglés (`?lang=en`). */
export const INGLES = IDIOMA === 'en';

/** Locale para fechas y números. */
export const LOCALE = INGLES ? 'en-US' : 'es-UY';

/**
 * Traduce un texto de la interfaz. La clave es el texto en español; si no hay traducción
 * (o la pantalla está en español) devuelve el mismo texto. `{nombre}` se reemplaza con `vars`.
 */
export function t(es: string, vars?: Record<string, string | number>): string {
  let s = INGLES ? (EN[es] ?? es) : es;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(String(v));
  return s;
}
