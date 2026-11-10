import type { Actividad, CategoriaActividad, CategoriaGasto, Gasto, Moneda } from './types';

/** A qué categoría del presupuesto va el gasto real cargado en una actividad. */
export const CATEGORIA_DE_ACTIVIDAD: Record<CategoriaActividad, CategoriaGasto> = {
  comida: 'Comida',
  noche: 'Comida',
  traslado: 'Transporte',
  atraccion: 'Entradas',
  descanso: 'Otros',
  logistica: 'Otros',
};

export const CATEGORIAS_GASTO: CategoriaGasto[] = ['Hospedaje', 'Comida', 'Transporte', 'Entradas', 'Otros'];

/** Un gasto, venga de la lista de gastos o de una actividad. */
export interface GastoUnificado {
  id: string;
  origen: 'gasto' | 'actividad';
  fecha: string;
  categoria: CategoriaGasto;
  nota: string;
  monto: number;
  moneda: Moneda;
  mxn: number;
  usd: number;
  updatedAt: string;
}

const r2 = (n: number) => Math.round(n * 100) / 100;

export function aMXN(monto: number, moneda: Moneda, tc: number): number {
  return moneda === 'USD' ? monto * tc : monto;
}
export function aUSD(monto: number, moneda: Moneda, tc: number): number {
  return moneda === 'USD' ? monto : monto / tc;
}

/** Todos los gastos (sueltos y de actividades), ordenados por fecha. */
export function unificarGastos(
  gastos: readonly Gasto[],
  actividades: readonly Actividad[],
  tc: number,
): GastoUnificado[] {
  const deGastos: GastoUnificado[] = gastos.map((g) => ({
    id: g.id,
    origen: 'gasto',
    fecha: g.fecha,
    categoria: g.categoria,
    nota: g.nota ?? '',
    monto: g.monto,
    moneda: g.moneda,
    mxn: r2(aMXN(g.monto, g.moneda, tc)),
    usd: r2(aUSD(g.monto, g.moneda, tc)),
    updatedAt: g.updatedAt,
  }));
  const deActs: GastoUnificado[] = actividades
    .filter((a) => a.gastoRealMXN !== undefined && a.gastoRealMXN > 0)
    .map((a) => ({
      id: a.id,
      origen: 'actividad',
      fecha: a.diaId,
      categoria: CATEGORIA_DE_ACTIVIDAD[a.categoria],
      nota: a.titulo,
      monto: a.gastoRealMXN!,
      moneda: 'MXN',
      mxn: a.gastoRealMXN!,
      usd: r2(a.gastoRealMXN! / tc),
      updatedAt: a.updatedAt,
    }));
  return [...deGastos, ...deActs].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.nota.localeCompare(b.nota));
}

export interface Totales {
  usd: number;
  mxn: number;
  porCategoriaUSD: Record<CategoriaGasto, number>;
  porDiaMXN: Record<string, number>;
}

export function totales(items: readonly GastoUnificado[]): Totales {
  const porCategoriaUSD = Object.fromEntries(CATEGORIAS_GASTO.map((c) => [c, 0])) as Record<CategoriaGasto, number>;
  const porDiaMXN: Record<string, number> = {};
  let usd = 0;
  let mxn = 0;
  for (const g of items) {
    usd += g.usd;
    mxn += g.mxn;
    porCategoriaUSD[g.categoria] += g.usd;
    porDiaMXN[g.fecha] = (porDiaMXN[g.fecha] ?? 0) + g.mxn;
  }
  return { usd: r2(usd), mxn: r2(mxn), porCategoriaUSD, porDiaMXN };
}

// ── CSV ────────────────────────────────────────────────────────

const SEP = ';';

/** Texto seguro para CSV: comillas cuando hace falta y protección contra fórmulas. */
export function csvText(value: string): string {
  let v = value.replace(/\r?\n/g, ' ');
  if (/^[=+\-@\t\r]/.test(v)) v = `'${v}`;
  if (v.includes(SEP) || v.includes('"')) v = `"${v.replace(/"/g, '""')}"`;
  return v;
}

const coma = (n: number) => n.toFixed(2).replace('.', ',');

/** Gastos en CSV para Excel (separador ";", coma decimal, UTF-8 con BOM). */
export function gastosACsv(items: readonly GastoUnificado[], categoriaViaje: string): string {
  const header = ['Fecha', 'Categoría', 'Subcategoría', 'Nota', 'Monto', 'Moneda', 'Monto MXN', 'Monto USD'];
  const rows = items.map((g) =>
    [g.fecha, csvText(categoriaViaje), g.categoria, csvText(g.nota), coma(g.monto), g.moneda, coma(g.mxn), coma(g.usd)].join(SEP),
  );
  return `﻿${[header.join(SEP), ...rows].join('\r\n')}\r\n`;
}

// ── Respaldo compatible con la app de finanzas ─────────────────

/** Id fijo de la categoría en finanzas: importar dos veces no duplica. */
export const ID_CATEGORIA_FINANZAS = 'mexico-feb-2027';

/**
 * Archivo con el formato de respaldo de Finanzas (sin cifrar) para "Importar → Combinar".
 * Finanzas maneja UYU y USD: los gastos van en USD. `uyuPorUsd` es la cotización
 * para pasarlos a pesos (después se puede recalcular con la del BROU de cada fecha).
 */
export function respaldoParaFinanzas(
  items: readonly GastoUnificado[],
  categoriaViaje: string,
  uyuPorUsd: number,
  now = new Date(),
) {
  const nowISO = now.toISOString();
  const transactions = items
    .filter((g) => g.usd >= 0.01)
    .map((g) => ({
      id: `mx-${g.origen === 'actividad' ? 'act-' : ''}${g.id}`.slice(0, 64),
      kind: 'expense',
      amount: g.usd,
      currency: 'USD',
      rateAtDate: uyuPorUsd,
      rateApprox: true,
      amountUYU: r2(g.usd * uyuPorUsd),
      amountUSD: g.usd,
      categoryId: ID_CATEGORIA_FINANZAS,
      date: g.fecha,
      note: `${g.categoria}: ${g.nota}`.slice(0, 200),
      status: 'confirmed',
      createdAt: nowISO,
      // La fecha del cambio real: reimportar solo actualiza lo que cambió (y no pisa un recálculo hecho en finanzas).
      updatedAt: g.updatedAt || nowISO,
    }));
  const categories = [
    {
      id: ID_CATEGORIA_FINANZAS,
      kind: 'expense',
      group: 'variable',
      name: categoriaViaje,
      normalizedName: '',
      color: '#E4007C',
      usageCount: transactions.length,
      archived: false,
      createdAt: nowISO,
    },
  ];
  return {
    format: 'finanzas-backup',
    version: 1,
    schemaVersion: 1,
    exportedAt: nowISO,
    encrypted: false,
    content: {
      transactions,
      categories,
      budgets: [],
      recurrings: [],
      rates: [],
      settings: {},
    },
    counts: { transactions: transactions.length, categories: 1 },
  };
}
