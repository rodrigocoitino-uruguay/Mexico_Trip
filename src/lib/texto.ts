/** Minúsculas y sin tildes, para buscar ("merida" encuentra "Mérida"). */
export function normalizar(s: string): string {
  return s
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();
}

/** true si todas las palabras de la búsqueda aparecen en alguno de los textos. */
export function coincide(busqueda: string, ...textos: Array<string | undefined>): boolean {
  const q = normalizar(busqueda.trim());
  if (!q) return true;
  const hay = normalizar(textos.filter(Boolean).join(' '));
  return q.split(/\s+/).every((p) => hay.includes(p));
}
