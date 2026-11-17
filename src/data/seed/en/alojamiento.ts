import type { OpcionAlojamiento } from '../../../domain/types';
import type { Traduccion } from './tipos';

export const NOTA_PRECIOS_ALOJAMIENTO_EN =
  'Prices from Hostelworld and comparison sites as of November 2026. February is high season, so expect 10 to 25% more.';

const CDMX = 'Feb 12 to 16 · 4 nights';
const MERIDA = 'Feb 16 to 18 · 2 nights';
const VALLADOLID = 'Feb 18 to 20 · 2 nights';

export const ALOJAMIENTO_EN: Traduccion<OpcionAlojamiento> = {
  'h-massiosare': {
    noches: CDMX,
    precioDorm: 'USD 13 to 16',
    precioPrivada: 'From USD 15 to 40, shared bathroom',
    puntaje: '9.1 to 9.3 (about 2,350 reviews)',
    ubicacion: 'Revillagigedo 47, Centro, 3 min from the Museo de Arte Popular and 10 from Bellas Artes',
    notas:
      'Free wifi and coworking space. Staffed around the clock. Quiet, "not a party hostel"; 4th floor with no elevator, old building: bring earplugs. Vegetarian breakfast included on the rooftop.',
  },
  'h-viajero-cdmx': {
    noches: CDMX,
    precioDorm: 'USD 12.50 to 16',
    precioPrivada: 'USD 27 to 66',
    puntaje: '9.1 (about 4,200); security 9.4',
    ubicacion: 'San Ildefonso 38, 3 blocks from the Templo Mayor',
    notas:
      'Free wifi and coworking space. 24-hour front desk, cameras, lockers (awkward to use, per one review). Very social: noisy at night, though the party stops at 11 p.m.',
  },
  'h-casa-pepe': {
    noches: CDMX,
    precioDorm: 'USD 19 to 21',
    precioPrivada: 'From USD 87',
    puntaje: '8.8 to 9.1 (about 3,100)',
    ubicacion: 'República de Uruguay 86, 300 m from the Zócalo',
    notas:
      '"Very strong wifi". Beds with blackout curtain, light, outlet and safe; lockers. Rooftop bar with a DJ: ask for a low floor.',
  },
  'h-casa-garza': {
    noches: MERIDA,
    precioDorm: 'USD 14 to 16',
    precioPrivada: 'USD 17 to 47',
    puntaje: '9.1 to 9.6 (about 1,000)',
    ubicacion: 'Calle 66 #524, Centro, 1 km from the Plaza Grande and near the TAME bus terminal',
    notas: 'Free wifi. Breakfast included. Front desk open 7:30 a.m. to 9 p.m.: warn them if you arrive late. Not known as a party place.',
  },
  'h-che-nomadas': {
    noches: MERIDA,
    precioDorm: 'USD 9 to 16',
    precioPrivada: 'From USD 31',
    puntaje: '8.8 to 9.3 (over 5,600)',
    ubicacion: 'Calle 62 #433 x 51, 8 min from the Plaza Grande',
    notas: 'Wifi reaches the rooms well, per recent reviews. Large lockers. Social but quiet enough to sleep. Pool.',
  },
  'h-guaya': {
    noches: MERIDA,
    precioDorm: 'USD 10 to 12',
    precioPrivada: 'From USD 30',
    puntaje: '8.2 (313); security 8.5',
    ubicacion: 'Calle 71 #538, Santiago neighborhood; the closest to the bus terminal',
    notas: 'Free wifi. Family-run and quiet. Breakfast included. Location rated 7.5.',
  },
  'h-la-candelaria': {
    noches: VALLADOLID,
    precioDorm: 'USD 15 to 21',
    precioPrivada: 'USD 32 to 49',
    puntaje: '8.9 on Booking (about 1,200)',
    ubicacion:
      'Calle 35 #201F x 42 and 44, facing La Candelaria park; 5 min to the main square and 3 blocks from the ADO terminal and the colectivos',
    notas:
      'Wifi in common areas. Lockers to leave your backpack after check-out (key for Saturday). Garden with hammocks. Breakfast included and bike rental. The dorm can get hot (fan; air conditioning costs extra).',
  },
  'h-tunich-naj': {
    noches: VALLADOLID,
    precioDorm: 'No published price, USD 12 to 15 est.',
    precioPrivada: 'From USD 43',
    puntaje: '7.9 to 8.0 (about 1,000)',
    ubicacion: 'Calle 38 #202A x 43 and 45, Centro, near the ADO terminal',
    notas: 'Wifi throughout the building. Spacious, well-ventilated 9-bed dorm.',
  },
  'h-casa-xtakay': {
    noches: VALLADOLID,
    precioDorm: 'No data',
    precioPrivada: 'From USD 40 (looks like a private-room rate)',
    puntaje: '9.5 (489)',
    ubicacion: 'Centro',
    notas: 'The best rated, but no wifi or dorm details: check when booking.',
  },
};
