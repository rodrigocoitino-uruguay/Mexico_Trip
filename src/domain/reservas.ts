import type { CiudadAlojamiento, OpcionAlojamiento, Reserva, Tramo, Vuelo } from './types';

const iso = (now: Date) => now.toISOString();

/**
 * Marca una opción como reservada y descarta las otras de la misma ciudad
 * (quedan guardadas para recuperarlas). Devuelve solo las filas que cambian.
 */
export function reservarAlojamiento(
  opciones: readonly OpcionAlojamiento[],
  id: string,
  reserva: Reserva,
  now = new Date(),
): OpcionAlojamiento[] {
  const elegida = opciones.find((o) => o.id === id);
  if (!elegida) return [];
  return opciones
    .filter((o) => o.ciudad === elegida.ciudad)
    .map((o) =>
      o.id === id
        ? { ...o, estado: 'reservado' as const, reserva: limpiarReserva(reserva), updatedAt: iso(now) }
        : { ...o, estado: 'descartado' as const, reserva: undefined, updatedAt: iso(now) },
    );
}

/** Cancela la reserva de una ciudad: todas vuelven a ser opciones. */
export function cancelarReservaAlojamiento(
  opciones: readonly OpcionAlojamiento[],
  ciudad: CiudadAlojamiento,
  now = new Date(),
): OpcionAlojamiento[] {
  return opciones
    .filter((o) => o.ciudad === ciudad && o.estado !== 'opcion')
    .map((o) => ({ ...o, estado: 'opcion' as const, reserva: undefined, updatedAt: iso(now) }));
}

/** Lo que se ve de una ciudad: si hay reservado, solo ese; si no, las opciones (recomendada primero). */
export function opcionesVisibles(opciones: readonly OpcionAlojamiento[]): {
  visibles: OpcionAlojamiento[];
  descartadas: OpcionAlojamiento[];
} {
  const reservada = opciones.find((o) => o.estado === 'reservado');
  if (reservada) return { visibles: [reservada], descartadas: opciones.filter((o) => o.id !== reservada.id) };
  const ordenadas = [...opciones].sort((a, b) => Number(b.recomendado) - Number(a.recomendado));
  return {
    visibles: ordenadas.filter((o) => o.estado !== 'descartado'),
    descartadas: ordenadas.filter((o) => o.estado === 'descartado'),
  };
}

export function comprar<T extends Tramo | Vuelo>(item: T, reserva: Reserva, now = new Date()): T {
  return { ...item, estado: 'comprado', reserva: limpiarReserva(reserva), updatedAt: iso(now) };
}

export function descomprar<T extends Tramo | Vuelo>(item: T, now = new Date()): T {
  return { ...item, estado: 'pendiente', reserva: undefined, updatedAt: iso(now) };
}

/**
 * Pendientes que quedan resueltos solos con lo que reservaste o compraste.
 * (Solo se marcan como hechos; nunca se desmarcan solos.)
 */
export function pendientesResueltos(opciones: readonly OpcionAlojamiento[], vuelos: readonly Vuelo[]): string[] {
  const reservada = (c: CiudadAlojamiento) => opciones.some((o) => o.ciudad === c && o.estado === 'reservado');
  const ids: string[] = [];
  if (reservada('CDMX')) ids.push('p-hostel-cdmx');
  if (reservada('Mérida') && reservada('Valladolid')) ids.push('p-hostels-yucatan');
  if (vuelos.some((v) => v.id === 'v-mex-mid' && v.estado === 'comprado')) ids.push('p-vuelo-merida');
  return ids;
}

/** Solo links http(s): un texto pegado no puede convertirse en un link peligroso. */
export function linkSeguro(link: string | undefined): string | undefined {
  if (!link) return undefined;
  const t = link.trim();
  const conProtocolo = /^[a-z]+:/i.test(t) ? t : `https://${t}`;
  try {
    const u = new URL(conProtocolo);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : undefined;
  } catch {
    return undefined;
  }
}

function limpiarReserva(r: Reserva): Reserva {
  const out: Reserva = {};
  for (const [k, v] of Object.entries(r) as [keyof Reserva, Reserva[keyof Reserva]][]) {
    if (v === undefined || v === '' || (typeof v === 'number' && !Number.isFinite(v))) continue;
    (out as Record<string, unknown>)[k] = typeof v === 'string' ? v.trim() : v;
  }
  if (out.link) out.link = linkSeguro(out.link);
  return out;
}
