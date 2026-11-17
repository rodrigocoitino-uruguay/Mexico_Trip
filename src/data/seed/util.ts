/** Fecha fija de los datos originales (así "último cambio gana" siempre prefiere lo tuyo). */
export const SEED_TS = '2026-11-10T00:00:00.000Z';

/**
 * Versión del contenido del seed. Subila cada vez que corrijas un dato:
 * la app agrega lo nuevo y actualiza lo que no editaste, sin tocar tus cambios.
 */
export const SEED_VERSION = 3;

export function base(id: string) {
  return { id, updatedAt: SEED_TS, delSeed: true as const };
}

/**
 * Registros que el seed ya no trae (claves 'tabla:id'). Al actualizar, la app los saca de
 * quien ya los tenía cargados y no los deja volver al importar un respaldo viejo.
 */
export const SEED_RETIRADOS: readonly string[] = ['pendientes:p-empresa'];
