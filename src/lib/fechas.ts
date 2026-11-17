import { INGLES } from './i18n';

const DIAS = INGLES ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const DIAS_LARGO = INGLES
  ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  : ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
// En inglés el mes va con nombre: '11/2' se lee noviembre 2 en Estados Unidos.
const MESES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function diaMesDe(d: Date): string {
  return INGLES ? `${MESES[d.getUTCMonth()]} ${d.getUTCDate()}` : `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}

/** Fecha ISO 'YYYY-MM-DD' a Date al mediodía UTC (sin saltos por zona horaria). */
function utc(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

/** 'jue 11/2' */
export function diaCorto(iso: string): string {
  const d = utc(iso);
  return `${DIAS[d.getUTCDay()]} ${diaMesDe(d)}`;
}

/** 'jueves 11/2' */
export function diaLargo(iso: string): string {
  const d = utc(iso);
  return `${DIAS_LARGO[d.getUTCDay()]} ${diaMesDe(d)}`;
}

/** '11/2' */
export function diaMes(iso: string): string {
  return diaMesDe(utc(iso));
}

/**
 * Hora para mostrar. En español queda como está guardada ('14:10'); en inglés pasa a 12 h
 * ('2:10 PM'). Se guarda siempre en 24 h para que el cálculo de "ahora / próxima" no cambie.
 */
export function horaVista(hora: string): string {
  if (!INGLES) return hora;
  return hora.replace(/\b(\d{1,2}):(\d{2})\b/g, (_, h: string, m: string) => {
    const n = Number(h);
    return `${n % 12 === 0 ? 12 : n % 12}:${m} ${n < 12 ? 'AM' : 'PM'}`;
  });
}
