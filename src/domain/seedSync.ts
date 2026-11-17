import type { Registro } from './types';

/**
 * Campos que reflejan lo que vos hiciste (marcar hecho, reservar, anotar).
 * Una actualización del seed nunca los pisa, aunque no hayas "editado" el texto.
 */
export const CAMPOS_DEL_USUARIO: Record<string, readonly string[]> = {
  dias: [],
  actividades: ['estado', 'nota', 'gastoRealMXN', 'activa', 'diaId', 'orden'],
  alojamientos: ['estado', 'reserva'],
  vuelos: ['estado', 'reserva'],
  tramos: ['estado', 'reserva'],
  lugares: [],
  pendientes: ['hecho'],
  decisiones: ['resuelta', 'resolucion'],
  planB: [],
  info: [],
  contactos: ['telefono', 'email', 'web', 'notas'],
};

/** Clave de un registro del seed que borraste (para no resucitarlo al actualizar). */
export const claveBorrado = (tabla: string, id: string) => `${tabla}:${id}`;

/** Ids del seed viejo que hay que borrar de la tabla (los que no editaste). */
export function planRetiros<T extends Registro>(
  retirados: readonly string[] | undefined,
  existentes: ReadonlyMap<string, T>,
): string[] {
  return (retirados ?? []).filter((id) => {
    const r = existentes.get(id);
    return !!r && !!r.delSeed && !r.editadoPorUsuario;
  });
}

/**
 * Qué escribir en una tabla para llevarla a la versión nueva del seed:
 * - lo que no existe (y no borraste) se agrega;
 * - lo que vino del seed y no editaste se actualiza, conservando tus campos de estado;
 * - lo que editaste o creaste vos no se toca.
 */
export function planSeedSync<T extends Registro>(
  tabla: string,
  seed: readonly T[],
  existentes: ReadonlyMap<string, T>,
  borrados: ReadonlySet<string>,
): T[] {
  const conservar = CAMPOS_DEL_USUARIO[tabla] ?? [];
  const out: T[] = [];
  for (const row of seed) {
    const actual = existentes.get(row.id);
    if (!actual) {
      if (!borrados.has(claveBorrado(tabla, row.id))) out.push(row);
      continue;
    }
    if (!actual.delSeed || actual.editadoPorUsuario) continue;
    const merged = { ...row } as unknown as Record<string, unknown>;
    const prev = actual as unknown as Record<string, unknown>;
    for (const k of conservar) {
      if (k in prev) merged[k] = prev[k];
      else delete merged[k];
    }
    // Conserva la fecha de cambio más nueva (si marcaste algo, sigue ganando lo tuyo).
    merged.updatedAt = actual.updatedAt > row.updatedAt ? actual.updatedAt : row.updatedAt;
    out.push(merged as T);
  }
  return out;
}
