import type { Dia, ZonaHoraria } from './types';

const fmtCache = new Map<string, Intl.DateTimeFormat>();

function partes(now: Date, tz: ZonaHoraria) {
  let f = fmtCache.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-CA', {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    });
    fmtCache.set(tz, f);
  }
  const p = Object.fromEntries(f.formatToParts(now).map((x) => [x.type, x.value]));
  return { fecha: `${p.year}-${p.month}-${p.day}`, minutos: Number(p.hour) * 60 + Number(p.minute) };
}

/** 'YYYY-MM-DD' de ese instante en esa zona horaria. */
export function fechaEnZona(now: Date, tz: ZonaHoraria): string {
  return partes(now, tz).fecha;
}

/** Minutos desde la medianoche de ese instante en esa zona horaria. */
export function minutosEnZona(now: Date, tz: ZonaHoraria): number {
  return partes(now, tz).minutos;
}

export type EstadoDia = 'pasado' | 'hoy' | 'futuro';

/** Si el día ya pasó, es hoy o viene, según la hora local del lugar donde estás ese día. */
export function estadoDia(dia: Pick<Dia, 'fecha' | 'zonaHoraria'>, now: Date): EstadoDia {
  const hoy = fechaEnZona(now, dia.zonaHoraria);
  return dia.fecha < hoy ? 'pasado' : dia.fecha === hoy ? 'hoy' : 'futuro';
}

/** Momento del viaje: antes, durante (con el día de hoy) o después. */
export function momentoViaje(
  dias: readonly Dia[],
  now: Date,
): { fase: 'antes' | 'durante' | 'despues'; hoyId: string | null } {
  if (!dias.length) return { fase: 'antes', hoyId: null };
  const hoy = dias.find((d) => estadoDia(d, now) === 'hoy');
  if (hoy) return { fase: 'durante', hoyId: hoy.id };
  if (estadoDia(dias[0], now) === 'futuro') return { fase: 'antes', hoyId: null };
  return { fase: 'despues', hoyId: null };
}

/** Minutos de inicio de una hora del plan ('9:00–13:30', 'aprox. 11:30'); null si no tiene hora. */
export function parseHora(hora: string): number | null {
  const m = /(\d{1,2})[:.](\d{2})/.exec(hora);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}
