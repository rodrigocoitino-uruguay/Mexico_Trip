import { describe, expect, it } from 'vitest';
import { PRESUPUESTO, SEED } from '../data/seed';
import { aMXN, aUSD, gastosACsv, respaldoParaFinanzas, totales, unificarGastos } from './presupuesto';
import type { Gasto } from './types';

const TC = 18.7;
const g = (id: string, fecha: string, monto: number, moneda: 'MXN' | 'USD', categoria: Gasto['categoria'], nota?: string): Gasto => ({
  id,
  updatedAt: '2027-02-13T20:00:00.000Z',
  fecha,
  monto,
  moneda,
  categoria,
  nota,
});

describe('conversión MXN / USD', () => {
  it('con el tipo de cambio editable', () => {
    expect(aUSD(1870, 'MXN', TC)).toBe(100);
    expect(aMXN(10, 'USD', TC)).toBe(187);
    expect(aUSD(1870, 'MXN', 20)).toBe(93.5);
    expect(aUSD(50, 'USD', TC)).toBe(50);
  });
});

describe('sumas del presupuesto', () => {
  const acts = SEED.actividades.map((a) =>
    a.id === '2027-02-13-02' ? { ...a, gastoRealMXN: 216 } : a.id === '2027-02-13-03' ? { ...a, gastoRealMXN: 374 } : a,
  );
  const gastos = [g('h1', '2027-02-12', 64, 'USD', 'Hospedaje', 'Massiosare 4 noches'), g('o1', '2027-02-12', 187, 'MXN', 'Otros', 'eSIM')];
  const items = unificarGastos(gastos, acts, TC);

  it('junta gastos sueltos y de actividades', () => {
    expect(items).toHaveLength(4);
    expect(items.find((i) => i.id === '2027-02-13-02')).toMatchObject({ categoria: 'Entradas', mxn: 216, nota: 'Museo Nacional de Antropología' });
    expect(items.find((i) => i.id === '2027-02-13-03')?.categoria).toBe('Comida');
  });

  it('totales en USD, por categoría y por día', () => {
    const t = totales(items);
    // 64 + 10 + 216/18,7 + 374/18,7 = 64 + 10 + 11,55 + 20 = 105,55
    expect(t.usd).toBeCloseTo(105.55, 1);
    expect(t.porCategoriaUSD.Hospedaje).toBe(64);
    expect(t.porCategoriaUSD.Otros).toBe(10);
    expect(t.porDiaMXN['2027-02-12']).toBeCloseTo(64 * TC + 187, 5);
    expect(t.porDiaMXN['2027-02-13']).toBe(590);
  });

  it('el tope y los escenarios del plan', () => {
    expect(PRESUPUESTO.topeUSD - totales(items).usd).toBeCloseTo(894.45, 1);
  });
});

describe('exportar', () => {
  const items = unificarGastos([g('a', '2027-02-14', 1500.5, 'MXN', 'Comida', '=SUMA(A1); "fonda"')], [], TC);

  it('CSV con la categoría del viaje y protegido contra fórmulas', () => {
    const csv = gastosACsv(items, 'México feb 2027');
    const [head, row] = csv.replace('﻿', '').trim().split('\r\n');
    expect(head).toBe('Fecha;Categoría;Subcategoría;Nota;Monto;Moneda;Monto MXN;Monto USD');
    expect(row).toBe(`2027-02-14;México feb 2027;Comida;"'=SUMA(A1); ""fonda""";1500,50;MXN;1500,50;80,24`);
  });

  it('respaldo para finanzas: USD, categoría fija, ids estables', () => {
    const f = respaldoParaFinanzas(items, 'México feb 2027', 39.35, new Date('2027-03-02T12:00:00Z'));
    expect(f.format).toBe('finanzas-backup');
    expect(f.encrypted).toBe(false);
    const t = f.content.transactions[0];
    expect(t).toMatchObject({ id: 'mx-a', currency: 'USD', amount: 80.24, amountUYU: 3157.44, categoryId: 'mexico-feb-2027', date: '2027-02-14', rateApprox: true });
    expect(f.content.categories[0]).toMatchObject({ name: 'México feb 2027', kind: 'expense', group: 'variable' });
  });
});
