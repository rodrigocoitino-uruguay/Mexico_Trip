export type Idioma = 'es' | 'en';

/** El idioma sale de la dirección: `?lang=en` es la versión en inglés (solo para la web); sin nada, español. */
export function idiomaDe(search: string): Idioma {
  return new URLSearchParams(search).get('lang') === 'en' ? 'en' : 'es';
}

/**
 * Idioma de esta pantalla. Se decide una vez al abrir la página (cambiarlo recarga la página),
 * así que puede leerse desde cualquier parte sin pasar por React.
 */
export const IDIOMA: Idioma = typeof location === 'undefined' ? 'es' : idiomaDe(location.search);

/** Dirección de esta misma página en otro idioma (conserva `?ahora=` si estás simulando una fecha). */
export function urlEnIdioma(idioma: Idioma, search = typeof location === 'undefined' ? '' : location.search): string {
  const p = new URLSearchParams(search);
  if (idioma === 'en') p.set('lang', 'en');
  else p.delete('lang');
  const q = p.toString();
  return `${typeof location === 'undefined' ? '' : location.pathname}${q ? `?${q}` : ''}`;
}
