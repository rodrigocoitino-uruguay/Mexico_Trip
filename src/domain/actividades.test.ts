import { describe, expect, it } from 'vitest';
import { SEED } from '../data/seed';
import { editarActividad, moverActividad, nuevaActividad, ordenParaHora, porOrden } from './actividades';
import { estadoDia, momentoViaje, parseHora } from './tiempo';

const delDia = (id: string) => SEED.actividades.filter((a) => a.diaId === id);
const horas = (lista: { hora: string }[]) => lista.map((a) => a.hora);

describe('parseHora', () => {
  it('lee el inicio de las horas del plan', () => {
    expect(parseHora('9:00–13:30')).toBe(540);
    expect(parseHora('aprox. 11:30')).toBe(690);
    expect(parseHora('14:10')).toBe(850);
    expect(parseHora('Noche')).toBeNull();
    expect(parseHora('')).toBeNull();
  });
});

describe('ordenParaHora', () => {
  const sab = delDia('2027-02-13');
  it('ubica en orden cronológico', () => {
    const o = ordenParaHora(sab, '16:00');
    const lista = [...sab, { ...sab[0], id: 'x', hora: '16:00', orden: o }].sort(porOrden);
    expect(horas(lista)).toEqual(['8:00', '9:00–13:30', '14:00', '15:30', '16:00', '18:00', '19:30', '21:00']);
  });
  it('antes de todo, al final y sin hora', () => {
    expect(ordenParaHora(sab, '6:00')).toBeLessThan(sab[0].orden);
    expect(ordenParaHora(sab, '23:30')).toBeGreaterThan(sab[sab.length - 1].orden);
    expect(ordenParaHora(sab, 'después de cenar')).toBeGreaterThan(sab[sab.length - 1].orden);
    expect(ordenParaHora([], '10:00')).toBe(10);
  });
});

describe('mover una actividad de día', () => {
  it('cambia el día, la ubica por hora y la marca como editada', () => {
    const bosforo = SEED.actividades.find((a) => a.id === '2027-02-13-07')!; // 21:00 Mezcal en Bósforo
    const destino = delDia('2027-02-15');
    const movida = moverActividad(bosforo, '2027-02-15', destino, new Date('2026-12-01T00:00:00Z'));
    expect(movida.diaId).toBe('2027-02-15');
    expect(movida.editadoPorUsuario).toBe(true);
    expect(movida.updatedAt).toBe('2026-12-01T00:00:00.000Z');
    const lista = [...destino, movida].sort(porOrden);
    expect(lista[lista.length - 1].id).toBe(bosforo.id); // 21:00 queda después de la cena de las 19:00
    expect(movida.estado).toBe(bosforo.estado);
  });
  it('al mismo día no cambia nada', () => {
    const a = SEED.actividades[3];
    expect(moverActividad(a, a.diaId, delDia(a.diaId))).toBe(a);
  });
});

describe('editar y agregar', () => {
  it('cambiar la hora la reubica', () => {
    const dom = delDia('2027-02-14');
    const cardenal = dom[0]; // 8:00
    const ed = editarActividad(cardenal, { hora: '15:30' }, dom);
    const lista = [...dom.filter((a) => a.id !== cardenal.id), ed].sort(porOrden);
    expect(horas(lista).slice(3, 6)).toEqual(['14:00', '15:00', '15:30']);
  });
  it('una nueva queda creada por vos, pendiente y en su lugar', () => {
    const vie = delDia('2027-02-19');
    const n = nuevaActividad('2027-02-19', { hora: '17:45', titulo: ' Helado ', categoria: 'comida', descripcion: '' }, vie);
    expect(n.titulo).toBe('Helado');
    expect(n.estado).toBe('pendiente');
    expect(n.delSeed).toBeUndefined();
    const lista = [...vie, n].sort(porOrden);
    expect(lista.at(-2)?.id).toBe(n.id); // antes de la cena de las 19:30
  });
});

describe('estado del día según la zona horaria', () => {
  const dias = SEED.dias;
  it('antes, durante y después del viaje', () => {
    expect(momentoViaje(dias, new Date('2026-11-10T12:00:00Z'))).toEqual({ fase: 'antes', hoyId: null });
    // 13/2 a las 23:30 en CDMX = 14/2 05:30 UTC
    expect(momentoViaje(dias, new Date('2027-02-14T05:30:00Z')).hoyId).toBe('2027-02-13');
    expect(momentoViaje(dias, new Date('2027-03-05T12:00:00Z')).fase).toBe('despues');
  });
  it('días pasados', () => {
    const now = new Date('2027-02-15T15:00:00Z');
    expect(estadoDia(dias[2], now)).toBe('pasado');
    expect(estadoDia(dias[4], now)).toBe('hoy');
    expect(estadoDia(dias[5], now)).toBe('futuro');
  });
});
