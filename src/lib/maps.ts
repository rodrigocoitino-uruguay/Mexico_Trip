/** Link de búsqueda de Google Maps (no embebe mapas; abre la app o la web). */
export function mapsUrl(...partes: Array<string | undefined>): string {
  const query = partes
    .map((p) => p?.trim())
    .filter(Boolean)
    .join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Ciudad tal como la entiende Maps. */
export function ciudadMaps(ciudad: string): string {
  switch (ciudad) {
    case 'CDMX':
      return 'Ciudad de México';
    case 'Izamal/Valladolid':
      return 'Yucatán';
    case 'Mérida':
    case 'Valladolid':
      return `${ciudad}, Yucatán`;
    case 'Cancún':
    case 'Cozumel':
      return `${ciudad}, Quintana Roo`;
    default:
      return 'México';
  }
}
