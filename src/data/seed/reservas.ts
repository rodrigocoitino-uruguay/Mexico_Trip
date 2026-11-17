import type { Contacto, Decision, Pendiente } from '../../domain/types';
import { base } from './util';

type P = Omit<Pendiente, 'updatedAt' | 'delSeed' | 'orden' | 'hecho'>;

const pendientes: P[] = [
  // Reservar ya
  {
    id: 'p-vuelo-merida',
    grupo: 'Reservar ya',
    titulo: 'Comprar el vuelo CDMX (MEX) → Mérida',
    detalle: 'Mar 16/2, salida entre 8:30 y 10:30, con equipaje de mano de 10 kg.',
    fechaLimite: '2026-12-15',
  },
  {
    id: 'p-hostel-cdmx',
    grupo: 'Reservar ya',
    titulo: 'Reservar hostel en CDMX',
    detalle: '12 al 16/2, con cancelación gratis.',
    fechaLimite: '2026-12-20',
  },
  {
    id: 'p-hostels-yucatan',
    grupo: 'Reservar ya',
    titulo: 'Reservar hostels en Mérida y Valladolid',
    detalle: 'Mérida del 16 al 18/2 y Valladolid del 18 al 20/2.',
    fechaLimite: '2027-01-15',
  },
  // Más adelante
  {
    id: 'p-palacio-nacional',
    grupo: 'Más adelante',
    titulo: 'Pedir turno para el Palacio Nacional por mail',
    detalle: 'A visitas_guiadas@hacienda.gob.mx.',
    fechaLimite: '2027-01-29',
  },
  {
    id: 'p-seguro',
    grupo: 'Más adelante',
    titulo: 'Contratar el seguro de viaje',
    detalle: 'Del 11/2 al 1/3.',
    fechaLimite: '2027-02-05',
  },
  {
    id: 'p-carrasco',
    grupo: 'Más adelante',
    titulo: 'Organizar el traslado nocturno a Carrasco',
    detalle: 'Para el vuelo de las 3:06 a. m. del vie 12/2.',
    fechaLimite: '2027-02-08',
  },
  {
    id: 'p-esim-visitax-banco',
    grupo: 'Más adelante',
    titulo: 'eSIM, Visitax y aviso al banco',
    detalle: 'Comprar la eSIM, pagar el Visitax (visitax.gob.mx, guardar el QR) y avisar al banco del viaje.',
    fechaLimite: '2027-02-10',
  },
  {
    id: 'p-salon',
    grupo: 'Más adelante',
    titulo: 'Confirmar el baile del domingo 14/2 en el Salón Los Ángeles',
    detalle: 'En Instagram, @salonlosangeles.',
  },
  {
    id: 'p-noticias',
    grupo: 'Más adelante',
    titulo: 'Revisar noticias de Chichén Itzá y Teotihuacán',
    detalle: 'La semana previa al viaje.',
  },
  {
    id: 'p-finde-cancun',
    grupo: 'Más adelante',
    titulo: 'Verificar o ajustar la partida del finde (Cancún y Playa del Carmen)',
    detalle: 'USD 175, estimado sin verificar.',
  },
  // En destino
  {
    id: 'p-tame-uxmal',
    grupo: 'En destino',
    titulo: 'Bus a Uxmal del miércoles, ida y vuelta',
    detalle: 'Mar 16/2 por la tarde, en la terminal TAME de Mérida.',
  },
  {
    id: 'p-ado-cancun',
    grupo: 'En destino',
    titulo: 'Pasaje Valladolid → Cancún del sábado 20/2',
    detalle: 'Mar 16 o mié 17/2, en el mostrador o la app de ADO.',
  },
  {
    id: 'p-taquillas',
    grupo: 'En destino',
    titulo: 'Entradas en taquilla el mismo día',
    detalle:
      'Antropología, Templo Mayor, Teotihuacán, Uxmal, Chichén Itzá y cenote Oxmán (no tienen reserva previa).',
  },
];

export const SEED_PENDIENTES: Pendiente[] = pendientes.map((p, i) => ({
  ...base(p.id),
  ...p,
  orden: (i + 1) * 10,
  hecho: false,
}));

export const SEED_DECISIONES: Decision[] = [
  {
    ...base('d-seguro'),
    orden: 10,
    titulo: 'Seguro de viaje',
    detalle:
      'Cotizar Protege tu Viaje y BSE Viajeros, con USD 40.000 o más de cobertura médica y sin deducible; estimado USD 40 a 80 por 19 días.',
    resuelta: false,
  },
  {
    ...base('d-vuelo-merida'),
    orden: 20,
    titulo: 'Comprar el vuelo a Mérida ahora o esperar los cobros',
    detalle: 'Adelantar USD 70 a 90 si el pago todavía no entró.',
    resuelta: false,
  },
];

export const SEED_CONTACTOS: Contacto[] = [
  { ...base('c-copa'), orden: 10, nombre: 'Copa', rol: 'Vuelo de ida (vie 12/2)' },
  { ...base('c-latam'), orden: 20, nombre: 'LATAM', rol: 'Vuelo de vuelta (dom 28/2)' },
  { ...base('c-aerolinea-merida'), orden: 30, nombre: 'Aerolínea CDMX → Mérida', rol: 'Vuelo del mar 16/2 (pendiente)' },
  { ...base('c-hostel-cdmx'), orden: 40, nombre: 'Hostel en CDMX', rol: 'Alojamiento 12 al 16/2' },
  { ...base('c-hostel-merida'), orden: 50, nombre: 'Hostel en Mérida', rol: 'Alojamiento 16 al 18/2' },
  { ...base('c-hostel-valladolid'), orden: 60, nombre: 'Hostel en Valladolid', rol: 'Alojamiento 18 al 20/2' },
  { ...base('c-seguro'), orden: 70, nombre: 'Seguro de viaje', rol: 'Asistencia médica (pendiente de contratar)' },
  { ...base('c-empresa'), orden: 80, nombre: 'Empresa', rol: 'Retreat en Cozumel' },
  {
    ...base('c-palacio-nacional'),
    orden: 90,
    nombre: 'Palacio Nacional, visitas guiadas',
    rol: 'Turno para los murales',
    email: 'visitas_guiadas@hacienda.gob.mx',
  },
];
