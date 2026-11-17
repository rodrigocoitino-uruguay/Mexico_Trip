import { useEffect, useLayoutEffect, useRef, type PointerEvent, type RefObject } from 'react';
import { COLOR_CIUDAD, nombreCiudad } from '../../domain/ciudades';
import { estadoDia } from '../../domain/tiempo';
import type { Dia } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { t } from '../../lib/i18n';

interface Props {
  dias: Dia[];
  seleccionado: string;
  /** Día de hoy (durante el viaje): queda primero a la izquierda. */
  hoyId: string | null;
  now: Date;
  onSelect: (id: string) => void;
}

/** Franja (px) junto a cada borde donde el mouse empieza a correr la lista. */
const ZONA_BORDE = 96;
/** Velocidad máxima de la lista (px por cuadro, unos 800 px/s) cuando el mouse está pegado al borde. */
const VELOCIDAD_MAX = 13;

/**
 * En la web no se puede arrastrar la lista como en el celular: al acercar el mouse a un borde
 * se va corriendo sola hacia ese lado (más rápido cuanto más cerca del borde). Solo con mouse.
 */
function useCorrerAlBorde(ref: RefObject<HTMLDivElement | null>) {
  const velocidad = useRef(0);
  const cuadro = useRef<number | null>(null);

  const parar = () => {
    velocidad.current = 0;
    if (cuadro.current !== null) cancelAnimationFrame(cuadro.current);
    cuadro.current = null;
    // Devuelve el imán de los chips (queda alineado cuando se frena).
    if (ref.current) ref.current.style.scrollSnapType = '';
  };

  const paso = () => {
    const el = ref.current;
    if (!el || velocidad.current === 0) return parar();
    const antes = el.scrollLeft;
    el.scrollTo({ left: antes + velocidad.current, behavior: 'instant' });
    // Llegó al extremo: no hace falta seguir.
    if (el.scrollLeft === antes) return parar();
    cuadro.current = requestAnimationFrame(paso);
  };

  useEffect(() => parar, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    onPointerMove(e: PointerEvent<HTMLDivElement>) {
      if (e.pointerType !== 'mouse') return;
      const el = e.currentTarget;
      const { left, width } = el.getBoundingClientRect();
      const x = e.clientX - left;
      // 0 en el borde de adentro de la franja, 1 pegado al borde de la lista.
      const haciaIzq = Math.max(0, (ZONA_BORDE - x) / ZONA_BORDE);
      const haciaDer = Math.max(0, (x - (width - ZONA_BORDE)) / ZONA_BORDE);
      const fuerza = Math.min(1, haciaDer || haciaIzq);
      const v = Math.sign(haciaDer - haciaIzq) * VELOCIDAD_MAX * fuerza * fuerza;
      velocidad.current = Math.abs(v) < 0.5 ? 0 : v;
      if (velocidad.current === 0) return parar();
      if (cuadro.current === null) {
        el.style.scrollSnapType = 'none';
        cuadro.current = requestAnimationFrame(paso);
      }
    },
    onPointerLeave: parar,
  };
}

/**
 * Selector horizontal de días. Los que ya pasaron quedan en gris a la izquierda;
 * al abrir, la lista arranca en el día de hoy (o en el elegido).
 */
export function DiaChips({ dias, seleccionado, hoyId, now, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ancla = hoyId ?? seleccionado;
  const borde = useCorrerAlBorde(ref);

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
      aria-label={t('Días del viaje')}
      onPointerMove={borde.onPointerMove}
      onPointerLeave={borde.onPointerLeave}
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
            aria-label={`${diaCorto(d.fecha)}, ${nombreCiudad(d.ciudad)}${hoy ? `, ${t('hoy')}` : pasado ? `, ${t('ya pasó')}` : ''}`}
            onClick={() => onSelect(d.id)}
            className={cx(
              'relative flex min-h-14 shrink-0 snap-start flex-col items-start justify-center rounded-2xl border-2 px-3 py-1.5 text-left transition-colors',
              activo ? 'border-rosa bg-surface shadow-sm' : 'border-transparent',
              !activo && (pasado ? 'bg-sunken' : 'bg-surface'),
              pasado && !activo && 'opacity-60',
            )}
          >
            <span className={cx('text-sm font-semibold tabular', pasado ? 'text-muted' : hoy ? 'text-rosa-ink' : 'text-fg')}>
              {hoy ? t('Hoy') : diaCorto(d.fecha)}
            </span>
            <span
              className={cx(
                'mt-0.5 rounded-full px-1.5 text-[11px] font-semibold',
                pasado ? 'bg-line text-muted' : COLOR_CIUDAD[d.ciudad].chip,
              )}
            >
              {nombreCiudad(d.ciudad)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
