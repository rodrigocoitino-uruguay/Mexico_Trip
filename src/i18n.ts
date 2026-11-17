/**
 * Idioma de la app. El español es el de siempre; el inglés es una versión paralela
 * pensada para mostrar la app en una reunión, solo en pantallas grandes.
 * Se elige con `?lang=en` (queda guardado) y se vuelve con `?lang=es`.
 */
export type Idioma = 'es' | 'en';

const CLAVE = 'cuaderno:lang';

function leer(): Idioma {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es') {
      window.localStorage.setItem(CLAVE, q);
      return q;
    }
    return window.localStorage.getItem(CLAVE) === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export const LANG: Idioma = typeof window === 'undefined' ? 'es' : leer();
export const EN = LANG === 'en';

/** Texto de interfaz según el idioma activo. */
export function t(es: string, en: string): string {
  return EN ? en : es;
}

/** Cambia de idioma y recarga (los datos de cada idioma viven en bases separadas). */
export function cambiarIdioma(nuevo: Idioma): void {
  try {
    window.localStorage.setItem(CLAVE, nuevo);
  } catch {
    /* sin almacenamiento: queda el parámetro de la URL */
  }
  const url = new URL(window.location.href);
  url.searchParams.set('lang', nuevo);
  window.location.assign(url.toString());
}

export const LOCALE = EN ? 'en-US' : 'es-UY';
