import type { PlanPresupuesto, ResumenViaje } from '../../../domain/types';
import { PRESUPUESTO as ES, RESUMEN as RES_ES } from '../plan';

/** Los números salen del seed en español; acá solo van los textos. */
export const PRESUPUESTO_EN: PlanPresupuesto = {
  ...ES,
  notaTope: 'Hard cap: USD 1,000. Travel insurance is separate and does not count toward the cap.',
  notaTipoCambio: 'MXN 18.7 per USD (Banxico FIX on 11/6/2026: 18.71).',
  semana: [
    { ...ES.semana[0], etiqueta: 'Lodging, 8 nights in a dorm' },
    { ...ES.semana[1], etiqueta: 'Food' },
    { ...ES.semana[2], etiqueta: 'Transport (Mérida flight and bus to Cancún included)' },
    { ...ES.semana[3], etiqueta: 'Entry tickets and tours' },
    { ...ES.semana[4], etiqueta: 'Other (eSIM, ATMs, laundry, misc., 5% for ticket price increases)' },
  ],
  despues: [
    { ...ES.despues[0], concepto: 'Weekend with the team, 3 nights (unverified)' },
    { ...ES.despues[1], concepto: 'Night of 2/26 (not covered by the company)' },
    { ...ES.despues[2], concepto: 'Night of 2/27' },
    { ...ES.despues[3], concepto: 'Quintana Roo Visitax' },
  ],
  margen: [
    'Buying the Mérida flight at MXN 1,300 or less saves USD 21 (total USD 980).',
    'Adding Ek Balam costs USD 56 (total USD 1,057) and goes over the cap even with the cheap flight (USD 1,036).',
    'Swapping Kinich for the Izamal market and skipping El Cardenal and one mezcal saves about USD 28.',
    'Skipping Salón Los Ángeles saves USD 15.',
  ],
  reglas: [
    'The trip is paid with the pending payments once they arrive, not with the bank balance or the stocks.',
    'Log expenses under the category "México feb 2027".',
  ],
};

export const RESUMEN_EN: ResumenViaje = {
  ...RES_ES,
  nombre: 'Mexico, February 2027',
  ruta: [
    'Mexico City 4 nights (2/12 to 2/16), Mérida 2 nights (2/16 to 2/18), Valladolid 2 nights (2/18 to 2/20), in shared hostel dorms. No working days.',
    'The Mexica (Anthropology Museum, Templo Mayor, Teotihuacán), the Maya (Uxmal, Chichén Itzá), the colonial (downtown Mexico City, Mérida, Izamal, Valladolid) and a single cenote (Oxmán).',
    'No beach and no lucha libre. Ek Balam is optional (+USD 56).',
  ],
  ritmo: [
    'Friday the 12th is just arriving, having dinner and sleeping.',
    'A single early start (the Tuesday 16th flight) and a planned nap every afternoon in Yucatán.',
    'On Monday the 15th, with the Mexico City museums closed, it is Teotihuacán, which opens every day.',
  ],
  despues: [
    'Weekend with the team: Saturday 20th in Cancún, Sunday 21st and Monday 22nd in Playa del Carmen (to be confirmed with friends).',
    'Company retreat in Cozumel (2/23 to 2/26), with lodging, food and transfer paid by the company.',
    'Nights of 2/26 and 2/27 in Cancún (you pay for them) and the flight home on 2/28.',
  ],
  zonasHorarias:
    'Mexico City and Yucatán are 3 h behind Montevideo (UTC−6). Cancún and Cozumel (Quintana Roo) are 1 h ahead of Yucatán (UTC−5).',
  experienciasGastronomicas: [
    { ...RES_ES.experienciasGastronomicas[0], titulo: 'Breakfast at El Cardenal' },
    { ...RES_ES.experienciasGastronomicas[1], titulo: 'Tacos at El Califa de León' },
    { ...RES_ES.experienciasGastronomicas[2], titulo: 'Cochinita at La Lupita' },
    { ...RES_ES.experienciasGastronomicas[3], titulo: 'Yucatecan cuisine at Kinich in Izamal' },
  ],
  nochesMemorables: [
    { ...RES_ES.nochesMemorables[0], titulo: 'Pulque, tacos and mezcal around the Centro' },
    { ...RES_ES.nochesMemorables[1], titulo: 'Live orchestras at Salón Los Ángeles' },
    { ...RES_ES.nochesMemorables[2], titulo: 'Popular dancing in Parque de Santiago in Mérida' },
  ],
  comida: [
    'You eat well on MXN 400 to 650 a day by alternating markets and taquerías with two or three chosen sit-down meals.',
    'Prices are estimates; confirm them on Google Maps.',
    'To look after your stomach: busy stalls with food made on the spot, salsas a little at a time, bottled water and no raw seafood on the street.',
  ],
  porQueOxman:
    'It is open to the sky and deep, you can bike there from the hostel, and the swimming beats the more famous ones. Suytun is the one from the platform photo, but you go there to pose more than to swim; Ik Kil is just as pretty, but it fills up with the Chichén tours at midday.',
};
