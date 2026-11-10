import { describe, expect, it } from 'vitest';
import { SEED } from '../data/seed';
import { alojamientoDeNoche } from './alojamiento';
import {
  cancelarReservaAlojamiento,
  comprar,
  descomprar,
  linkSeguro,
  opcionesVisibles,
  pendientesResueltos,
  reservarAlojamiento,
} from './reservas';
import type { OpcionAlojamiento } from './types';

const aplicar = (base: OpcionAlojamiento[], cambios: OpcionAlojamiento[]) =>
  base.map((o) => cambios.find((c) => c.id === o.id) ?? o);

describe('Reservé esta (alojamiento)', () => {
  const todas = SEED.alojamientos;
  const cdmx = () => todas.filter((o) => o.ciudad === 'CDMX');

  it('al reservar Massiosare, Viajero y Casa Pepe quedan descartados y ocultos', () => {
    const cambios = reservarAlojamiento(todas, 'h-massiosare', { codigo: ' ABC123 ', precioPagado: 60, moneda: 'USD', link: '' });
    expect(cambios).toHaveLength(3); // solo toca CDMX
    const despues = aplicar(cdmx(), cambios);
    const { visibles, descartadas } = opcionesVisibles(despues);
    expect(visibles.map((o) => o.nombre)).toEqual(['Massiosare El Hostel']);
    expect(descartadas.map((o) => o.nombre).sort()).toEqual(['Casa Pepe', 'Viajero CDMX Centro']);
    expect(despues.find((o) => o.id === 'h-massiosare')?.reserva).toEqual({ codigo: 'ABC123', precioPagado: 60, moneda: 'USD' });
  });

  it('se puede recuperar: cancelar vuelve a mostrar las 3 (recomendada primero)', () => {
    const reservadas = aplicar(cdmx(), reservarAlojamiento(todas, 'h-casa-pepe', {}));
    const vuelta = aplicar(reservadas, cancelarReservaAlojamiento(reservadas, 'CDMX'));
    const { visibles, descartadas } = opcionesVisibles(vuelta);
    expect(visibles.map((o) => o.id)).toEqual(['h-massiosare', 'h-viajero-cdmx', 'h-casa-pepe']);
    expect(descartadas).toHaveLength(0);
    expect(vuelta.every((o) => o.reserva === undefined)).toBe(true);
  });

  it('reservar otra cambia la elegida', () => {
    const a = aplicar(cdmx(), reservarAlojamiento(todas, 'h-massiosare', {}));
    const b = aplicar(a, reservarAlojamiento(a, 'h-viajero-cdmx', {}));
    expect(opcionesVisibles(b).visibles.map((o) => o.id)).toEqual(['h-viajero-cdmx']);
  });

  it('la reservada se vincula sola a los días de esa ciudad', () => {
    const despues = aplicar(todas, reservarAlojamiento(todas, 'h-casa-pepe', {}));
    const dia13 = SEED.dias.find((d) => d.id === '2027-02-13')!;
    expect(alojamientoDeNoche(dia13, despues)).toMatchObject({ opcion: { id: 'h-casa-pepe' }, reservado: true });
    const dia17 = SEED.dias.find((d) => d.id === '2027-02-17')!;
    expect(alojamientoDeNoche(dia17, despues)).toMatchObject({ opcion: { id: 'h-casa-garza' }, reservado: false });
  });
});

describe('Lo compré (vuelos y tramos)', () => {
  it('comprar y deshacer', () => {
    const v = SEED.vuelos.find((x) => x.id === 'v-mex-mid')!;
    const c = comprar(v, { codigo: 'XYZ', precioPagado: 1650, moneda: 'MXN' });
    expect(c.estado).toBe('comprado');
    expect(descomprar(c).reserva).toBeUndefined();
  });

  it('marca solos los pendientes resueltos', () => {
    let ops = SEED.alojamientos;
    expect(pendientesResueltos(ops, SEED.vuelos)).toEqual([]);
    ops = aplicar(ops, reservarAlojamiento(ops, 'h-massiosare', {}));
    ops = aplicar(ops, reservarAlojamiento(ops, 'h-casa-garza', {}));
    expect(pendientesResueltos(ops, SEED.vuelos)).toEqual(['p-hostel-cdmx']);
    ops = aplicar(ops, reservarAlojamiento(ops, 'h-la-candelaria', {}));
    const vuelos = SEED.vuelos.map((v) => (v.id === 'v-mex-mid' ? comprar(v, {}) : v));
    expect(pendientesResueltos(ops, vuelos)).toEqual(['p-hostel-cdmx', 'p-hostels-yucatan', 'p-vuelo-merida']);
  });
});

describe('links', () => {
  it('solo http(s)', () => {
    expect(linkSeguro('hostelworld.com/r/123')).toBe('https://hostelworld.com/r/123');
    expect(linkSeguro('javascript:alert(1)')).toBeUndefined();
    expect(linkSeguro('')).toBeUndefined();
  });
});
