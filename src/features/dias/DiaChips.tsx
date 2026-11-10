import { useLayoutEffect, useRef } from 'react';
import { COLOR_CIUDAD } from '../../domain/ciudades';
import { estadoDia } from '../../domain/tiempo';
import type { Dia } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';

interface Props {
  dias: Dia[];
  seleccionado: string;
  /** Día de hoy (durante el viaje): queda primero a la izquierda. */
  hoyId: string | null;
  now: Date;
  onSelect: (id: string) => void;
}

/**
 * Selector horizontal de días. Los que ya pasaron quedan en gris a la izquierda;
 * al abrir, la lista arranca en el día de hoy (o en el elegido).
 */
export function DiaChips({ dias, seleccionado, hoyId, now, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ancla = hoyId ?? seleccionado;

  // Lleva el día ancla al principio de la lista visible (sin animación, al abrir y cuando cambia el día).
  useLayoutEffect(() => {
    const cont = ref.current;
    const chip = cont?.querySelector<HTMLElement>(`[data-dia="${ancla}"]`);
    // El contenedor es `relative`: offsetLeft del chip ya es relativo a él.
    if (cont && chip) cont.scrollTo({ left: chip.offsetLeft - 16, behavior: 'instant' });
  }, [ancla]);

  return (
    <div
      ref={ref}
      role="listbox"
      aria-label="Días del viaje"
      className="no-scrollbar relative -mx-4 flex snap-x gap-2 overflow-x-auto scroll-smooth px-4 py-1"
    >
      {dias.map((d) => {
        const estado = estadoDia(d, now);
        const pasado = estado === 'pasado';
        const hoy = estado === 'hoy';
        const activo = d.id === seleccionado;
        return (
          <button
            key={d.id}
            type="button"
            role="option"
            data-dia={d.id}
            aria-selected={activo}
            aria-label={`${diaCorto(d.fecha)}, ${d.ciudad}${hoy ? ', hoy' : pasado ? ', ya pasó' : ''}`}
            onClick={() => onSelect(d.id)}
            className={cx(
              'relative flex min-h-14 shrink-0 snap-start flex-col items-start justify-center rounded-2xl border-2 px-3 py-1.5 text-left transition-colors',
              activo ? 'border-rosa bg-surface shadow-sm' : 'border-transparent',
              !activo && (pasado ? 'bg-sunken' : 'bg-surface'),
              pasado && !activo && 'opacity-60',
            )}
          >
            <span className={cx('text-sm font-semibold tabular', pasado ? 'text-muted' : hoy ? 'text-rosa-ink' : 'text-fg')}>
              {hoy ? 'Hoy' : diaCorto(d.fecha)}
            </span>
            <span
              className={cx(
                'mt-0.5 rounded-full px-1.5 text-[11px] font-semibold',
                pasado ? 'bg-line text-muted' : COLOR_CIUDAD[d.ciudad].chip,
              )}
            >
              {d.ciudad}
            </span>
          </button>
        );
      })}
    </div>
  );
}
