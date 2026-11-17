import { describe, expect, it } from 'vitest';
import { SEED } from '../data/seed';
import { porOrden } from './actividades';
import {
  actividadEnCurso,
  cuentaRegresiva,
  gastoDelDia,
  parseHoraFin,
  pendientesUrgentes,
  proximaActividad,
  textoEnMinutos,
  urgencia,
} from './hoy';

const dia = (id: string) => SEED.dias.find((d) => d.id === id)!;
const lista = (id: string) => SEED.actividades.filter((a) => a.diaId === id).sort(porOrden);
// 15/2 en CDMX (UTC−6)
const lun = (hhmm: string) => new Date(`2027-02-15T${hhmm}:00-06:00`);

describe('Hoy: en curso y próxima', () => {
  it('rango de horas', () => {
    expect(parseHoraFin('8:45–12:45')).toBe(765);
    expect(parseHoraFin('14:00')).toBeNull();
  });

  it('a las 10:00 del lunes: Teotihuacán en curso, próxima la comida de las 13:00', () => {
    expect(actividadEnCurso(lista('2027-02-15'), dia('2027-02-15'), lun('10:00'))?.titulo).toBe(
      'Zona arqueológica de Teotihuacán',
    );
    const p = proximaActividad(lista('2027-02-15'), dia('2027-02-15'), lun('10:00'));
    expect(p?.actividad.hora).toBe('13:00');
    expect(p?.enMinutos).toBe(180);
  });

  it('a las 6:40 la próxima es el desayuno; lo hecho no cuenta', () => {
    const l = lista('2027-02-15');
    expect(proximaActividad(l, dia('2027-02-15'), lun('06:40'))?.actividad.hora).toBe('6:45');
    const conHecho = l.map((a) => (a.hora === '6:45' ? { ...a, estado: 'hecho' as const } : a));
    expect(proximaActividad(conHecho, dia('2027-02-15'), lun('06:40'))?.actividad.hora).toBe('7:00');
  });

  it('las opcionales apagadas no son "la próxima"', () => {
    const dom = new Date('2027-02-14T18:30:00-06:00');
    expect(proximaActividad(lista('2027-02-14'), dia('2027-02-14'), dom)).toBeNull();
  });

  it('la llegada a Cancún se mide en hora de Quintana Roo', () => {
    // 13:45 en Yucatán = 14:45 en Cancún: la llegada (15:00 QR) es en 15 min.
    const sab = new Date('2027-02-20T13:45:00-06:00');
    const p = proximaActividad(lista('2027-02-20'), dia('2027-02-20'), sab);
    expect(p?.actividad.titulo).toBe('Llegada a Cancún');
    expect(p?.enMinutos).toBe(15);
  });

  it('textos', () => {
    expect(textoEnMinutos(1)).toBe('ahora');
    expect(textoEnMinutos(45)).toBe('en 45 min');
    expect(textoEnMinutos(75)).toBe('en 1 h 15');
    expect(textoEnMinutos(120)).toBe('en 2 h');
  });
});

describe('Antes del viaje', () => {
  it('cuenta regresiva en días (fecha de Montevideo)', () => {
    expect(cuentaRegresiva(new Date('2026-11-10T15:00:00-03:00')).dias).toBe(93);
    expect(cuentaRegresiva(new Date('2027-02-11T20:00:00-03:00'))).toEqual({ dias: 0, horas: 7 });
  });

  it('las 3 tareas más urgentes', () => {
    const urg = pendientesUrgentes(SEED.pendientes);
    expect(urg.map((p) => p.id)).toEqual(['p-vuelo-merida', 'p-hostel-cdmx', 'p-hostels-yucatan']);
    const hechas = SEED.pendientes.map((p) => (p.id === 'p-vuelo-merida' ? { ...p, hecho: true } : p));
    expect(pendientesUrgentes(hechas)[2].id).toBe('p-palacio-nacional');
  });

  it('urgencia: vencida, menos de 7 días, con tiempo', () => {
    expect(urgencia('2026-12-15', '2026-12-16')).toBe('vencida');
    expect(urgencia('2026-12-15', '2026-12-10')).toBe('pronto');
    expect(urgencia('2026-12-15', '2026-12-01')).toBe('ok');
    expect(urgencia(undefined, '2026-12-01')).toBeNull();
  });
});

describe('Gasto del día', () => {
  it('suma actividades y gastos sueltos (USD convertidos)', () => {
    const acts = lista('2027-02-13').map((a, i) => (i < 2 ? { ...a, gastoRealMXN: 100 } : a));
    const gastos = [
      { id: 'g', updatedAt: '', fecha: '2027-02-13', categoria: 'Otros' as const, monto: 10, moneda: 'USD' as const },
      { id: 'h', updatedAt: '', fecha: '2027-02-14', categoria: 'Otros' as const, monto: 999, moneda: 'MXN' as const },
    ];
    expect(gastoDelDia('2027-02-13', acts, gastos, 18.7)).toBe(387);
  });
});
