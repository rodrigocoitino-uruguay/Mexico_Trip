import type { Ajustes, Registro } from './types';

export const FORMATO_RESPALDO = 'mexico-2027-respaldo';
export const VERSION_RESPALDO = 1;
export const MAX_RESPALDO_BYTES = 10 * 1024 * 1024;

/** Tablas que viajan en el respaldo. */
export const TABLAS_RESPALDO = [
  'dias',
  'actividades',
  'alojamientos',
  'vuelos',
  'tramos',
  'lugares',
  'pendientes',
  'decisiones',
  'planB',
  'info',
  'contactos',
  'gastos',
] as const;
export type TablaRespaldo = (typeof TABLAS_RESPALDO)[number];

export interface Respaldo {
  format: typeof FORMATO_RESPALDO;
  version: number;
  exportedAt: string;
  tablas: Record<TablaRespaldo, Registro[]>;
  ajustes: Ajustes | null;
  /** Claves 'tabla:id' de lo que borraste. */
  borrados: string[];
}

export class RespaldoError extends Error {
  override name = 'RespaldoError';
}

const esObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const esTexto = (v: unknown, max: number): v is string => typeof v === 'string' && v.length > 0 && v.length <= max;

/** Lee y controla un respaldo: formato, versión y que cada registro tenga id y fecha de cambio. */
export function parseRespaldo(texto: string): Respaldo {
  if (texto.length > MAX_RESPALDO_BYTES) throw new RespaldoError('El archivo es demasiado grande');
  let raw: unknown;
  try {
    raw = JSON.parse(texto);
  } catch {
    throw new RespaldoError('El archivo no es un respaldo (no es JSON)');
  }
  if (!esObj(raw) || raw.format !== FORMATO_RESPALDO) throw new RespaldoError('El archivo no es un respaldo de esta app');
  if (typeof raw.version !== 'number' || raw.version > VERSION_RESPALDO) {
    throw new RespaldoError('El respaldo es de una versión más nueva de la app. Actualizala y probá de nuevo.');
  }
  if (!esObj(raw.tablas)) throw new RespaldoError('El respaldo está incompleto');
  const tablas = {} as Record<TablaRespaldo, Registro[]>;
  for (const t of TABLAS_RESPALDO) {
    const lista = raw.tablas[t] ?? [];
    if (!Array.isArray(lista) || lista.length > 50_000) throw new RespaldoError(`Lista inválida: ${t}`);
    tablas[t] = lista.map((r, i) => {
      if (!esObj(r) || !esTexto(r.id, 200) || !esTexto(r.updatedAt, 40)) {
        throw new RespaldoError(`${t} #${i + 1}: registro inválido`);
      }
      return r as unknown as Registro;
    });
  }
  const borrados = Array.isArray(raw.borrados) ? raw.borrados.filter((b): b is string => esTexto(b, 300)) : [];
  const a = raw.ajustes;
  const ajustes: Ajustes | null =
    esObj(a) && typeof a.tipoCambio === 'number' && a.tipoCambio > 0 && a.tipoCambio < 1000 && esTexto(a.updatedAt, 40)
      ? {
          id: 'ajustes',
          updatedAt: a.updatedAt,
          tipoCambio: a.tipoCambio,
          tema: a.tema === 'claro' || a.tema === 'oscuro' ? a.tema : 'sistema',
        }
      : null;
  return {
    format: FORMATO_RESPALDO,
    version: raw.version,
    exportedAt: typeof raw.exportedAt === 'string' ? raw.exportedAt : '',
    tablas,
    ajustes,
    borrados,
  };
}

/**
 * Combina una tabla: gana la versión cambiada más recientemente;
 * lo borrado en cualquiera de los dos dispositivos queda borrado.
 */
export function combinarTabla<T extends Registro>(
  tabla: string,
  locales: readonly T[],
  entrantes: readonly T[],
  borrados: ReadonlySet<string>,
): { poner: T[]; sacar: string[]; nuevos: number; actualizados: number } {
  const porId = new Map(locales.map((r) => [r.id, r]));
  const poner: T[] = [];
  let nuevos = 0;
  let actualizados = 0;
  for (const r of entrantes) {
    if (borrados.has(`${tabla}:${r.id}`)) continue;
    const local = porId.get(r.id);
    if (!local) {
      poner.push(r);
      nuevos++;
    } else if (r.updatedAt > local.updatedAt) {
      poner.push(r);
      actualizados++;
    }
  }
  const sacar = locales.filter((r) => borrados.has(`${tabla}:${r.id}`)).map((r) => r.id);
  return { poner, sacar, nuevos, actualizados };
}
