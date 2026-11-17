import { describe, expect, it } from 'vitest';
import { formatoUSD, segmentarMontos } from './montos';

describe('USD al lado de cada monto en MXN', () => {
  it('convierte con el tipo de cambio (18,7)', () => {
    expect(formatoUSD(1267, 18.7)).toBe('68');
    expect(formatoUSD(5, 18.7)).toBe('0,3');
    expect(formatoUSD(40, 18.7)).toBe('2');
  });
  it('marca montos, rangos y "+" dentro del texto', () => {
    const s = segmentarMontos('MXN 210; transporte MXN 6', 18.7);
    expect(s.filter((x) => x.tipo === 'mxn').map((x) => x.tipo === 'mxn' && x.usd)).toEqual(['USD 11', 'USD 0,3']);
    const r = segmentarMontos('Con equipaje MXN 1.300 a 2.300 est.', 18.7);
    expect(r[1]).toEqual({ tipo: 'mxn', texto: 'MXN 1.300 a 2.300', usd: 'USD 70 a 123' });
    expect(r[2]).toEqual({ tipo: 'texto', texto: ' est.' });
    expect(segmentarMontos('La Gruta, MXN 500+.', 18.7)[1]).toMatchObject({ usd: 'USD 27+' });
    expect(segmentarMontos('Gratis', 18.7)).toEqual([{ tipo: 'texto', texto: 'Gratis' }]);
  });
  it('también entiende los montos de la versión en inglés (comas y "to")', () => {
    const r = segmentarMontos('With carry-on MXN 1,300 to 2,300 est.', 18.7);
    expect(r[1]).toMatchObject({ tipo: 'mxn', texto: 'MXN 1,300 to 2,300' });
    expect(r[1]).toMatchObject({ usd: expect.stringMatching(/^USD 70 (a|to) 123$/) });
    expect(segmentarMontos('MXN 500+', 18.7)[0]).toMatchObject({ usd: 'USD 27+' });
  });
});
