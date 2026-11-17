import type { Dia } from '../../../domain/types';
import type { Traduccion } from './tipos';

const CLIMA_CDMX =
  'Mornings of 6 to 9 °C (43 to 48 °F) and afternoons of 22 to 24 °C (72 to 75 °F). You are at 2,240 m (7,350 ft): water, a light dinner and little alcohol for the first 48 h.';
const CLIMA_YUCATAN = '30 to 33 °C (86 to 91 °F). Hat, sunscreen and 2 liters of water at the ruins.';
const NORTES = 'In February there are "nortes": the ferry can be canceled because of wind.';
const FINDE = 'Weekend with the team: USD 175 for 3 nights (estimate, unverified).';

export const DIAS_EN: Traduccion<Dia> = {
  '2027-02-11': { titulo: 'Leaving Montevideo', nocheTexto: 'On the plane (Copa, stop in Panama City)' },
  '2027-02-12': { titulo: 'Arrival in Mexico City, an easy day', clima: CLIMA_CDMX },
  '2027-02-13': { titulo: 'National Museum of Anthropology and a night in the Centro', clima: CLIMA_CDMX },
  '2027-02-14': { titulo: 'Centro Histórico and a dance hall', clima: CLIMA_CDMX },
  '2027-02-15': { titulo: 'Teotihuacán', clima: CLIMA_CDMX },
  '2027-02-16': { titulo: 'Flight to Mérida and a danzón night', clima: CLIMA_YUCATAN },
  '2027-02-17': { titulo: 'Uxmal', clima: CLIMA_YUCATAN },
  '2027-02-18': { titulo: 'Izamal on the way to Valladolid', clima: CLIMA_YUCATAN },
  '2027-02-19': { titulo: 'Chichén Itzá and a cenote', clima: CLIMA_YUCATAN },
  '2027-02-20': {
    titulo: 'Morning in Valladolid and the bus to Cancún',
    nocheTexto: 'Cancún, with the team',
    clima: CLIMA_YUCATAN,
  },
  '2027-02-21': {
    titulo: 'Playa del Carmen with the team',
    nocheTexto: 'Playa del Carmen, with the team (to be confirmed with friends)',
    costoNota: FINDE,
  },
  '2027-02-22': {
    titulo: 'Playa del Carmen with the team',
    nocheTexto: 'Playa del Carmen, with the team (to be confirmed with friends)',
    costoNota: FINDE,
  },
  '2027-02-23': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: NORTES },
  '2027-02-24': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: NORTES },
  '2027-02-25': { titulo: 'Retreat in Cozumel', nocheTexto: 'Cozumel, retreat (paid by the company)', clima: NORTES },
  '2027-02-26': {
    titulo: 'Night in Cancún',
    nocheTexto: 'Cancún (hostel)',
    clima: NORTES,
    costoNota: 'USD 55: the company does not cover this night.',
  },
  '2027-02-27': {
    titulo: 'Night in Cancún',
    nocheTexto: 'Cancún (hostel)',
    costoNota: 'USD 50, hostel and food (estimate).',
  },
  '2027-02-28': { titulo: 'Flight home', nocheTexto: 'On the plane (LATAM, stop in Lima)' },
  '2027-03-01': { titulo: 'Arrival in Montevideo' },
};
