import { describe, expect, it } from 'vitest';
import { PRESUPUESTO, RESUMEN, SEED } from './seed';

const { dias, actividades, alojamientos, vuelos, tramos, lugares, pendientes, decisiones, planB, info, contactos } =
  SEED;

const diaIds = new Set(dias.map((d) => d.id));
const lugarIds = new Set(lugares.map((l) => l.id));
const textoDe = (diaId: string) =>
  actividades
    .filter((a) => a.diaId === diaId)
    .map((a) => `${a.hora} ${a.titulo} ${a.descripcion} ${a.comoLlegar ?? ''} ${a.costoTexto ?? ''}`)
    .join(' | ');

describe('seed: días', () => {
  it('cubre del jue 11/2 al lun 1/3 sin huecos', () => {
    expect(dias).toHaveLength(19);
    const d0 = new Date('2027-02-11T12:00:00Z');
    dias.forEach((d, i) => {
      const esperado = new Date(d0.getTime() + i * 86_400_000).toISOString().slice(0, 10);
      expect(d.id).toBe(esperado);
      expect(d.fecha).toBe(d.id);
    });
  });

  it('del 12 al 20 tienen detalle completo y los costos por día del plan', () => {
    const centrales = [999, 1267, 1477, 1282, 2607, 1498, 1078, 1835, 640];
    const bajos = [691, 842, 812, 932, 1862, 1273, 693, 1570, 470];
    const altos = [1605, 2019, 1859, 1759, 4057, 2123, 1461, 2708, 860];
    const usd = [53, 68, 79, 69, 139, 80, 58, 98, 34];
    const nucleo = dias.filter((d) => d.id >= '2027-02-12' && d.id <= '2027-02-20');
    expect(nucleo).toHaveLength(9);
    nucleo.forEach((d, i) => {
      expect(d.detalle).toBe('completo');
      expect(d.costoCentralMXN).toBe(centrales[i]);
      expect(d.costoBajoMXN).toBe(bajos[i]);
      expect(d.costoAltoMXN).toBe(altos[i]);
      expect(d.costoCentralUSD).toBe(usd[i]);
    });
    expect(dias.filter((d) => d.detalle === 'simple')).toHaveLength(10);
  });

  it('todos los días tienen al menos una actividad', () => {
    for (const d of dias) expect(actividades.some((a) => a.diaId === d.id), d.id).toBe(true);
  });

  it('zonas horarias: CDMX y Yucatán UTC−6, Quintana Roo UTC−5', () => {
    const tz = Object.fromEntries(dias.map((d) => [d.id, d.zonaHoraria]));
    expect(tz['2027-02-13']).toBe('America/Mexico_City');
    expect(tz['2027-02-17']).toBe('America/Merida');
    expect(tz['2027-02-24']).toBe('America/Cancun');
    expect(actividades.find((a) => a.titulo === 'Llegada a Cancún')?.zonaHoraria).toBe('America/Cancun');
  });

  it('cada noche del núcleo apunta a la ciudad del hostel', () => {
    const noche = Object.fromEntries(dias.map((d) => [d.id, d.nocheEn]));
    for (const f of ['12', '13', '14', '15']) expect(noche[`2027-02-${f}`]).toBe('CDMX');
    for (const f of ['16', '17']) expect(noche[`2027-02-${f}`]).toBe('Mérida');
    for (const f of ['18', '19']) expect(noche[`2027-02-${f}`]).toBe('Valladolid');
  });
});

describe('seed: actividades', () => {
  it('cantidad por día (núcleo)', () => {
    const cuenta = (id: string) => actividades.filter((a) => a.diaId === id).length;
    expect(
      ['12', '13', '14', '15', '16', '17', '18', '19', '20'].map((f) => cuenta(`2027-02-${f}`)),
    ).toEqual([6, 7, 9, 8, 10, 8, 9, 8, 6]);
  });

  it('ids únicos, días y lugares válidos', () => {
    expect(new Set(actividades.map((a) => a.id)).size).toBe(actividades.length);
    for (const a of actividades) {
      expect(diaIds.has(a.diaId), a.id).toBe(true);
      if (a.lugarId) expect(lugarIds.has(a.lugarId), `${a.id} → ${a.lugarId}`).toBe(true);
      expect(a.estado).toBe('pendiente');
    }
  });

  it('lo que dice "est." queda marcado como estimado o sin verificar', () => {
    // Chichén: la entrada es exacta; solo el guía es estimado (la UI resalta el "est." dentro del texto).
    const exactas = new Set(['2027-02-19-03']);
    for (const a of actividades) {
      if (exactas.has(a.id)) continue;
      if (/\best\./.test(a.costoTexto ?? '')) expect(a.fiabilidad, a.id).toMatch(/estimado|sin_verificar/);
    }
  });

  it('opcionales: Salón Los Ángeles y Ek Balam, apagados al empezar', () => {
    const op = actividades.filter((a) => a.opcional);
    expect(op.map((a) => a.lugarId).sort()).toEqual(['l-ek-balam', 'l-salon-los-angeles']);
    for (const a of op) expect(a.activa).toBe(false);
  });

  it('datos clave del itinerario', () => {
    expect(textoDe('2027-02-12')).toContain('Amajac');
    expect(textoDe('2027-02-13')).toContain('MXN 210; transporte MXN 6');
    expect(textoDe('2027-02-14')).toContain('Lerdo 206');
    expect(textoDe('2027-02-15')).toContain('Sala 8');
    expect(textoDe('2027-02-16')).toContain('Calle 69 x 68 y 70');
    expect(textoDe('2027-02-17')).toContain('MXN 586');
    expect(textoDe('2027-02-18')).toContain('15:44 y 18:25');
    expect(textoDe('2027-02-19')).toContain('Calle 39 entre 44 y 46');
    expect(textoDe('2027-02-20')).toContain('Calle 39 x 46');
    expect(textoDe('2027-02-11')).toContain('3:06');
    expect(textoDe('2027-02-28')).toContain('Lima');
    expect(textoDe('2027-03-01')).toContain('Día libre aprobado');
  });
});

describe('seed: alojamiento y transporte', () => {
  it('3 opciones por ciudad, una recomendada, ninguna reservada', () => {
    expect(alojamientos).toHaveLength(9);
    for (const c of ['CDMX', 'Mérida', 'Valladolid'] as const) {
      const ops = alojamientos.filter((o) => o.ciudad === c);
      expect(ops).toHaveLength(3);
      expect(ops.filter((o) => o.recomendado)).toHaveLength(1);
    }
    expect(alojamientos.every((o) => o.estado === 'opcion')).toBe(true);
    expect(alojamientos.filter((o) => o.recomendado).map((o) => o.nombre)).toEqual([
      'Massiosare El Hostel',
      'Hostal Boutique Casa Garza',
      'Hostel La Candelaria',
    ]);
  });

  it('vuelos: ida y vuelta comprados, Mérida pendiente', () => {
    expect(vuelos.map((v) => [v.id, v.estado])).toEqual([
      ['v-ida', 'comprado'],
      ['v-mex-mid', 'pendiente'],
      ['v-vuelta', 'comprado'],
    ]);
  });

  it('los 12 tramos de la tabla 6.5', () => {
    expect(tramos).toHaveLength(12);
    expect(new Set(tramos.map((t) => t.id)).size).toBe(12);
  });
});

describe('seed: lugares', () => {
  it('las 10 filas de la tabla de atracciones están', () => {
    for (const id of [
      'l-antropologia',
      'l-templo-mayor',
      'l-palacio-nacional',
      'l-teotihuacan',
      'l-salon-los-angeles',
      'l-uxmal',
      'l-izamal',
      'l-chichen',
      'l-oxman',
      'l-ek-balam',
    ]) {
      expect(lugarIds.has(id), id).toBe(true);
    }
  });

  it('las 13 direcciones de comida de 6.7', () => {
    const conDireccion = lugares.filter((l) => l.direccion).map((l) => l.nombre);
    for (const n of [
      'Los Cocuyos',
      'El Huequito',
      'El Califa de León',
      'Las Duelistas',
      'Bósforo',
      'El Cardenal',
      'Café de Tacuba',
      'Pastelería Ideal',
      'Azul Histórico',
      'Cantina La Negrita',
      'La Chaya Maya',
      'Kinich',
    ]) {
      expect(conDireccion, n).toContain(n);
    }
    expect(lugares.some((l) => l.nombre === 'Dulcería de Celaya')).toBe(true);
  });

  it('días válidos y ids únicos', () => {
    expect(lugarIds.size).toBe(lugares.length);
    for (const l of lugares) for (const d of l.diaIds) expect(diaIds.has(d), `${l.id} → ${d}`).toBe(true);
  });

  it('destacados apuntan a días y lugares existentes', () => {
    for (const d of [...RESUMEN.experienciasGastronomicas, ...RESUMEN.nochesMemorables]) {
      expect(diaIds.has(d.diaId)).toBe(true);
      if (d.lugarId) expect(lugarIds.has(d.lugarId)).toBe(true);
    }
  });
});

describe('seed: reservas, info y plan B', () => {
  it('pendientes por grupo (3 / 7 / 3), todos sin hacer', () => {
    const g = (x: string) => pendientes.filter((p) => p.grupo === x).length;
    expect([g('Reservar ya'), g('Más adelante'), g('En destino')]).toEqual([3, 7, 3]);
    expect(pendientes.every((p) => !p.hecho)).toBe(true);
    expect(pendientes.find((p) => p.id === 'p-vuelo-merida')?.fechaLimite).toBe('2026-12-15');
  });

  it('2 decisiones abiertas, 12 plan B, secciones de info', () => {
    expect(decisiones).toHaveLength(2);
    expect(planB).toHaveLength(12);
    expect(info.map((i) => i.titulo)).toEqual([
      'Ingreso a México',
      'Dinero',
      'Conexión',
      'Seguridad y salud',
      'Seguro',
      'Equipaje',
      'Cierres y eventos del 12 al 20/2',
    ]);
    expect(contactos.length).toBeGreaterThanOrEqual(8);
  });

  it('ids únicos en todas las tablas', () => {
    for (const [tabla, rows] of Object.entries(SEED)) {
      const ids = (rows as readonly { id: string }[]).map((r) => r.id);
      expect(new Set(ids).size, tabla).toBe(ids.length);
    }
  });
});

describe('seed: presupuesto', () => {
  const p = PRESUPUESTO;
  const suma = (k: 'bajo' | 'central' | 'alto') => p.semana.reduce((s, f) => s + f[k], 0);

  it('las categorías suman el total de la semana (±1 por redondeo del plan)', () => {
    expect(Math.abs(suma('bajo') - p.totalSemana.bajo)).toBeLessThanOrEqual(1);
    expect(suma('central')).toBe(p.totalSemana.central);
    expect(Math.abs(suma('alto') - p.totalSemana.alto)).toBeLessThanOrEqual(1);
  });

  it('después del 20/2 y totales del viaje', () => {
    expect(p.despues.reduce((s, e) => s + e.usd, 0)).toBe(p.subtotalDespuesUSD);
    for (const k of ['bajo', 'central', 'alto'] as const) {
      expect(p.totalSemana[k] + p.subtotalDespuesUSD).toBe(p.totalViaje[k]);
      expect(p.totalViaje[k] - 55).toBe(p.totalViajeSinNoche26[k]);
    }
    expect(p.topeUSD).toBe(1000);
    expect(p.tipoCambioDefault).toBe(18.7);
  });
});
