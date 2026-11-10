const DIAS = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const DIAS_LARGO = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

/** Fecha ISO 'YYYY-MM-DD' a Date al mediodía UTC (sin saltos por zona horaria). */
function utc(iso: string): Date {
  return new Date(`${iso}T12:00:00Z`);
}

/** 'jue 11/2' */
export function diaCorto(iso: string): string {
  const d = utc(iso);
  return `${DIAS[d.getUTCDay()]} ${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}

/** 'jueves 11/2' */
export function diaLargo(iso: string): string {
  const d = utc(iso);
  return `${DIAS_LARGO[d.getUTCDay()]} ${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}

/** '11/2' */
export function diaMes(iso: string): string {
  const d = utc(iso);
  return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`;
}
