import { newId } from '../lib/id';
import { parseHora } from './tiempo';
import type { Actividad, CategoriaActividad } from './types';

export const porOrden = (a: Actividad, b: Actividad) => a.orden - b.orden || a.id.localeCompare(b.id);

/**
 * Lugar (orden) para una actividad con esa hora dentro del día, en orden cronológico.
 * Las que no tienen hora no cuentan para comparar y una sin hora va al final.
 * `delDia` no debe incluir la actividad que se está ubicando.
 */
export function ordenParaHora(delDia: readonly Actividad[], hora: string): number {
  const lista = [...delDia].sort(porOrden);
  if (!lista.length) return 10;
  const ultimo = lista[lista.length - 1].orden + 10;
  const m = parseHora(hora);
  if (m === null) return ultimo;
  const idx = lista.findIndex((a) => {
    const h = parseHora(a.hora);
    return h !== null && h > m;
  });
  if (idx === -1) return ultimo;
  if (idx === 0) return lista[0].orden - 10;
  return (lista[idx - 1].orden + lista[idx].orden) / 2;
}

export interface DatosActividad {
  hora: string;
  titulo: string;
  categoria: CategoriaActividad;
  descripcion: string;
  comoLlegar?: string;
  costoTexto?: string;
  costoMXN?: number;
}

/** Actividad nueva creada por vos, ubicada por hora. */
export function nuevaActividad(
  diaId: string,
  datos: DatosActividad,
  delDia: readonly Actividad[],
  now = new Date(),
): Actividad {
  return {
    id: newId(),
    updatedAt: now.toISOString(),
    editadoPorUsuario: true,
    diaId,
    orden: ordenParaHora(delDia, datos.hora),
    estado: 'pendiente',
    ...limpiar(datos),
  };
}

/** Aplica una edición: si cambia la hora, la reubica en el día. */
export function editarActividad(
  act: Actividad,
  cambios: Partial<DatosActividad>,
  delDia: readonly Actividad[],
  now = new Date(),
): Actividad {
  const next: Actividad = { ...act, ...limpiar(cambios), editadoPorUsuario: true, updatedAt: now.toISOString() };
  if (cambios.hora !== undefined && cambios.hora !== act.hora) {
    next.orden = ordenParaHora(
      delDia.filter((a) => a.id !== act.id),
      next.hora,
    );
  }
  return next;
}

/** Pasa la actividad a otro día, ubicada por su hora entre las de ese día. */
export function moverActividad(
  act: Actividad,
  diaDestino: string,
  delDestino: readonly Actividad[],
  now = new Date(),
): Actividad {
  if (diaDestino === act.diaId) return act;
  return {
    ...act,
    diaId: diaDestino,
    orden: ordenParaHora(
      delDestino.filter((a) => a.id !== act.id),
      act.hora,
    ),
    editadoPorUsuario: true,
    updatedAt: now.toISOString(),
  };
}

/** Las opcionales apagadas no cuentan en el día (ni para "la próxima" ni en el gasto estimado). */
export const cuenta = (a: Actividad) => !a.opcional || a.activa === true;

function limpiar<T extends Partial<DatosActividad>>(d: T): T {
  const out = { ...d };
  for (const k of ['comoLlegar', 'costoTexto'] as const) {
    if (k in out && typeof out[k] === 'string' && !(out[k] as string).trim()) out[k] = undefined;
  }
  if (out.titulo !== undefined) out.titulo = out.titulo.trim();
  if (out.hora !== undefined) out.hora = out.hora.trim();
  return out;
}
