import type { PlanPresupuesto, ResumenViaje } from '../../domain/types';

export const PRESUPUESTO: PlanPresupuesto = {
  topeUSD: 1000,
  notaTope: 'Tope duro: USD 1.000. El seguro de viaje va aparte y no cuenta en el tope.',
  tipoCambioDefault: 18.7,
  notaTipoCambio: '18,7 MXN por USD (FIX Banxico del 6/11/2026: 18,71).',
  semana: [
    { categoria: 'Hospedaje', etiqueta: 'Hospedaje, 8 noches en dormitorio', bajo: 102, central: 134, alto: 176 },
    { categoria: 'Comida', etiqueta: 'Comida', bajo: 130, central: 220, alto: 318 },
    {
      categoria: 'Transporte',
      etiqueta: 'Transporte (vuelo a Mérida y bus a Cancún incluidos)',
      bajo: 130,
      central: 177,
      alto: 280,
    },
    { categoria: 'Entradas', etiqueta: 'Entradas y tours', bajo: 112, central: 119, alto: 172 },
    {
      categoria: 'Otros',
      etiqueta: 'Otros (eSIM, cajeros, lavandería, varios, 5% por alza de entradas)',
      bajo: 22,
      central: 56,
      alto: 86,
    },
  ],
  totalSemana: { bajo: 497, central: 706, alto: 1033 },
  despues: [
    { concepto: 'Finde en Cancún, 3 noches (sin verificar)', usd: 175 },
    { concepto: 'Noche del 26/2 (solo si la empresa no la cubre)', usd: 55 },
    { concepto: 'Noche del 27/2', usd: 50 },
    { concepto: 'Visitax de Quintana Roo', usd: 16 },
  ],
  subtotalDespuesUSD: 296,
  totalViaje: { bajo: 793, central: 1002, alto: 1329 },
  totalViajeSinNoche26: { bajo: 738, central: 947, alto: 1274 },
  margen: [
    'Comprar el vuelo a Mérida a MXN 1.300 o menos ahorra USD 21 (total USD 980).',
    'Si la empresa cubre la noche del 26/2, ahorra USD 55 (total USD 947).',
    'Sumar Ek Balam cuesta USD 56 (total USD 1.057); solo entra en el tope con los dos puntos anteriores (USD 981).',
    'Cambiar Kinich por el mercado de Izamal y saltear El Cardenal y un mezcal ahorra unos USD 28.',
    'Saltear el Salón Los Ángeles ahorra USD 15.',
  ],
  reglas: [
    'El viaje se paga con los cobros pendientes cuando entren, no con el saldo del banco ni con las acciones.',
    'Registrar los gastos en la categoría "México feb 2027".',
  ],
  categoriaFinanzas: 'México feb 2027',
};

export const RESUMEN: ResumenViaje = {
  nombre: 'México, febrero 2027',
  desde: '2027-02-11',
  hasta: '2027-03-01',
  ruta: [
    'CDMX 4 noches (12 al 16/2), Mérida 2 noches (16 al 18/2), Valladolid 2 noches (18 al 20/2), en dormitorio compartido de hostel. Sin trabajar ningún día.',
    'Lo mexica (Antropología, Templo Mayor, Teotihuacán), lo maya (Uxmal, Chichén Itzá), lo colonial (Centro de CDMX, Mérida, Izamal, Valladolid) y un solo cenote (Oxmán).',
    'Sin playa y sin lucha libre. Ek Balam es opcional (+USD 56).',
  ],
  ritmo: [
    'El viernes 12 es solo llegar, cenar y dormir.',
    'Un único madrugón (el vuelo del martes 16) y siesta prevista cada tarde en Yucatán.',
    'El lunes 15, con los museos de CDMX cerrados, toca Teotihuacán, que abre todos los días.',
  ],
  despues: [
    'Fin de semana en Cancún con el equipo (20 al 22/2).',
    'Retreat de la empresa en Cozumel (23 al 26/2), con estadía y comida pagas por la empresa.',
    'Noches del 26 y 27/2 en Cancún (la del 26 solo si la empresa no la cubre) y vuelta el 28/2.',
  ],
  zonasHorarias:
    'CDMX y Yucatán van 3 h detrás de Montevideo (UTC−6). Cancún y Cozumel (Quintana Roo) van 1 h adelante de Yucatán (UTC−5).',
  experienciasGastronomicas: [
    { titulo: 'Desayuno en El Cardenal', diaId: '2027-02-14', lugarId: 'l-cardenal' },
    { titulo: 'Tacos en El Califa de León', diaId: '2027-02-13', lugarId: 'l-califa' },
    { titulo: 'Cochinita en La Lupita', diaId: '2027-02-17', lugarId: 'l-lupita' },
    { titulo: 'Cocina yucateca en Kinich de Izamal', diaId: '2027-02-18', lugarId: 'l-kinich' },
  ],
  nochesMemorables: [
    { titulo: 'Pulque, tacos y mezcal por el Centro', diaId: '2027-02-13', lugarId: 'l-duelistas' },
    { titulo: 'Orquestas en vivo en el Salón Los Ángeles', diaId: '2027-02-14', lugarId: 'l-salon-los-angeles' },
    { titulo: 'Baile popular del Parque de Santiago en Mérida', diaId: '2027-02-16', lugarId: 'l-remembranzas' },
  ],
  comida: [
    'Se come bien con MXN 400 a 650 por día alternando mercados y taquerías con dos o tres mesas elegidas.',
    'Los precios son estimaciones; confirmalos en Google Maps.',
    'Para cuidar la panza: puestos con mucha rotación y comida hecha en el momento, salsas de a poco, agua embotellada y nada de mariscos crudos en la calle.',
  ],
  porQueOxman:
    'Es abierto y profundo, se llega en bici desde el hostel y se nada mejor que en los más famosos. Suytun es el de la foto de la plataforma, pero se va a posar más que a nadar; Ik Kil es igual de lindo, pero se llena con los tours de Chichén al mediodía.',
};
