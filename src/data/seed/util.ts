/** Fecha fija de los datos originales (así "último cambio gana" siempre prefiere lo tuyo). */
export const SEED_TS = '2026-11-10T00:00:00.000Z';

/**
 * Versión del contenido del seed. Subila cada vez que corrijas un dato:
 * la app agrega lo nuevo y actualiza lo que no editaste, sin tocar tus cambios.
 */
export const SEED_VERSION = 2;

export function base(id: string) {
  return { id, updatedAt: SEED_TS, delSeed: true as const };
}
