import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { EN } from '../i18n/en';
import { PRESUPUESTO_EN, RESUMEN_EN, SEED_EN } from './en';
import { PRESUPUESTO_ES, RESUMEN_ES, SEED_ES, type SeedTable } from './es';

/** Todos los .ts/.tsx de src (menos tests y el diccionario). */
function fuentes(dir: string): string[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return fuentes(p);
    return /\.tsx?$/.test(n) && !n.endsWith('.test.ts') && !p.includes(join('i18n', 'en.ts')) ? [p] : [];
  });
}

const marcadores = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('inglés: interfaz', () => {
  it('cada texto pasado por t() tiene su traducción', () => {
    const faltan = new Set<string>();
    for (const f of fuentes(join(__dirname, '..'))) {
      const src = readFileSync(f, 'utf8');
      for (const m of src.matchAll(/\bt\(\s*'((?:[^'\\]|\\.)*)'/g)) {
        const k = m[1].replace(/\\'/g, "'").replace(/\\u00a0/g, ' ');
        if (!(k in EN)) faltan.add(k);
      }
    }
    expect([...faltan]).toEqual([]);
  });

  it('cada traducción conserva los {marcadores} del original', () => {
    for (const [es, en] of Object.entries(EN)) expect(marcadores(en), es).toEqual(marcadores(es));
  });

  it('no hay traducciones sobrantes ni vacías', () => {
    for (const [es, en] of Object.entries(EN)) {
      expect(en.trim(), es).not.toBe('');
    }
  });
});

const TABLAS = Object.keys(SEED_ES) as SeedTable[];
const filas = (t: SeedTable, v: typeof SEED_ES | typeof SEED_EN) => v[t] as unknown as Record<string, unknown>[];

const TEXTO = new Set(['hora', 'titulo', 'descripcion', 'comoLlegar', 'costoTexto', 'nocheTexto', 'clima', 'resumen', 'costoNota',
  'nombre', 'direccion', 'entrada', 'horario', 'consejo', 'detalle', 'rol', 'si', 'entonces', 'items', 'noches', 'precioDorm',
  'precioPrivada', 'puntaje', 'ubicacion', 'notas', 'salida', 'llegada', 'duracion', 'escala', 'tarifa', 'equipaje', 'costo',
  'opciones', 'recomendada', 'origen', 'destino', 'aerolinea']);

/** Todos los textos de una fila, juntos. */
const textoDeFila = (f: Record<string, unknown>): string =>
  Object.entries(f)
    .filter(([k]) => TEXTO.has(k))
    .map(([, v]) => (typeof v === 'string' ? v : Array.isArray(v) ? v.filter((x) => typeof x === 'string').join(' ') : ''))
    .join(' ');

/** Montos en MXN y USD de un texto, sin importar el formato (1.300 o 1,300). */
const montos = (s: string): number[] =>
  [...s.matchAll(/(?:MXN|USD)\s?(\d{1,3}(?:[.,]\d{3})+|\d+(?:[.,]\d+)?)(?:\s?(?:a|to)\s?(\d{1,3}(?:[.,]\d{3})+|\d+))?/g)]
    .flatMap((m) => [m[1], m[2]])
    .filter((x): x is string => !!x)
    .map((x) => Number(/^\d{1,3}([.,]\d{3})+$/.test(x) ? x.replace(/[.,]/g, '') : x.replace(',', '.')))
    .sort((a, b) => a - b);

describe('inglés: datos del viaje', () => {
  it('tiene las mismas filas y ids que el español', () => {
    for (const t of TABLAS) expect(filas(t, SEED_EN).map((f) => f.id), t).toEqual(filas(t, SEED_ES).map((f) => f.id));
  });

  it('solo cambian textos: números, horas, fechas y ids son iguales', () => {
    for (const t of TABLAS) {
      filas(t, SEED_ES).forEach((es, i) => {
        const en = filas(t, SEED_EN)[i];
        for (const k of Object.keys(es)) if (!TEXTO.has(k)) expect(en[k], `${t}/${String(es.id)}/${k}`).toEqual(es[k]);
      });
    }
  });

  it('cada monto del español está también en el inglés (mismos números)', () => {
    for (const t of TABLAS) {
      filas(t, SEED_ES).forEach((es, i) => {
        const en = filas(t, SEED_EN)[i];
        expect(montos(textoDeFila(en)), `${t}/${String(es.id)}`).toEqual(montos(textoDeFila(es)));
      });
    }
  });

  it('las filas con texto en español tienen traducción (no queda nada sin traducir)', () => {
    const sin: string[] = [];
    for (const t of TABLAS) {
      filas(t, SEED_ES).forEach((es, i) => {
        if (JSON.stringify(es) === JSON.stringify(filas(t, SEED_EN)[i]) && textoDeFila(es).length > 25) sin.push(`${t}/${String(es.id)}`);
      });
    }
    expect(sin).toEqual([]);
  });

  // Nombres propios y lugares que se quedan como están.
  const PROPIOS = /\b(Califa de León|Lucas de Gálvez|Playa del Carmen|Parque de Santiago|Casa de Montejo|Paseo de Montejo|Calzada de los Frailes|Diálogos del Conquistador|Casa de los Azulejos|Hotel de Cortés|Plaza de la Constitución|Plaza de la República|Museo de Antropología|Teatro de la Ciudad|Isla de Mujeres|Parque de la Alameda|Calle de Madero|Puerta de Alcalá|Ciudad de México|Avenida de los Insurgentes|Salón Los Ángeles|Tulum|Río|Mérida|Cancún|Cozumel|Valladolid|Izamal|Teotihuacán|Chichén Itzá|Oxmán|Uxmal|México|Bósforo|Montevideo|X’kekén|Samulá|Tlatelolco|Guadalupe|Soumaya|San Ildefonso|San Bernardino|San Antonio de Padua|Santa Lucía|Kinich Kakmó|Xcanché|X’Canché|Telcel|Hacienda|Isabel la Católica|Terminal del Norte|Autobuses del Norte|Autobuses del Centro|Mesón del Marqués|Atrio del Mayab|Aeropuerto Internacional)\b/g;
  const ESPAÑOL = /\b(el|la|los|las|del|con|para|por|que|una|sin|pero|donde|desde|hasta|según|también|entre|sobre|cuando|más|todo|todos|esta|este|estos)\b|[¿¡]/;
  it('el texto en inglés no deja palabras sueltas en español', () => {
    const sospechosos: string[] = [];
    for (const t of TABLAS) {
      filas(t, SEED_EN).forEach((en) => {
        const txt = textoDeFila(en).replace(PROPIOS, ' ').replace(/https?:\/\/\S+/g, ' ');
        const m = txt.match(ESPAÑOL);
        if (m) sospechosos.push(`${t}/${String(en.id)}: «${m[0]}»`);
      });
    }
    expect(sospechosos).toEqual([]);
  });

  it('presupuesto y resumen: mismos números y sin personales', () => {
    expect(PRESUPUESTO_EN.topeUSD).toBe(PRESUPUESTO_ES.topeUSD);
    expect(PRESUPUESTO_EN.totalViaje).toEqual(PRESUPUESTO_ES.totalViaje);
    expect(PRESUPUESTO_EN.despues.map((d) => d.usd)).toEqual(PRESUPUESTO_ES.despues.map((d) => d.usd));
    expect(PRESUPUESTO_EN.semana.map((f) => f.categoria)).toEqual(PRESUPUESTO_ES.semana.map((f) => f.categoria));
    expect(PRESUPUESTO_EN.reglas).toEqual([]);
    expect(RESUMEN_EN.comida).toHaveLength(RESUMEN_ES.comida.length);
    expect(RESUMEN_EN.experienciasGastronomicas.map((e) => e.diaId)).toEqual(RESUMEN_ES.experienciasGastronomicas.map((e) => e.diaId));
    expect(RESUMEN_EN.nochesMemorables.map((e) => e.diaId)).toEqual(RESUMEN_ES.nochesMemorables.map((e) => e.diaId));
  });
});
