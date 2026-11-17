import type { Contacto, Decision, Pendiente } from '../../../domain/types';
import type { Traduccion } from './tipos';

/** El campo `grupo` ('Reservar ya', ...) es una clave de datos: se traduce al mostrarlo. */
export const PENDIENTES_EN: Traduccion<Pendiente> = {
  'p-vuelo-merida': {
    titulo: 'Buy the Mexico City (MEX) → Mérida flight',
    detalle: 'Tue 2/16, departing between 8:30 and 10:30 a.m., with a 10 kg (22 lb) carry-on.',
  },
  'p-hostel-cdmx': {
    titulo: 'Book the hostel in Mexico City',
    detalle: '2/12 to 2/16, with free cancellation.',
  },
  'p-hostels-yucatan': {
    titulo: 'Book hostels in Mérida and Valladolid',
    detalle: 'Mérida 2/16 to 2/18 and Valladolid 2/18 to 2/20.',
  },
  'p-palacio-nacional': {
    titulo: 'Email to request a slot at the Palacio Nacional',
    detalle: 'To visitas_guiadas@hacienda.gob.mx.',
  },
  'p-seguro': {
    titulo: 'Buy travel insurance',
    detalle: 'From 2/11 to 3/1.',
  },
  'p-carrasco': {
    titulo: 'Arrange the overnight ride to Carrasco',
    detalle: 'For the 3:06 a.m. flight on Fri 2/12.',
  },
  'p-esim-visitax-banco': {
    titulo: 'eSIM, Visitax and a notice to the bank',
    detalle: 'Buy the eSIM, pay the Visitax (visitax.gob.mx, save the QR) and tell the bank about the trip.',
  },
  'p-salon': {
    titulo: 'Confirm the Sunday 2/14 dance at Salón Los Ángeles',
    detalle: 'On Instagram, @salonlosangeles.',
  },
  'p-noticias': {
    titulo: 'Check the news about Chichén Itzá and Teotihuacán',
    detalle: 'The week before the trip.',
  },
  'p-finde-cancun': {
    titulo: 'Verify or adjust the weekend line item (Cancún and Playa del Carmen)',
    detalle: 'USD 175, an unverified estimate.',
  },
  'p-tame-uxmal': {
    titulo: 'Round-trip bus to Uxmal for Wednesday',
    detalle: 'Tue 2/16 in the afternoon, at the TAME terminal in Mérida.',
  },
  'p-ado-cancun': {
    titulo: 'Valladolid → Cancún ticket for Saturday 2/20',
    detalle: 'Tue 2/16 or Wed 2/17, at the ADO counter or in the ADO app.',
  },
  'p-taquillas': {
    titulo: 'Tickets at the ticket office on the same day',
    detalle:
      'Anthropology Museum, Templo Mayor, Teotihuacán, Uxmal, Chichén Itzá and Cenote Oxmán (no advance booking).',
  },
};

export const DECISIONES_EN: Traduccion<Decision> = {
  'd-seguro': {
    titulo: 'Travel insurance',
    detalle:
      'Get quotes from Protege tu Viaje and BSE Viajeros, with USD 40,000 or more of medical coverage and no deductible; estimate USD 40 to 80 for 19 days.',
  },
  'd-vuelo-merida': {
    titulo: 'Buy the Mérida flight now or wait for the payments',
    detalle: 'Advance USD 70 to 90 if the payment has not arrived yet.',
  },
};

export const CONTACTOS_EN: Traduccion<Contacto> = {
  'c-copa': { rol: 'Outbound flight (Fri 2/12)' },
  'c-latam': { rol: 'Return flight (Sun 2/28)' },
  'c-aerolinea-merida': { nombre: 'Airline Mexico City → Mérida', rol: 'Tue 2/16 flight (pending)' },
  'c-hostel-cdmx': { nombre: 'Hostel in Mexico City', rol: 'Lodging 2/12 to 2/16' },
  'c-hostel-merida': { nombre: 'Hostel in Mérida', rol: 'Lodging 2/16 to 2/18' },
  'c-hostel-valladolid': { nombre: 'Hostel in Valladolid', rol: 'Lodging 2/18 to 2/20' },
  'c-seguro': { nombre: 'Travel insurance', rol: 'Medical assistance (not bought yet)' },
  'c-empresa': { nombre: 'Company', rol: 'Retreat in Cozumel' },
  'c-palacio-nacional': { nombre: 'Palacio Nacional, guided tours', rol: 'Slot for the murals' },
};
