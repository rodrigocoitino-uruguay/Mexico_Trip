import { describe, expect, it } from 'vitest';
import { horaEn } from './hora';

describe('horaEn: horas del plan en formato de 12 h', () => {
  it('convierte horas sueltas', () => {
    expect(horaEn('9:00')).toBe('9:00 a.m.');
    expect(horaEn('14:30')).toBe('2:30 p.m.');
    expect(horaEn('0:15')).toBe('12:15 a.m.');
    expect(horaEn('12:00')).toBe('12:00 p.m.');
  });
  it('convierte rangos y deja una sola marca si coincide', () => {
    expect(horaEn('9:00–11:30')).toBe('9:00–11:30 a.m.');
    expect(horaEn('9:00–13:30')).toBe('9:00 a.m.–1:30 p.m.');
  });
  it('traduce "aprox." y "Noche"', () => {
    expect(horaEn('aprox. 11:30')).toBe('approx. 11:30 a.m.');
    expect(horaEn('Noche')).toBe('Night');
  });
  it('deja vacío lo que no tiene hora', () => {
    expect(horaEn('')).toBe('');
  });
});
