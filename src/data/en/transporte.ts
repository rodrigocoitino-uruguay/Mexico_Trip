import type { OpcionAlojamiento, Tramo, Vuelo } from '../../domain/types';

export type TextosAlojamiento = Partial<
  Pick<OpcionAlojamiento, 'noches' | 'precioDorm' | 'precioPrivada' | 'puntaje' | 'ubicacion' | 'notas'>
>;

export const NOTA_PRECIOS_ALOJAMIENTO_EN =
  'Prices from Hostelworld and comparison sites in November 2026; February is high season, so expect 10 to 25% more.';

export const ALOJAMIENTOS_EN: Record<string, TextosAlojamiento> = {
  'h-massiosare': {
    noches: 'Feb 12–16 · 4 nights',
    precioDorm: 'USD 13 to 16',
    precioPrivada: 'From USD 15 to 40, shared bathroom',
    puntaje: '9.1 to 9.3 (about 2,350 reviews)',
    ubicacion: 'Revillagigedo 47, Centro, 3 min from the Museo de Arte Popular and 10 from Bellas Artes',
    notas:
      'Free wifi and coworking. Security around the clock. Quiet, “no party”; 4th floor with no elevator, old building: bring earplugs. Vegetarian breakfast included on the roof terrace.',
  },
  'h-viajero-cdmx': {
    noches: 'Feb 12–16 · 4 nights',
    precioDorm: 'USD 12.5 to 16',
    precioPrivada: 'USD 27 to 66',
    puntaje: '9.1 (about 4,200); security 9.4',
    ubicacion: 'San Ildefonso 38, 3 blocks from the Templo Mayor',
    notas:
      'Free wifi and coworking. 24 h front desk, cameras, lockers (awkward according to one review). Very social: noise at night, the party is cut at 11 p.m.',
  },
  'h-casa-pepe': {
    noches: 'Feb 12–16 · 4 nights',
    precioDorm: 'USD 19 to 21',
    precioPrivada: 'From USD 87',
    puntaje: '8.8 to 9.1 (about 3,100)',
    ubicacion: 'República de Uruguay 86, 300 m from the Zócalo',
    notas:
      '“Very powerful wifi”. Beds with blackout curtain, light, outlet and safe box; lockers. DJ bar on the roof terrace: ask for a low floor.',
  },
  'h-casa-garza': {
    noches: 'Feb 16–18 · 2 nights',
    precioDorm: 'USD 14 to 16',
    precioPrivada: 'USD 17 to 47',
    puntaje: '9.1 to 9.6 (about 1,000)',
    ubicacion: 'Calle 66 #524, Centro, 1 km from the Plaza Grande and near the TAME terminal',
    notas: 'Free wifi. Breakfast included. Front desk open 7:30 a.m. to 9 p.m.: let them know if you arrive late. Not known as a party hostel.',
  },
  'h-che-nomadas': {
    noches: 'Feb 16–18 · 2 nights',
    precioDorm: 'USD 9 to 16',
    precioPrivada: 'From USD 31',
    puntaje: '8.8 to 9.3 (over 5,600)',
    ubicacion: 'Calle 62 #433 between 51, 8 min from the Plaza Grande',
    notas: 'Wifi reaches the rooms well according to recent reviews. Large lockers. Social but quiet for sleeping. Pool.',
  },
  'h-guaya': {
    noches: 'Feb 16–18 · 2 nights',
    precioDorm: 'USD 10 to 12',
    precioPrivada: 'From USD 30',
    puntaje: '8.2 (313); security 8.5',
    ubicacion: 'Calle 71 #538, Santiago neighborhood; the closest to the bus terminal',
    notas: 'Free wifi. Family-run and quiet. Breakfast included. Location scored 7.5.',
  },
  'h-la-candelaria': {
    noches: 'Feb 18–20 · 2 nights',
    precioDorm: 'USD 15 to 21',
    precioPrivada: 'USD 32 to 49',
    puntaje: '8.9 on Booking (about 1,200)',
    ubicacion: 'Calle 35 #201F between 42 and 44, across from La Candelaria park; 5 min to the plaza and 3 blocks from ADO and the colectivos',
    notas:
      'Wifi in common areas. Lockers to leave your backpack after check-out (key for Saturday). Garden with hammocks. Breakfast included and bike rental. The dorm can be hot (fan; A/C costs extra).',
  },
  'h-tunich-naj': {
    noches: 'Feb 18–20 · 2 nights',
    precioDorm: 'No published price, USD 12 to 15 est.',
    precioPrivada: 'From USD 43',
    puntaje: '7.9 to 8.0 (about 1,000)',
    ubicacion: 'Calle 38 #202A between 43 and 45, Centro, near ADO',
    notas: 'Wifi throughout the building. Spacious, well-ventilated 9-bed dorm.',
  },
  'h-casa-xtakay': {
    noches: 'Feb 18–20 · 2 nights',
    precioDorm: 'No data',
    precioPrivada: 'From USD 40 (looks like a private-room rate)',
    puntaje: '9.5 (489)',
    ubicacion: 'Centro',
    notas: 'The best rated, but no data on wifi or dorm: check when booking.',
  },
};

export type TextosVuelo = Partial<
  Pick<Vuelo, 'aerolinea' | 'origen' | 'destino' | 'salida' | 'llegada' | 'duracion' | 'escala' | 'tarifa' | 'equipaje' | 'costo' | 'notas'>
>;

export const VUELOS_EN: Record<string, TextosVuelo> = {
  'v-ida': {
    destino: 'Mexico City (AICM)',
    salida: '3:06 a.m.',
    llegada: '2:30 p.m.',
    duracion: '14 h 24 min',
    escala: '1 stop in Panama',
    equipaje: 'Carry-on bag',
    costo: 'Paid by the company',
    notas:
      'Purchased; cannot be changed. You leave home Thursday night, Feb 11: arrange the overnight ride to Carrasco. Copa usually operates from AICM Terminal 1; to be confirmed.',
  },
  'v-mex-mid': {
    aerolinea: 'Viva, Volaris or Aeroméxico',
    origen: 'Mexico City (AICM)',
    salida: 'Between 8:30 and 10:30 a.m.',
    llegada: '2 h later',
    duracion: '2 h',
    escala: 'Nonstop',
    tarifa: 'The one that includes a 10 kg carry-on',
    equipaje: 'Carry-on 10 kg (the cheapest Viva and Volaris fare does not include it)',
    costo: 'MXN 1,300 to 2,300 (central MXN 1,700, USD 91)',
    notas: 'Still to buy, you pay for it. From AICM (MEX), not from AIFA (NLU). Buy before Dec 15, 2026.',
  },
  'v-vuelta': {
    destino: 'Montevideo',
    salida: '4:10 p.m.',
    llegada: '6:40 a.m.',
    duracion: '12 h 30 min',
    escala: '1 stop in Lima',
    equipaje: 'Carry-on bag',
    costo: 'Paid by the company',
    notas: 'Purchased; cannot be changed. Lands Monday, Mar 1 (approved day off).',
  },
};

export type TextosTramo = Partial<Pick<Tramo, 'nombre' | 'opciones' | 'costo' | 'duracion' | 'recomendada'>>;

export const TRAMOS_EN: Record<string, TextosTramo> = {
  't-aicm-hostel': {
    nombre: 'AICM to the hostel',
    opciones: 'Metrobús L4 Quetzalcóatl route / Uber or DiDi / authorized taxi / Metro',
    costo: 'MXN 30 / 150 to 250 est. / 300 to 400 est. / 5',
    duracion: '40 to 50 min / 30 to 50 / 30 to 50 / 45 with transfers',
    recomendada:
      'Metrobús: stops at both terminals and crosses the Center. Uber if you arrive exhausted. Not the Metro, with luggage and two transfers.',
  },
  't-dentro-cdmx': {
    nombre: 'Getting around Mexico City',
    opciones: 'On foot / Metro / Metrobús / Uber',
    costo: 'Free / MXN 5 / 6 / 60 to 130 est. per ride',
    recomendada: 'On foot and Metro by day; Uber at night.',
  },
  't-cdmx-teotihuacan': {
    nombre: 'Mexico City to Teotihuacán',
    opciones: 'Bus from the Terminal del Norte / tour / Uber',
    costo: 'MXN 75 each way / USD 35 to 50 est. / MXN 500 to 700 est. each way',
    duracion: '1 h / full day / 50 min',
    recomendada: 'Bus: leaves every 15 to 20 min and lets you set your own schedule.',
  },
  't-hostel-aicm': {
    nombre: 'Hostel to AICM',
    opciones: 'Metrobús L4 / Uber',
    costo: 'MXN 30 / 150 to 250 est.',
    duracion: '40 to 50 min / 25 to 40',
    recomendada: 'Metrobús if you leave before 6:30 a.m.; otherwise, Uber.',
  },
  't-cdmx-merida': {
    nombre: 'Mexico City to Mérida',
    opciones: 'Flight Viva, Volaris or Aeroméxico / ADO bus',
    costo: 'With carry-on MXN 1,300 to 2,300 / bus from USD 123',
    duracion: '2 h / 20 to 23 h',
    recomendada: 'Flight, with the fare that includes a 10 kg carry-on.',
  },
  't-mid-centro': {
    nombre: 'Mérida airport to downtown',
    opciones: 'Va y Ven / authorized taxi / Uber',
    costo: 'MXN 45 / up to 300 / 100 to 150 est.',
    duracion: '30 / 20 / 20 min',
    recomendada: 'Va y Ven: every 30 min, stops at the ADO terminal and Santa Lucía. Uber hardly ever picks up inside the airport.',
  },
  't-merida-uxmal': {
    nombre: 'Mérida to Uxmal',
    opciones: 'Second-class SUR bus from TAME / tour / car',
    costo: 'MXN 100 each way / from 400 est. / 900+ est.',
    duracion: '1 h to 1 h 15',
    recomendada: 'Bus, with the round trip bought the day before: unnumbered seats, it fills up.',
  },
  't-merida-valladolid': {
    nombre: 'Mérida to Valladolid',
    opciones: 'Second-class bus with a stop in Izamal / direct ADO / Tren Maya',
    costo: 'MXN 44 plus 95 to 105 / USD 13 / not verified',
    duracion: '1 h 30 plus 2 h 30 / 2 h 15 / 1 h 45 est.',
    recomendada: 'Via Izamal: cheaper and adds the best convent on the route. The train leaves you far from downtown at both ends.',
  },
  't-valladolid-chichen': {
    nombre: 'Valladolid to Chichén Itzá',
    opciones: 'Colectivo / ADO / tour',
    costo: 'MXN 40 to 50 each way / 95 to 150 / USD 60+ est.',
    duracion: '45 min',
    recomendada: 'The 7:00 a.m. colectivo: you arrive at opening time.',
  },
  't-valladolid-oxman': {
    nombre: 'Valladolid to Cenote Oxmán',
    opciones: 'Bike / taxi',
    costo: 'MXN 100 to 150 est. per day / 70 to 80 each way',
    duracion: '20 to 30 min',
    recomendada: 'Hostel bike.',
  },
  't-valladolid-ekbalam': {
    nombre: 'Valladolid to Ek Balam (optional)',
    opciones: 'Colectivo / taxi',
    costo: 'MXN 50 to 70 each way / 200 to 280',
    duracion: '30 to 40 min',
    recomendada: 'Colectivo; at 7:15 a.m. people usually gather.',
  },
  't-valladolid-cancun': {
    nombre: 'Valladolid to Cancún',
    opciones: 'ADO / ADO Conecta / Tren Maya',
    costo: 'USD 15 to 22 (MXN 270 to 420)',
    duracion: '2 h 15 to 2 h 30',
    recomendada:
      'Mid-morning ADO (approx. 11:30 a.m.) to the downtown Cancún terminal. If you add Ek Balam, the 2:10 p.m. one, which arrives at 5:40 p.m. On Saturday you do not need to go to any airport: the terminal is a few blocks from the hostel.',
  },
};
