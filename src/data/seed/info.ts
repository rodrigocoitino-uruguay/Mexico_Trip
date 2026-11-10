import type { InfoSeccion, PlanB } from '../../domain/types';
import { base } from './util';

type I = Omit<InfoSeccion, 'updatedAt' | 'delSeed' | 'orden'>;

const secciones: I[] = [
  {
    id: 'i-ingreso',
    titulo: 'Ingreso a México',
    icono: 'stamp',
    items: [
      'Con pasaporte uruguayo no hace falta visa para turismo de hasta 180 días.',
      'El pasaporte debe estar vigente toda la estadía; las aerolíneas suelen pedir 6 meses.',
      'En migración pueden pedir el pasaje de salida, la reserva de alojamiento y prueba de fondos: llevá en el celular el pasaje LATAM del 28/2, la reserva del hostel y la invitación al retreat.',
      'En los aeropuertos el formulario FMM se reemplazó por un sello en el pasaporte. Mirá cuántos días anotan: hacen falta 17.',
      'Visitax de Quintana Roo: unos MXN 285 por extranjero en visitax.gob.mx; en el aeropuerto de Cancún cuesta MXN 525.',
    ],
  },
  {
    id: 'i-dinero',
    titulo: 'Dinero',
    icono: 'banknote',
    items: [
      'Efectivo sí o sí para el bus a Teotihuacán, los buses de segunda clase, los colectivos, mercados, puestos, cenotes y propinas: unos MXN 7.500 en la semana (plan central).',
      'Tarjeta para hostels, ADO, vuelo, Uber, restaurantes y la taquilla de Chichén Itzá.',
      'Cajeros de banco (BBVA, Banorte, Santander, Citibanamex, HSBC) dentro de sucursales o centros comerciales. Rechazá la conversión que ofrece el cajero.',
      'Mejor 2 retiros grandes que varios chicos. Alcanza con retirar MXN 3.000 al llegar. No cambies en el aeropuerto.',
      'Propinas: 10 a 15% en restaurantes con servicio; en puestos y taquerías no se espera.',
    ],
  },
  {
    id: 'i-conexion',
    titulo: 'Conexión',
    icono: 'wifi',
    items: [
      'eSIM de 10 GB por 30 días: USD 16 a 26; elegí una que use la red Telcel (la mejor en el interior de Yucatán).',
      'Descargá mapas offline de CDMX, Mérida y Valladolid.',
    ],
  },
  {
    id: 'i-seguridad',
    titulo: 'Seguridad y salud',
    icono: 'shield-check',
    items: [
      'Centro Histórico de CDMX: de día sin problema; de noche, calles iluminadas y con gente (Madero, 5 de Mayo, 16 de Septiembre, Regina). No vayas a pie hacia Tepito, La Lagunilla ni La Merced.',
      'Salón Los Ángeles (colonia Guerrero): llegá y andate en Uber o DiDi.',
      'Metro y Metrobús seguros de día; celular en el bolsillo delantero. De noche, Uber. No tomes taxis en la calle.',
      'Mérida y Valladolid están entre las ciudades más tranquilas del país; el riesgo real es el calor: gorra, protector y 2 litros de agua en las ruinas.',
      'Altura en CDMX: agua, cena liviana y poco alcohol las primeras 48 h. Mañanas de 6 a 9 °C y tardes de 22 a 24 °C. En Yucatán, 30 a 33 °C.',
      'Llevá loperamida y sales de rehidratación. En los cenotes, ducha antes de entrar y protector biodegradable o ninguno. Repelente para las ruinas.',
      'Para cuidar la panza: puestos con mucha rotación y comida hecha en el momento, salsas de a poco, agua embotellada y nada de mariscos crudos en la calle.',
    ],
  },
  {
    id: 'i-seguro',
    titulo: 'Seguro',
    icono: 'heart-pulse',
    items: [
      'Contratar el seguro de viaje del 11/2 al 1/3, antes del 5/2/2027.',
      'Cotizar Protege tu Viaje y BSE Viajeros, con USD 40.000 o más de cobertura médica y sin deducible; estimado USD 40 a 80 por 19 días.',
      'Confirmar con la empresa si el retreat incluye seguro.',
      'El seguro va aparte y no cuenta en el tope de USD 1.000.',
    ],
  },
  {
    id: 'i-equipaje',
    titulo: 'Equipaje',
    icono: 'backpack',
    items: [
      'Límite real: 10 kg de mano (lo pesan en Viva y Volaris).',
      'Ropa para 5 días y lavandería en Mérida el martes 16.',
      'Dos climas: campera liviana y capas para CDMX; ropa fresca, gorra y malla para Yucatán.',
      'Adaptador de enchufe tipo A/B (127 V).',
      'Candado, tapones, antifaz, toalla de secado rápido y bolsa estanca para el celular.',
      'Mejor mochila que valija con ruedas. El protector solar se compra allá (líquidos de hasta 100 ml en cabina).',
    ],
  },
  {
    id: 'i-cierres',
    titulo: 'Cierres y eventos del 12 al 20/2',
    icono: 'calendar-x',
    items: [
      'Lunes 15/2: cierran Antropología, Templo Mayor, el Castillo de Chapultepec y casi todos los museos de CDMX.',
      'Domingo 14/2: museos y zonas del INAH gratis para mexicanos y residentes (más gente); San Valentín.',
      'Ningún feriado cae en la semana.',
      'Carnaval de Mérida 2027: debería ir del 3 al 10/2 y terminar antes de la llegada (fechas oficiales sin confirmar).',
      'Mérida de noche, gratis: martes, Remembranzas Musicales a las 20 h en el Parque de Santiago; miércoles, "Diálogos del Conquistador" a las 20:30 en la Casa de Montejo.',
      'Chichén Itzá cerró 13 días entre mayo y junio de 2026 por un conflicto con artesanos y reabrió el 1/6. Revisar noticias la semana previa.',
      'Teotihuacán reabrió con seguridad reforzada después de una balacera el 20/4/2026; la Pirámide de la Luna quedó cerrada hasta nuevo aviso según la prensa de abril.',
      'Las cinco entradas principales suman MXN 1.913 (unos USD 102) con tarifas de 2026; en enero de 2027 suelen subir 4 a 5%.',
    ],
  },
];

export const SEED_INFO: InfoSeccion[] = secciones.map((s, i) => ({ ...base(s.id), ...s, orden: (i + 1) * 10 }));

const planB: Array<[string, string]> = [
  [
    'Lluvia o frío fuerte el lunes en CDMX',
    'Teotihuacán pasa al sábado. El domingo, Templo Mayor a las 9 y Antropología de tarde. El lunes, Catedral, mercados y el Museo Soumaya (abre todos los días, sin verificar).',
  ],
  [
    'Teotihuacán cierra o hay alerta',
    'Zona arqueológica de Tlatelolco y Basílica de Guadalupe (horario de lunes sin verificar). No se puede pasar al martes por el vuelo.',
  ],
  [
    'No hay turno en el Palacio Nacional',
    'Murales de Orozco en San Ildefonso o el Museo Mural Diego Rivera, junto a la Alameda.',
  ],
  [
    'El Salón Los Ángeles no abre, o no hay ganas',
    'Noche libre: Bellas Artes y Madero iluminados, y un mezcal en Bósforo.',
  ],
  [
    'El vuelo a Mérida se demora o cancela',
    'Hay varios vuelos diarios de tres aerolíneas; pedí el siguiente. Uxmal sigue el miércoles.',
  ],
  ['Se llena el bus a Uxmal', 'Salida anterior o posterior; última opción, tour de agencia desde el hostel.'],
  [
    'Perdés el bus de las 14:10 en Izamal',
    'Salen otros a las 15:44 y 18:25. Para un día liviano, ADO directo Mérida → Valladolid (2 h 15) salteando Izamal.',
  ],
  ['Chichén Itzá cierra', 'El viernes por la mañana pasa a Ek Balam; el cenote Oxmán se mantiene por la tarde.'],
  [
    'Lluvia o "norte" en Yucatán',
    'Con lluvia fuerte, cambiá Oxmán por X’kekén y Samulá, que son de caverna. Cuidado con la piedra mojada en las ruinas.',
  ],
  [
    'Malestar de estómago',
    'Suero oral y descanso. Farmacia con consultorio (MXN 50 a 80 est.) o teleasistencia del seguro. El jueves pasa a ADO directo y siesta.',
  ],
  [
    'Altura o cansancio en CDMX',
    'Recortá las tardes: se caen el Califa de León, los murales y el salón de baile, no los sitios principales.',
  ],
  [
    'El presupuesto se pasa a mitad de semana',
    'Recortá comida y el salón de baile; las entradas que quedan son las imprescindibles.',
  ],
];

export const SEED_PLAN_B: PlanB[] = planB.map(([si, entonces], i) => ({
  ...base(`b-${String(i + 1).padStart(2, '0')}`),
  orden: (i + 1) * 10,
  si,
  entonces,
}));
