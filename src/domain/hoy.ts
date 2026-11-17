import { EN } from '../i18n';
import { cuenta } from './actividades';
import { fechaEnZona, minutosEnZona, parseHora } from './tiempo';
import type { Actividad, Dia, Gasto, Pendiente } from './types';

/** Fin de una hora con rango ('9:00–13:30' → 13:30); null si no tiene. */
export function parseHoraFin(hora: string): number | null {
  const m = /\d{1,2}[:.]\d{2}\s*[–-]\s*(\d{1,2})[:.](\d{2})/.exec(hora);
  return m ? Number(m[1]) * 60 + Number(m[2]) : null;
}

const minutosDe = (a: Actividad, dia: Dia, now: Date) => minutosEnZona(now, a.zonaHoraria ?? dia.zonaHoraria);

/** La que está pasando ahora: tiene rango de horas y la hora actual cae adentro (y no la saltaste). */
export function actividadEnCurso(lista: readonly Actividad[], dia: Dia, now: Date): Actividad | null {
  return (
    lista.find((a) => {
      if (!cuenta(a) || a.estado === 'saltado') return false;
      const ini = parseHora(a.hora);
      const fin = parseHoraFin(a.hora);
      const m = minutosDe(a, dia, now);
      return ini !== null && fin !== null && ini <= m && m < fin;
    }) ?? null
  );
}

/**
 * La próxima: la primera pendiente que todavía no empezó (con 15 min de tolerancia).
 * Devuelve también en cuántos minutos empieza.
 */
export function proximaActividad(
  lista: readonly Actividad[],
  dia: Dia,
  now: Date,
): { actividad: Actividad; enMinutos: number } | null {
  for (const a of lista) {
    if (!cuenta(a) || a.estado !== 'pendiente') continue;
    const ini = parseHora(a.hora);
    if (ini === null) continue;
    const m = minutosDe(a, dia, now);
    if (ini >= m - 15) return { actividad: a, enMinutos: Math.max(0, ini - m) };
  }
  return null;
}

/** 'en 45 min', 'en 1 h 15', 'ahora' */
export function textoEnMinutos(min: number): string {
  if (min <= 2) return EN ? 'now' : 'ahora';
  if (min < 60) return EN ? `in ${min} min` : `en ${min} min`;
  const h = Math.floor(min / 60);
  const r = min % 60;
  const txt = r ? `${h} h ${String(r).padStart(2, '0')}` : `${h} h`;
  return EN ? `in ${txt}` : `en ${txt}`;
}

/** Salida: vuelo Copa del vie 12/2 a las 3:06 de Montevideo (salís de casa la noche del jueves). */
export const SALIDA = new Date('2027-02-12T03:06:00-03:00');

/** Cuenta regresiva: días (según la fecha de Montevideo) hasta la noche del jueves 11/2, y horas al vuelo. */
export function cuentaRegresiva(now: Date): { dias: number; horas: number } {
  const hoy = fechaEnZona(now, 'America/Montevideo');
  const dias = Math.round((Date.parse('2027-02-11T12:00:00Z') - Date.parse(`${hoy}T12:00:00Z`)) / 86_400_000);
  const horas = Math.max(0, Math.floor((SALIDA.getTime() - now.getTime()) / 3_600_000));
  return { dias, horas };
}

export type Urgencia = 'vencida' | 'pronto' | 'ok';

/** Vencida, vence en menos de 7 días, o con tiempo. null si no tiene fecha límite. */
export function urgencia(fechaLimite: string | undefined, hoy: string): Urgencia | null {
  if (!fechaLimite) return null;
  if (fechaLimite < hoy) return 'vencida';
  const dias = (Date.parse(`${fechaLimite}T12:00:00Z`) - Date.parse(`${hoy}T12:00:00Z`)) / 86_400_000;
  return dias < 7 ? 'pronto' : 'ok';
}

/** Las N tareas sin hacer que vencen antes (las sin fecha van al final). */
export function pendientesUrgentes(pendientes: readonly Pendiente[], n = 3): Pendiente[] {
  return pendientes
    .filter((p) => !p.hecho)
    .sort((a, b) => (a.fechaLimite ?? '9999').localeCompare(b.fechaLimite ?? '9999') || a.orden - b.orden)
    .slice(0, n);
}

/** Gasto real del día en MXN: lo cargado en actividades más los gastos con esa fecha. */
export function gastoDelDia(
  diaId: string,
  actividades: readonly Actividad[],
  gastos: readonly Gasto[],
  tipoCambio: number,
): number {
  const enActs = actividades.filter((a) => a.diaId === diaId).reduce((s, a) => s + (a.gastoRealMXN ?? 0), 0);
  const sueltos = gastos
    .filter((g) => g.fecha === diaId)
    .reduce((s, g) => s + (g.moneda === 'USD' ? g.monto * tipoCambio : g.monto), 0);
  return enActs + sueltos;
}
