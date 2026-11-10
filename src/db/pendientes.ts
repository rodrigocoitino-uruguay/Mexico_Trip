import type { Contacto, GrupoPendiente, Pendiente } from '../domain/types';
import { newId } from '../lib/id';
import { quitarBorrado } from './borrados';
import { db } from './db';
import { marcarBorradoSeed } from './seed';

const ahoraISO = () => new Date().toISOString();

export function setHecho(id: string, hecho: boolean) {
  return db.pendientes.update(id, { hecho, updatedAt: ahoraISO() });
}

/** Tarea nueva que se te ocurre en el camino. */
export async function agregarPendiente(d: {
  titulo: string;
  grupo: GrupoPendiente;
  detalle?: string;
  fechaLimite?: string;
}): Promise<Pendiente> {
  const delGrupo = await db.pendientes.where('grupo').equals(d.grupo).toArray();
  const p: Pendiente = {
    id: newId(),
    updatedAt: ahoraISO(),
    editadoPorUsuario: true,
    orden: Math.max(0, ...delGrupo.map((x) => x.orden)) + 10,
    titulo: d.titulo.trim(),
    grupo: d.grupo,
    detalle: d.detalle?.trim() || undefined,
    fechaLimite: d.fechaLimite || undefined,
    hecho: false,
  };
  await db.pendientes.add(p);
  return p;
}

export async function editarPendiente(id: string, d: Partial<Pick<Pendiente, 'titulo' | 'detalle' | 'fechaLimite' | 'grupo'>>) {
  await db.pendientes.update(id, {
    ...d,
    titulo: d.titulo?.trim(),
    detalle: d.detalle?.trim() || undefined,
    fechaLimite: d.fechaLimite || undefined,
    editadoPorUsuario: true,
    updatedAt: ahoraISO(),
  });
}

export async function borrarPendiente(id: string): Promise<Pendiente | undefined> {
  return db.transaction('rw', db.pendientes, db.meta, async () => {
    const p = await db.pendientes.get(id);
    if (!p) return undefined;
    await db.pendientes.delete(id);
    await marcarBorradoSeed(db, 'pendientes', id);
    return p;
  });
}

export async function deshacerBorradoPendiente(p: Pendiente) {
  await db.transaction('rw', db.pendientes, db.meta, async () => {
    await db.pendientes.put(p);
    await quitarBorrado('pendientes', p.id);
  });
}

export async function editarContacto(id: string, d: Partial<Pick<Contacto, 'nombre' | 'telefono' | 'email' | 'web' | 'notas'>>) {
  const limpio = Object.fromEntries(Object.entries(d).map(([k, v]) => [k, typeof v === 'string' ? v.trim() || undefined : v]));
  await db.contactos.update(id, { ...limpio, editadoPorUsuario: true, updatedAt: ahoraISO() });
}
