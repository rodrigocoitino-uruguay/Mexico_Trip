import type { Table } from 'dexie';
import {
  combinarTabla,
  FORMATO_RESPALDO,
  parseRespaldo,
  TABLAS_RESPALDO,
  VERSION_RESPALDO,
  type Respaldo,
} from '../domain/respaldo';
import type { Registro } from '../domain/types';
import { db } from './db';
import { META_BORRADOS } from './seed';

const tabla = (t: (typeof TABLAS_RESPALDO)[number]) => db[t] as unknown as Table<Registro, string>;

/** Todo tu estado en un JSON (para pasarlo a otro dispositivo o guardarlo de respaldo). */
export async function exportarEstado(now = new Date()): Promise<string> {
  const tablas = {} as Respaldo['tablas'];
  for (const t of TABLAS_RESPALDO) tablas[t] = await tabla(t).toArray();
  const r: Respaldo = {
    format: FORMATO_RESPALDO,
    version: VERSION_RESPALDO,
    exportedAt: now.toISOString(),
    tablas,
    ajustes: (await db.ajustes.get('ajustes')) ?? null,
    borrados: ((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? [],
  };
  return JSON.stringify(r);
}

export interface ResultadoImportar {
  nuevos: number;
  actualizados: number;
  borrados: number;
}

/**
 * Combina un respaldo con lo que hay: de cada cosa queda la versión cambiada más
 * recientemente, y lo que borraste en cualquiera de los dos queda borrado.
 */
export async function importarEstado(texto: string): Promise<ResultadoImportar> {
  const r = parseRespaldo(texto);
  const res: ResultadoImportar = { nuevos: 0, actualizados: 0, borrados: 0 };
  await db.transaction('rw', [...TABLAS_RESPALDO.map(tabla), db.ajustes, db.meta], async () => {
    const locales = ((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? [];
    const borrados = new Set([...locales, ...r.borrados]);
    for (const t of TABLAS_RESPALDO) {
      const tb = tabla(t);
      const c = combinarTabla(t, await tb.toArray(), r.tablas[t], borrados);
      if (c.poner.length) await tb.bulkPut(c.poner);
      if (c.sacar.length) await tb.bulkDelete(c.sacar);
      res.nuevos += c.nuevos;
      res.actualizados += c.actualizados;
      res.borrados += c.sacar.length;
    }
    await db.meta.put({ key: META_BORRADOS, value: [...borrados] });
    const aj = await db.ajustes.get('ajustes');
    if (r.ajustes && (!aj || r.ajustes.updatedAt > aj.updatedAt)) await db.ajustes.put(r.ajustes);
  });
  return res;
}
