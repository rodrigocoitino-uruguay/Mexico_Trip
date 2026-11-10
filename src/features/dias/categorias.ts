import { BedSingle, Bus, ClipboardList, Landmark, Music, Utensils, Waves, type LucideIcon } from 'lucide-react';
import type { Actividad, CategoriaActividad } from '../../domain/types';

export const CATEGORIAS: { id: CategoriaActividad; label: string }[] = [
  { id: 'atraccion', label: 'Atracción' },
  { id: 'comida', label: 'Comida' },
  { id: 'traslado', label: 'Traslado' },
  { id: 'noche', label: 'Noche' },
  { id: 'descanso', label: 'Descanso' },
  { id: 'logistica', label: 'Logística' },
];

const ESTILO: Record<CategoriaActividad, { icon: LucideIcon; punto: string }> = {
  traslado: { icon: Bus, punto: 'bg-azul-soft text-azul' },
  atraccion: { icon: Landmark, punto: 'bg-rosa-soft text-rosa-ink' },
  comida: { icon: Utensils, punto: 'bg-cempa-soft text-cempa-ink' },
  noche: { icon: Music, punto: 'bg-azul-soft text-azul' },
  descanso: { icon: BedSingle, punto: 'bg-sunken text-muted' },
  logistica: { icon: ClipboardList, punto: 'bg-sunken text-muted' },
};

/** Ícono y color de una actividad (los cenotes, en turquesa). */
export function estiloActividad(a: Pick<Actividad, 'categoria' | 'titulo'>) {
  if (a.categoria === 'atraccion' && /cenote/i.test(a.titulo)) {
    return { icon: Waves, punto: 'bg-turquesa-soft text-turquesa-ink' };
  }
  return ESTILO[a.categoria];
}
