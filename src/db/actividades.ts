import {
  editarActividad,
  moverActividad,
  nuevaActividad,
  type DatosActividad,
} from '../domain/actividades';
import { claveBorrado } from '../domain/seedSync';
import type { Actividad, EstadoActividad } from '../domain/types';
import { db } from './db';
import { marcarBorradoSeed, META_BORRADOS } from './seed';

const ahoraISO = () => new Date().toISOString();
const delDia = (diaId: string) => db.actividades.where('diaId').equals(diaId).toArray();

/** Hecho, saltado o pendiente (no cuenta como "editado": el seed puede seguir corrigiendo el texto). */
export function setEstado(id: string, estado: EstadoActividad) {
  return db.actividades.update(id, { estado, updatedAt: ahoraISO() });
}

export function setNota(id: string, nota: string) {
  return db.actividades.update(id, { nota: nota.trim() || undefined, updatedAt: ahoraISO() });
}

export function setGastoReal(id: string, gastoRealMXN: number | undefined) {
  return db.actividades.update(id, { gastoRealMXN, updatedAt: ahoraISO() });
}

export function setActiva(id: string, activa: boolean) {
  return db.actividades.update(id, { activa, updatedAt: ahoraISO() });
}

export async function editar(id: string, cambios: Partial<DatosActividad>) {
  await db.transaction('rw', db.actividades, async () => {
    const act = await db.actividades.get(id);
    if (!act) return;
    await db.actividades.put(editarActividad(act, cambios, await delDia(act.diaId)));
  });
}

export async function mover(id: string, diaDestino: string) {
  await db.transaction('rw', db.actividades, async () => {
    const act = await db.actividades.get(id);
    if (!act) return;
    await db.actividades.put(moverActividad(act, diaDestino, await delDia(diaDestino)));
  });
}

export async function agregar(diaId: string, datos: DatosActividad): Promise<Actividad> {
  return db.transaction('rw', db.actividades, async () => {
    const act = nuevaActividad(diaId, datos, await delDia(diaId));
    await db.actividades.add(act);
    return act;
  });
}

/** Borra y devuelve la actividad para poder deshacer. */
export async function borrar(id: string): Promise<Actividad | undefined> {
  return db.transaction('rw', db.actividades, db.meta, async () => {
    const act = await db.actividades.get(id);
    if (!act) return undefined;
    await db.actividades.delete(id);
    await marcarBorradoSeed(db, 'actividades', id);
    return act;
  });
}

export async function deshacerBorrado(act: Actividad) {
  await db.transaction('rw', db.actividades, db.meta, async () => {
    await db.actividades.put(act);
    const borrados = ((await db.meta.get(META_BORRADOS))?.value as string[] | undefined) ?? [];
    const clave = claveBorrado('actividades', act.id);
    if (borrados.includes(clave)) {
      await db.meta.put({ key: META_BORRADOS, value: borrados.filter((k) => k !== clave) });
    }
  });
}
