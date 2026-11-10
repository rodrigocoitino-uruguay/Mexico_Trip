import { claveBorrado } from '../domain/seedSync';
import { db } from './db';
import { META_BORRADOS } from './seed';

/** Saca un registro de la lista de borrados (al deshacer). */
export async function quitarBorrado(tabla: string, id: string) {
  const borrados = ((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? [];
  const clave = claveBorrado(tabla, id);
  if (borrados.includes(clave)) await db.meta.put({ key: META_BORRADOS, value: borrados.filter((k) => k !== clave) });
}
