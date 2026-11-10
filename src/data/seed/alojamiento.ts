import type { OpcionAlojamiento } from '../../domain/types';
import { base } from './util';

type O = Omit<OpcionAlojamiento, 'updatedAt' | 'delSeed' | 'estado'>;

/** Aviso general de precios (6.4). */
export const NOTA_PRECIOS_ALOJAMIENTO =
  'Precios de Hostelworld y comparadores de noviembre de 2026; febrero es temporada alta, así que contá con 10 a 25% más.';

const CDMX = { ciudad: 'CDMX', noches: '12 al 16/2 · 4 noches', desde: '2027-02-12', hasta: '2027-02-15' } as const;
const MERIDA = { ciudad: 'Mérida', noches: '16 al 18/2 · 2 noches', desde: '2027-02-16', hasta: '2027-02-17' } as const;
const VALLADOLID = {
  ciudad: 'Valladolid',
  noches: '18 al 20/2 · 2 noches',
  desde: '2027-02-18',
  hasta: '2027-02-19',
} as const;

const opciones: O[] = [
  {
    id: 'h-massiosare',
    ...CDMX,
    nombre: 'Massiosare El Hostel',
    precioDorm: 'USD 13 a 16',
    precioPrivada: 'Desde USD 15 a 40, con baño compartido',
    puntaje: '9,1 a 9,3 (unas 2.350 reseñas)',
    ubicacion: 'Revillagigedo 47, Centro, a 3 min del Museo de Arte Popular y a 10 de Bellas Artes',
    direccion: 'Revillagigedo 47, Centro, Ciudad de México',
    notas:
      'Wifi gratis y coworking. Seguridad todo el día. Tranquilo, "no party"; 4.º piso sin ascensor, edificio viejo: llevar tapones. Desayuno vegetariano incluido en la azotea.',
    recomendado: true,
  },
  {
    id: 'h-viajero-cdmx',
    ...CDMX,
    nombre: 'Viajero CDMX Centro',
    precioDorm: 'USD 12,5 a 16',
    precioPrivada: 'USD 27 a 66',
    puntaje: '9,1 (unas 4.200); seguridad 9,4',
    ubicacion: 'San Ildefonso 38, a 3 cuadras del Templo Mayor',
    direccion: 'San Ildefonso 38, Centro, Ciudad de México',
    notas:
      'Wifi gratis y coworking. Recepción 24 h, cámaras, lockers (incómodos según una reseña). Muy social: ruido de noche, cortan la fiesta a las 23 h.',
    recomendado: false,
  },
  {
    id: 'h-casa-pepe',
    ...CDMX,
    nombre: 'Casa Pepe',
    precioDorm: 'USD 19 a 21',
    precioPrivada: 'Desde USD 87',
    puntaje: '8,8 a 9,1 (unas 3.100)',
    ubicacion: 'República de Uruguay 86, a 300 m del Zócalo',
    direccion: 'República de Uruguay 86, Centro, Ciudad de México',
    notas:
      '"Wifi muy potente". Camas con cortina black-out, luz, enchufe y caja de seguridad; lockers. Bar con DJ en la azotea: pedir piso bajo.',
    recomendado: false,
  },
  {
    id: 'h-casa-garza',
    ...MERIDA,
    nombre: 'Hostal Boutique Casa Garza',
    precioDorm: 'USD 14 a 16',
    precioPrivada: 'USD 17 a 47',
    puntaje: '9,1 a 9,6 (unas 1.000)',
    ubicacion: 'Calle 66 #524, Centro, a 1 km de la Plaza Grande y cerca de la terminal TAME',
    direccion: 'Calle 66 524, Centro, Mérida, Yucatán',
    notas:
      'Wifi gratis. Desayuno incluido. Recepción de 7:30 a 21:00: avisar si llegás fuera de hora. Sin fama de fiesta.',
    recomendado: true,
  },
  {
    id: 'h-che-nomadas',
    ...MERIDA,
    nombre: 'Che Nomadas Mérida',
    precioDorm: 'USD 9 a 16',
    precioPrivada: 'Desde USD 31',
    puntaje: '8,8 a 9,3 (más de 5.600)',
    ubicacion: 'Calle 62 #433 x 51, a 8 min de la Plaza Grande',
    direccion: 'Calle 62 433, Mérida, Yucatán',
    notas:
      'Wifi que llega bien a las habitaciones según reseñas recientes. Lockers grandes. Social pero silencioso para dormir. Piscina.',
    recomendado: false,
  },
  {
    id: 'h-guaya',
    ...MERIDA,
    nombre: 'Guaya Hostel',
    precioDorm: 'USD 10 a 12',
    precioPrivada: 'Desde USD 30',
    puntaje: '8,2 (313); seguridad 8,5',
    ubicacion: 'Calle 71 #538, barrio de Santiago; el más cercano a la terminal',
    direccion: 'Calle 71 538, Mérida, Yucatán',
    notas: 'Wifi gratis. Familiar y tranquilo. Desayuno incluido. Ubicación con nota 7,5.',
    recomendado: false,
  },
  {
    id: 'h-la-candelaria',
    ...VALLADOLID,
    nombre: 'Hostel La Candelaria',
    precioDorm: 'USD 15 a 21',
    precioPrivada: 'USD 32 a 49',
    puntaje: '8,9 en Booking (unas 1.200)',
    ubicacion:
      'Calle 35 #201F x 42 y 44, frente al parque La Candelaria; 5 min a la plaza y 3 cuadras de ADO y los colectivos',
    direccion: 'Calle 35 201F, Valladolid, Yucatán',
    notas:
      'Wifi en áreas comunes. Lockers para dejar la mochila después del check-out (clave para el sábado). Jardín con hamacas. Desayuno incluido y alquiler de bicis. El dormitorio puede ser caluroso (ventilador; aire con costo).',
    recomendado: true,
  },
  {
    id: 'h-tunich-naj',
    ...VALLADOLID,
    nombre: 'Hotel Tunich Naj & Hostal',
    precioDorm: 'Sin precio publicado, USD 12 a 15 est.',
    precioPrivada: 'Desde USD 43',
    puntaje: '7,9 a 8,0 (unas 1.000)',
    ubicacion: 'Calle 38 #202A x 43 y 45, Centro, cerca de ADO',
    direccion: 'Calle 38 202A, Valladolid, Yucatán',
    notas: 'Wifi en todo el edificio. Dormitorio de 9 camas amplio y ventilado.',
    recomendado: false,
  },
  {
    id: 'h-casa-xtakay',
    ...VALLADOLID,
    nombre: 'Hostel Casa Xtakay',
    precioDorm: 'Sin datos',
    precioPrivada: 'Desde USD 40 (parece tarifa de privada)',
    puntaje: '9,5 (489)',
    ubicacion: 'Centro',
    direccion: 'Hostel Casa Xtakay, Valladolid, Yucatán',
    notas: 'El mejor puntuado, pero sin datos de wifi ni dormitorio: revisar al reservar.',
    recomendado: false,
  },
];

export const SEED_ALOJAMIENTO: OpcionAlojamiento[] = opciones.map((o) => ({
  ...base(o.id),
  ...o,
  estado: 'opcion',
}));
