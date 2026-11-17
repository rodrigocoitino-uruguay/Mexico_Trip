import { t } from '../lib/i18n';
import type { Ciudad } from './types';

/** Nombre de la ciudad para mostrar (casi todos son nombres propios y no cambian). */
export const nombreCiudad = (c: Ciudad): string => (c === 'Viaje' ? t('Viaje') : c);

/**
 * Color de cada ciudad para los chips: CDMX rosa, Mérida turquesa,
 * Izamal cempasúchil (la ciudad amarilla), Valladolid verde, Cancún, Playa del Carmen y Cozumel azul.
 * Son clases completas para que Tailwind las encuentre.
 */
export const COLOR_CIUDAD: Record<Ciudad, { chip: string; punto: string }> = {
  CDMX: { chip: 'bg-rosa-soft text-rosa-ink', punto: 'bg-rosa' },
  Mérida: { chip: 'bg-turquesa-soft text-turquesa-ink', punto: 'bg-turquesa' },
  'Izamal/Valladolid': { chip: 'bg-cempa-soft text-cempa-ink', punto: 'bg-cempa' },
  Valladolid: { chip: 'bg-verde-soft text-verde', punto: 'bg-verde' },
  Cancún: { chip: 'bg-azul-soft text-azul', punto: 'bg-azul' },
  'Playa del Carmen': { chip: 'bg-azul-soft text-azul', punto: 'bg-azul' },
  Cozumel: { chip: 'bg-azul-soft text-azul', punto: 'bg-azul' },
  Viaje: { chip: 'bg-sunken text-muted', punto: 'bg-muted' },
};
