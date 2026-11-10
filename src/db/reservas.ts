import {
  cancelarReservaAlojamiento,
  comprar,
  descomprar,
  pendientesResueltos,
  reservarAlojamiento,
} from '../domain/reservas';
import type { CiudadAlojamiento, Reserva } from '../domain/types';
import { db } from './db';

/** Marca como hechos los pendientes que quedaron resueltos. Devuelve sus títulos. */
async function marcarResueltos(): Promise<string[]> {
  const ids = pendientesResueltos(await db.alojamientos.toArray(), await db.vuelos.toArray());
  const marcados: string[] = [];
  for (const id of ids) {
    const p = await db.pendientes.get(id);
    if (p && !p.hecho) {
      await db.pendientes.update(id, { hecho: true, updatedAt: new Date().toISOString() });
      marcados.push(p.titulo);
    }
  }
  return marcados;
}

export async function reservar(id: string, reserva: Reserva): Promise<string[]> {
  return db.transaction('rw', db.alojamientos, db.vuelos, db.pendientes, async () => {
    await db.alojamientos.bulkPut(reservarAlojamiento(await db.alojamientos.toArray(), id, reserva));
    return marcarResueltos();
  });
}

/** Cambia solo los datos de la reserva (sin tocar las otras opciones). */
export async function editarReserva(id: string, reserva: Reserva) {
  const o = await db.alojamientos.get(id);
  if (!o) return;
  const [actual] = reservarAlojamiento([o], id, reserva);
  await db.alojamientos.put(actual);
}

export async function cancelarReserva(ciudad: CiudadAlojamiento) {
  await db.transaction('rw', db.alojamientos, async () => {
    await db.alojamientos.bulkPut(cancelarReservaAlojamiento(await db.alojamientos.toArray(), ciudad));
  });
}

export async function comprarItem(tabla: 'vuelos' | 'tramos', id: string, reserva: Reserva): Promise<string[]> {
  return db.transaction('rw', db.alojamientos, db.vuelos, db.tramos, db.pendientes, async () => {
    if (tabla === 'vuelos') {
      const v = await db.vuelos.get(id);
      if (v) await db.vuelos.put(comprar(v, reserva));
    } else {
      const t = await db.tramos.get(id);
      if (t) await db.tramos.put(comprar(t, reserva));
    }
    return marcarResueltos();
  });
}

export async function descomprarItem(tabla: 'vuelos' | 'tramos', id: string) {
  if (tabla === 'vuelos') {
    const v = await db.vuelos.get(id);
    if (v) await db.vuelos.put(descomprar(v));
  } else {
    const t = await db.tramos.get(id);
    if (t) await db.tramos.put(descomprar(t));
  }
}

export function resolverDecision(id: string, resolucion: string) {
  return db.decisiones.update(id, { resuelta: true, resolucion: resolucion.trim() || undefined, updatedAt: new Date().toISOString() });
}

export function reabrirDecision(id: string) {
  return db.decisiones.update(id, { resuelta: false, updatedAt: new Date().toISOString() });
}
