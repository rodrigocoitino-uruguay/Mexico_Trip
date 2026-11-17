import type { PlanPresupuesto, ResumenViaje } from '../../domain/types';
import { PRESUPUESTO, RESUMEN } from '../seed/plan';

const ETIQUETAS_SEMANA = [
  'Lodging, 8 nights in a dorm',
  'Food',
  'Transport (Mérida flight and bus to Cancún included)',
  'Tickets and tours',
  'Other (eSIM, ATMs, laundry, miscellaneous, 5% for ticket price increases)',
];

export const PRESUPUESTO_EN: PlanPresupuesto = {
  ...PRESUPUESTO,
  notaTope: 'Hard cap: USD 1,000. Travel insurance is separate and does not count toward the cap.',
  notaTipoCambio: '18.7 MXN per USD (Banxico FIX on Nov 6, 2026: 18.71).',
  semana: PRESUPUESTO.semana.map((f, i) => ({ ...f, etiqueta: ETIQUETAS_SEMANA[i] })),
  despues: [
    { concepto: 'Weekend in Cancún and Playa del Carmen, 3 nights (not verified)', usd: 175 },
    { concepto: 'Night of Feb 26 (only if the company does not cover it)', usd: 55 },
    { concepto: 'Night of Feb 27', usd: 50 },
    { concepto: 'Quintana Roo Visitax', usd: 16 },
  ],
  margen: [
    'Buying the Mérida flight at MXN 1,300 or less saves USD 21 (total USD 980).',
    'If the company covers the night of Feb 26, it saves USD 55 (total USD 947).',
    'Adding Ek Balam costs USD 56 (total USD 1,057); it only fits under the cap with the two points above (USD 981).',
    'Swapping Kinich for the Izamal market and skipping El Cardenal and one mezcal saves about USD 28.',
    'Skipping Salón Los Ángeles saves USD 15.',
  ],
  // Cómo se paga el viaje es de uso personal: no se muestra en la versión en inglés.
  reglas: [],
};

export const RESUMEN_EN: ResumenViaje = {
  ...RESUMEN,
  nombre: 'Mexico, February 2027',
  ruta: [
    'Mexico City 4 nights (Feb 12 to 16), Mérida 2 nights (Feb 16 to 18), Valladolid 2 nights (Feb 18 to 20), in shared hostel dorms. No working days.',
    'The Mexica (Anthropology Museum, Templo Mayor, Teotihuacán), the Maya (Uxmal, Chichén Itzá), the colonial (Mexico City Center, Mérida, Izamal, Valladolid) and a single cenote (Oxmán).',
    'No beach and no lucha libre. Ek Balam is optional (+USD 56).',
  ],
  ritmo: [
    'Friday, Feb 12 is just arriving, dinner and sleep.',
    'A single early start (the Tuesday, Feb 16 flight) and a siesta planned every afternoon in Yucatán.',
    'On Monday, Feb 15, with Mexico City museums closed, it is Teotihuacán, which opens every day.',
  ],
  despues: [
    'Weekend with the team: Saturday, Feb 20 in Cancún and Sunday, Feb 21 and Monday, Feb 22 in Playa del Carmen (to be confirmed).',
    'Company retreat in Cozumel (Feb 23 to 26), with lodging and meals paid by the company.',
    'Nights of Feb 26 and 27 in Cancún (the 26th only if the company does not cover it) and flight home on Feb 28.',
  ],
  zonasHorarias:
    'Mexico City and Yucatán are 3 h behind Montevideo (UTC−6). Cancún, Playa del Carmen and Cozumel (Quintana Roo) are 1 h ahead of Yucatán (UTC−5).',
  experienciasGastronomicas: [
    { ...RESUMEN.experienciasGastronomicas[0], titulo: 'Breakfast at El Cardenal' },
    { ...RESUMEN.experienciasGastronomicas[1], titulo: 'Tacos at El Califa de León' },
    { ...RESUMEN.experienciasGastronomicas[2], titulo: 'Cochinita at La Lupita' },
    { ...RESUMEN.experienciasGastronomicas[3], titulo: 'Yucatecan cuisine at Kinich in Izamal' },
  ],
  nochesMemorables: [
    { ...RESUMEN.nochesMemorables[0], titulo: 'Pulque, tacos and mezcal around the Center' },
    { ...RESUMEN.nochesMemorables[1], titulo: 'Live orchestras at Salón Los Ángeles' },
    { ...RESUMEN.nochesMemorables[2], titulo: 'Popular dancing at Parque de Santiago in Mérida' },
  ],
  comida: [
    'You can eat well on MXN 400 to 650 a day by alternating markets and taquerías with two or three chosen tables.',
    'Prices are estimates; confirm them on Google Maps.',
    'To look after your stomach: busy stalls with food made on the spot, sauces little by little, bottled water and no raw seafood from the street.',
  ],
  porQueOxman:
    'It is open and deep, you can get there by bike from the hostel and the swimming is better than at the most famous ones. Suytun is the platform-photo one, but you go there to pose rather than swim; Ik Kil is just as pretty, but it fills up with the Chichén tours at midday.',
};
