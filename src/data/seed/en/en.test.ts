import { describe, expect, it } from 'vitest';
import { SEED } from '../../seed';
import { SEED_EN } from './index';
import { ACTIVIDADES_EN } from './actividades';
import { ALOJAMIENTO_EN } from './alojamiento';
import { DIAS_EN } from './dias';
import { INFO_EN, PLAN_B_EN } from './info';
import { LUGARES_EN } from './lugares';
import { PRESUPUESTO_EN, RESUMEN_EN } from './plan';
import { CONTACTOS_EN, DECISIONES_EN, PENDIENTES_EN } from './reservas';
import { TRAMOS_EN, VUELOS_EN } from './transporte';
import { PRESUPUESTO, RESUMEN } from '../plan';

/** Por tabla: las traducciones y los campos de texto que se muestran. */
const TABLAS = {
  dias: [DIAS_EN, ['titulo', 'nocheTexto', 'clima', 'costoNota']],
  actividades: [ACTIVIDADES_EN, ['titulo', 'descripcion', 'comoLlegar', 'costoTexto']],
  alojamientos: [ALOJAMIENTO_EN, ['noches', 'precioDorm', 'precioPrivada', 'puntaje', 'ubicacion', 'notas']],
  vuelos: [VUELOS_EN, ['origen', 'destino', 'salida', 'llegada', 'duracion', 'escala', 'tarifa', 'equipaje', 'costo', 'notas']],
  tramos: [TRAMOS_EN, ['nombre', 'opciones', 'costo', 'duracion', 'recomendada']],
  info: [INFO_EN, ['titulo', 'items']],
  planB: [PLAN_B_EN, ['si', 'entonces']],
  lugares: [LUGARES_EN, ['nombre', 'entrada', 'horario', 'consejo', 'direccion']],
  pendientes: [PENDIENTES_EN, ['titulo', 'detalle']],
  decisiones: [DECISIONES_EN, ['titulo', 'detalle']],
  contactos: [CONTACTOS_EN, ['rol', 'nombre']],
} as const;

/** Nombres propios que se escriben igual en los dos idiomas. */
const IGUAL_EN_AMBOS = new Set(['contactos:c-copa:nombre', 'contactos:c-latam:nombre']);

type Fila = Record<string, unknown> & { id: string };
const filas = (tabla: keyof typeof TABLAS) => SEED[tabla] as unknown as Fila[];

describe('seed en inglés: traducción completa', () => {
  for (const [tabla, [traduccion, campos]] of Object.entries(TABLAS)) {
    it(`${tabla}: cada texto tiene su traducción y no sobran ids`, () => {
      const faltan: string[] = [];
      for (const r of filas(tabla as keyof typeof TABLAS)) {
        for (const c of campos) {
          const v = r[c];
          if (v === undefined || v === '' || (Array.isArray(v) && v.length === 0)) continue;
          if (IGUAL_EN_AMBOS.has(`${tabla}:${r.id}:${c}`)) continue;
          const t = (traduccion as Record<string, Record<string, unknown>>)[r.id];
          if (!t || !(c in t)) faltan.push(`${r.id}.${c}`);
        }
      }
      expect(faltan).toEqual([]);
      const ids = new Set(filas(tabla as keyof typeof TABLAS).map((r) => r.id));
      expect(Object.keys(traduccion).filter((id) => !ids.has(id))).toEqual([]);
    });
  }

  it('las listas traducidas tienen la misma cantidad de ítems que las originales', () => {
    for (const s of SEED.info) {
      expect(INFO_EN[s.id]?.items?.length, s.id).toBe(s.items.length);
    }
  });

  it('la versión en inglés conserva ids, fechas, precios y estados', () => {
    for (const tabla of Object.keys(TABLAS) as (keyof typeof TABLAS)[]) {
      const es = filas(tabla);
      const en = SEED_EN[tabla] as unknown as Fila[];
      expect(en.map((r) => r.id)).toEqual(es.map((r) => r.id));
      en.forEach((r, i) => {
        for (const k of ['orden', 'estado', 'fecha', 'diaId', 'hora', 'costoMXN', 'costoCentralMXN', 'ciudad', 'tipo', 'grupo', 'fechaLimite']) {
          expect(r[k], `${tabla}.${r.id}.${k}`).toEqual(es[i][k]);
        }
      });
    }
  });

  it('no quedan montos en formato español ni conectores en español', () => {
    const textos = JSON.stringify([SEED_EN, PRESUPUESTO_EN, RESUMEN_EN]);
    expect(textos).not.toMatch(/MXN\s?\d{1,3}\.\d{3}/);
    expect(textos).not.toMatch(/USD\s?\d{1,3}\.\d{3}/);
    expect(textos).not.toMatch(/\d\s+a\s+\d/);
  });

  it('presupuesto y resumen: los números son los mismos que en español', () => {
    const sinTextos = (p: typeof PRESUPUESTO) => ({
      topeUSD: p.topeUSD,
      tipoCambioDefault: p.tipoCambioDefault,
      semana: p.semana.map((f) => [f.categoria, f.bajo, f.central, f.alto]),
      totalSemana: p.totalSemana,
      despues: p.despues.map((d) => d.usd),
      subtotalDespuesUSD: p.subtotalDespuesUSD,
      totalViaje: p.totalViaje,
    });
    expect(sinTextos(PRESUPUESTO_EN)).toEqual(sinTextos(PRESUPUESTO));
    expect(PRESUPUESTO_EN.margen).toHaveLength(PRESUPUESTO.margen.length);
    expect(PRESUPUESTO_EN.reglas).toHaveLength(PRESUPUESTO.reglas.length);
    expect(PRESUPUESTO_EN.categoriaFinanzas).toBe(PRESUPUESTO.categoriaFinanzas);
    expect(RESUMEN_EN.desde).toBe(RESUMEN.desde);
    expect(RESUMEN_EN.hasta).toBe(RESUMEN.hasta);
    expect(RESUMEN_EN.ruta).toHaveLength(RESUMEN.ruta.length);
    expect(RESUMEN_EN.experienciasGastronomicas.map((e) => e.lugarId)).toEqual(RESUMEN.experienciasGastronomicas.map((e) => e.lugarId));
    expect(RESUMEN_EN.nochesMemorables.map((e) => e.diaId)).toEqual(RESUMEN.nochesMemorables.map((e) => e.diaId));
  });
});
