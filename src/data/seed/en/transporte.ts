import type { Tramo, Vuelo } from '../../../domain/types';
import type { Traduccion } from './tipos';

export const VUELOS_EN: Traduccion<Vuelo> = {
  'v-ida': {
    origen: 'Montevideo',
    destino: 'Mexico City (AICM)',
    salida: '3:06 a.m.',
    llegada: '2:30 p.m.',
    duracion: '14 h 24 min',
    escala: '1 stop in Panama City',
    tarifa: 'Economy Basic',
    equipaje: 'Carry-on bag',
    costo: 'Paid by the company',
    notas:
      'Booked; cannot be changed. You leave home on the night of Thursday 2/11: arrange the overnight ride to Carrasco. Copa usually operates from Terminal 1 at AICM; confirm.',
  },
  'v-mex-mid': {
    aerolinea: 'Viva, Volaris or Aeroméxico',
    origen: 'Mexico City (AICM)',
    destino: 'Mérida',
    salida: 'Between 8:30 and 10:30 a.m.',
    llegada: '2 h later',
    duracion: '2 h',
    escala: 'Nonstop',
    tarifa: 'The fare that includes a 10 kg carry-on',
    equipaje: 'Carry-on 10 kg (the cheapest Viva and Volaris fare does not include it)',
    costo: 'MXN 1,300 to 2,300 (central MXN 1,700, USD 91)',
    notas: 'Not bought yet; you pay for it. From AICM (MEX), not AIFA (NLU). Buy before 12/15/2026.',
  },
  'v-vuelta': {
    origen: 'Cancún',
    destino: 'Montevideo',
    salida: '4:10 p.m.',
    llegada: '6:40 a.m.',
    duracion: '12 h 30 min',
    escala: '1 stop in Lima',
    tarifa: 'Light',
    equipaje: 'Carry-on bag',
    costo: 'Paid by the company',
    notas: 'Booked; cannot be changed. Lands Monday 3/1 (approved day off).',
  },
};

export const TRAMOS_EN: Traduccion<Tramo> = {
  't-aicm-hostel': {
    nombre: 'AICM to the hostel',
    opciones: 'Metrobús L4 Quetzalcóatl route / Uber or DiDi / authorized taxi / Metro',
    costo: 'MXN 30 / 150 to 250 est. / 300 to 400 est. / 5',
    duracion: '40 to 50 min / 30 to 50 / 30 to 50 / 45 with transfers',
    recomendada:
      'Metrobús: stops at both terminals and crosses the Centro. Uber if you land exhausted. Not the Metro, with luggage and two transfers.',
  },
  't-dentro-cdmx': {
    nombre: 'Getting around Mexico City',
    opciones: 'Walking / Metro / Metrobús / Uber',
    costo: 'Free / MXN 5 / 6 / 60 to 130 est. per ride',
    recomendada: 'Walk and take the Metro by day; Uber at night.',
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
    recomendada: 'Metrobús if you leave before 6:30 a.m.; otherwise Uber.',
  },
  't-cdmx-merida': {
    nombre: 'Mexico City to Mérida',
    opciones: 'Flight with Viva, Volaris or Aeroméxico / ADO bus',
    costo: 'With carry-on MXN 1,300 to 2,300 / bus from USD 123',
    duracion: '2 h / 20 to 23 h',
    recomendada: 'Fly, on the fare that includes a 10 kg carry-on.',
  },
  't-mid-centro': {
    nombre: 'Mérida airport to the Centro',
    opciones: 'Va y Ven / authorized taxi / Uber',
    costo: 'MXN 45 / up to 300 / 100 to 150 est.',
    duracion: '30 / 20 / 20 min',
    recomendada:
      'Va y Ven: every 30 min, stops at the ADO terminal and Santa Lucía. Uber rarely picks up inside the airport.',
  },
  't-merida-uxmal': {
    nombre: 'Mérida to Uxmal',
    opciones: 'Second-class SUR bus from TAME / tour / rental car',
    costo: 'MXN 100 each way / from 400 est. / 900+ est.',
    duracion: '1 h to 1 h 15',
    recomendada: 'Bus, with the round trip bought the day before: unnumbered seats, it fills up.',
  },
  't-merida-valladolid': {
    nombre: 'Mérida to Valladolid',
    opciones: 'Second-class bus with a stop in Izamal / direct ADO / Tren Maya',
    costo: 'MXN 44 plus 95 to 105 / USD 13 / unverified',
    duracion: '1 h 30 plus 2 h 30 / 2 h 15 / 1 h 45 est.',
    recomendada:
      'Via Izamal: cheaper, and it adds the best convent on the route. The train drops you far from the center at both ends.',
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
    recomendada: 'The hostel bike.',
  },
  't-valladolid-ekbalam': {
    nombre: 'Valladolid to Ek Balam (optional)',
    opciones: 'Colectivo / taxi',
    costo: 'MXN 50 to 70 each way / 200 to 280',
    duracion: '30 to 40 min',
    recomendada: 'Colectivo; at 7:15 a.m. other travelers usually gather.',
  },
  't-valladolid-cancun': {
    nombre: 'Valladolid to Cancún',
    opciones: 'ADO / ADO Conecta / Tren Maya',
    costo: 'USD 15 to 22 (MXN 270 to 420)',
    duracion: '2 h 15 to 2 h 30',
    recomendada:
      'Mid-morning ADO (approx. 11:30 a.m.) to the downtown Cancún terminal. If you add Ek Balam, the 2:10 p.m. one, which arrives at 5:40 p.m. No airport needed on Saturday: the terminal is a few blocks from the hostel.',
  },
};
