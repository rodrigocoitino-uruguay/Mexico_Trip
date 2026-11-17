import { EN } from '../i18n';

const DIAS = EN ? ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] : ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const DIAS_LARGO = EN
  ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  : ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Fecha ISO 'YYYY-MM-DD' a Date al mediodía UTC (sin saltos por zona horaria). */
function utc(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

/** '11/2' (en inglés, mes/día: '2/11'). */
export function diaMes(iso: string): string {
  const d = utc(iso);
  const dia = d.getUTCDate();
  const mes = d.getUTCMonth() + 1;
  return EN ? `${mes}/${dia}` : `${dia}/${mes}`;
}

/** 'jue 11/2' */
export function diaCorto(iso: string): string {
  return `${DIAS[utc(iso).getUTCDay()]} ${diaMes(iso)}`;
}

/** 'jueves 11/2' */
export function diaLargo(iso: string): string {
  return `${DIAS_LARGO[utc(iso).getUTCDay()]} ${diaMes(iso)}`;
}
