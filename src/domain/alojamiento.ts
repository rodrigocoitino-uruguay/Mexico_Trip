import type { Dia, OpcionAlojamiento } from './types';

/**
 * Dónde dormís esa noche: el reservado de la ciudad; si todavía no reservaste, el recomendado.
 */
export function alojamientoDeNoche(
  dia: Pick<Dia, 'nocheEn'>,
  opciones: readonly OpcionAlojamiento[],
): { opcion: OpcionAlojamiento; reservado: boolean } | null {
  if (!dia.nocheEn) return null;
  const deCiudad = opciones.filter((o) => o.ciudad === dia.nocheEn);
  const reservado = deCiudad.find((o) => o.estado === 'reservado');
  if (reservado) return { opcion: reservado, reservado: true };
  const rec = deCiudad.find((o) => o.recomendado && o.estado !== 'descartado') ?? deCiudad.find((o) => o.estado !== 'descartado');
  return rec ? { opcion: rec, reservado: false } : null;
}
