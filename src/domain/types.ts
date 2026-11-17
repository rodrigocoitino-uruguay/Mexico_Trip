/**
 * Modelo de datos del viaje. El contenido inicial vive en `src/data/seed.ts`;
 * lo que cambiás en la app se guarda en IndexedDB (ver `src/db`).
 */

export type Moneda = 'MXN' | 'USD';
/** Cómo de confiable es un dato del plan. Sin valor = dato del plan sin marca. */
export type Fiabilidad = 'verificado' | 'estimado' | 'sin_verificar';

export type Ciudad =
  | 'CDMX'
  | 'Mérida'
  | 'Izamal/Valladolid'
  | 'Valladolid'
  | 'Cancún'
  | 'Playa del Carmen'
  | 'Cozumel'
  | 'Viaje';
/** Ciudades con alojamiento a elegir (las del núcleo del viaje). */
export type CiudadAlojamiento = 'CDMX' | 'Mérida' | 'Valladolid';

export type ZonaHoraria = 'America/Montevideo' | 'America/Mexico_City' | 'America/Merida' | 'America/Cancun';

/** Campos comunes a todo lo que se guarda. */
export interface Registro {
  id: string;
  /** ISO. Lo usa el "último cambio gana" al importar. */
  updatedAt: string;
  /** true si nació en el seed (los datos originales). */
  delSeed?: boolean;
  /** true cuando lo tocaste vos: una actualización del seed no lo pisa. */
  editadoPorUsuario?: boolean;
}

export interface Dia extends Registro {
  /** '2027-02-13' (también es la fecha). */
  fecha: string;
  titulo: string;
  ciudad: Ciudad;
  zonaHoraria: ZonaHoraria;
  resumen?: string;
  /** Detalle completo (12 a 20/2) o simple (resto). */
  detalle: 'completo' | 'simple';
  /** En qué ciudad dormís esa noche, para vincular el alojamiento reservado o recomendado. */
  nocheEn?: CiudadAlojamiento;
  /** Texto de dónde dormís cuando no hay alojamiento a elegir (avión, retreat, Cancún). */
  nocheTexto?: string;
  /** Clima esperado (texto estático del plan, sin API). */
  clima?: string;
  costoBajoMXN?: number;
  costoCentralMXN?: number;
  costoAltoMXN?: number;
  costoCentralUSD?: number;
  /** Nota de presupuesto cuando el día no tiene costo en MXN (por ejemplo "USD 55, solo si…"). */
  costoNota?: string;
}

export type CategoriaActividad = 'traslado' | 'atraccion' | 'comida' | 'noche' | 'descanso' | 'logistica';
export type EstadoActividad = 'pendiente' | 'hecho' | 'saltado';

export interface Actividad extends Registro {
  diaId: string;
  orden: number;
  /** '9:00', '9:00–13:30', 'aprox. 11:30', 'Noche' o '' si el plan no da hora. */
  hora: string;
  titulo: string;
  categoria: CategoriaActividad;
  /** Qué hacer ahí. */
  descripcion: string;
  comoLlegar?: string;
  /** Texto del plan, tal cual: 'MXN 210; transporte MXN 6'. */
  costoTexto?: string;
  /** Valor central en MXN para el presupuesto (punto medio cuando el plan da un rango). */
  costoMXN?: number;
  fiabilidad?: Fiabilidad;
  opcional?: boolean;
  /** Solo para opcionales: true cuando la activás. */
  activa?: boolean;
  /** Lugar (atracción, comida o noche) o alojamiento vinculado. */
  lugarId?: string;
  /** Para "Abrir en Maps" cuando no hay lugar vinculado. */
  mapsQuery?: string;
  /** Solo si difiere de la del día (llegada a Cancún, que va 1 h adelante). */
  zonaHoraria?: ZonaHoraria;
  estado: EstadoActividad;
  nota?: string;
  gastoRealMXN?: number;
}

export type EstadoOpcion = 'opcion' | 'reservado' | 'descartado';

export interface Reserva {
  codigo?: string;
  checkIn?: string;
  checkOut?: string;
  precioPagado?: number;
  moneda?: Moneda;
  link?: string;
  notas?: string;
}

export interface OpcionAlojamiento extends Registro {
  ciudad: CiudadAlojamiento;
  /** '12 al 16/2 · 4 noches' */
  noches: string;
  /** Primera y última noche (ISO), para vincular el reservado a los días. */
  desde: string;
  hasta: string;
  nombre: string;
  precioDorm: string;
  precioPrivada: string;
  puntaje: string;
  ubicacion: string;
  /** Dirección para Maps. */
  direccion: string;
  /** Wifi, seguridad, ruido. */
  notas: string;
  recomendado: boolean;
  estado: EstadoOpcion;
  reserva?: Reserva;
}

export type EstadoCompra = 'pendiente' | 'comprado';

export interface Vuelo extends Registro {
  orden: number;
  /** ISO de la salida. */
  fecha: string;
  aerolinea: string;
  origen: string;
  origenCodigo: string;
  destino: string;
  destinoCodigo: string;
  /** Hora local de salida y de llegada, como texto ('3:06 a. m.'). */
  salida: string;
  llegada: string;
  /** Cuando la llegada es otro día. */
  llegadaFecha?: string;
  duracion: string;
  escala: string;
  tarifa: string;
  equipaje: string;
  costo: string;
  pagaEmpresa: boolean;
  /** Ida y vuelta no se pueden cambiar. */
  modificable: boolean;
  notas: string;
  estado: EstadoCompra;
  fechaLimite?: string;
  reserva?: Reserva;
}

export interface Tramo extends Registro {
  orden: number;
  fecha?: string;
  nombre: string;
  opciones: string;
  costo: string;
  duracion: string;
  recomendada: string;
  estado: EstadoCompra;
  reserva?: Reserva;
}

export type TipoLugar = 'atraccion' | 'comida' | 'noche';

export interface Lugar extends Registro {
  tipo: TipoLugar;
  nombre: string;
  ciudad: Ciudad;
  direccion?: string;
  /** Atracciones: entrada para extranjeros. Comida y noche: precio. */
  entrada?: string;
  horario?: string;
  consejo?: string;
  fiabilidad?: Fiabilidad;
  opcional?: boolean;
  diaIds: string[];
}

export type GrupoPendiente = 'Reservar ya' | 'Más adelante' | 'En destino';

export interface Pendiente extends Registro {
  orden: number;
  titulo: string;
  detalle?: string;
  fechaLimite?: string;
  grupo: GrupoPendiente;
  hecho: boolean;
}

export interface Decision extends Registro {
  orden: number;
  titulo: string;
  detalle: string;
  resuelta: boolean;
  resolucion?: string;
}

export type CategoriaGasto = 'Hospedaje' | 'Comida' | 'Transporte' | 'Entradas' | 'Otros';

export interface Gasto extends Registro {
  /** ISO 'YYYY-MM-DD'. */
  fecha: string;
  categoria: CategoriaGasto;
  monto: number;
  moneda: Moneda;
  nota?: string;
  actividadId?: string;
}

export interface PlanB extends Registro {
  orden: number;
  si: string;
  entonces: string;
}

export interface InfoSeccion extends Registro {
  orden: number;
  titulo: string;
  /** Nombre de ícono de lucide (se resuelve en la UI). */
  icono: string;
  items: string[];
}

export interface Contacto extends Registro {
  orden: number;
  nombre: string;
  rol: string;
  telefono?: string;
  email?: string;
  web?: string;
  notas?: string;
}

export interface Ajustes {
  id: 'ajustes';
  updatedAt: string;
  /** MXN por USD. */
  tipoCambio: number;
  tema: 'sistema' | 'claro' | 'oscuro';
}

/** Contenido fijo del plan que no se edita en la app (resumen y presupuesto). */
export interface FilaPresupuesto {
  categoria: CategoriaGasto;
  etiqueta: string;
  bajo: number;
  central: number;
  alto: number;
}

export interface ExtraPresupuesto {
  concepto: string;
  usd: number;
}

export interface PlanPresupuesto {
  topeUSD: number;
  notaTope: string;
  tipoCambioDefault: number;
  notaTipoCambio: string;
  semana: FilaPresupuesto[];
  totalSemana: { bajo: number; central: number; alto: number };
  despues: ExtraPresupuesto[];
  subtotalDespuesUSD: number;
  totalViaje: { bajo: number; central: number; alto: number };
  margen: string[];
  reglas: string[];
  categoriaFinanzas: string;
}

export interface Destacado {
  titulo: string;
  diaId: string;
  lugarId?: string;
}

export interface ResumenViaje {
  nombre: string;
  desde: string;
  hasta: string;
  ruta: string[];
  ritmo: string[];
  despues: string[];
  zonasHorarias: string;
  experienciasGastronomicas: Destacado[];
  nochesMemorables: Destacado[];
  /** Consejos generales de comida (6.7). */
  comida: string[];
  /** Por qué Oxmán como único cenote. */
  porQueOxman: string;
}
