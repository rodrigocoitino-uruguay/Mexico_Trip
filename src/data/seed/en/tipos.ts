/**
 * Traducción al inglés del seed. Cada archivo de esta carpeta tiene, por id, solo los
 * textos traducidos de ese registro; todo lo demás (precios, fechas, links, estados) se toma
 * del seed en español. Un test verifica que no quede ningún texto sin traducir.
 */
export type Traduccion<T> = Record<string, Partial<Omit<T, 'id'>>>;
