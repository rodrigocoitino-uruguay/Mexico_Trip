import { useCallback, useEffect, useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import { COLOR_CIUDAD, nombreCiudad } from '../../domain/ciudades';
import { estadoDia } from '../../domain/tiempo';
import type { Dia } from '../../domain/types';
import { t } from '../../i18n';
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

/** Franja (px) junto a cada borde donde el mouse hace correr la lista, y velocidad máxima (px por cuadro). */
const BORDE_PX = 96;
const VELOCIDAD_MAX = 16;

/**
 * Selector horizontal de días. Los que ya pasaron quedan en gris a la izquierda;
 * al abrir, la lista arranca en el día de hoy (o en el elegido).
 */
export function DiaChips({ dias, seleccionado, hoyId, now, onSelect }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ancla = hoyId ?? seleccionado;
  const vel = useRef(0);
  const raf = useRef(0);
  const [bordes, setBordes] = useState({ izq: false, der: false });

  const medirBordes = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const izq = el.scrollLeft > 4;
    const der = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setBordes((b) => (b.izq === izq && b.der === der ? b : { izq, der }));
  }, []);

  useEffect(() => {
    medirBordes();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(medirBordes);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medirBordes, dias.length]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Con mouse (compu): al acercarlo a un borde, la lista corre sola hacia ese lado.
  const correr = useCallback(() => {
    const el = ref.current;
    const v = vel.current;
    if (!el || v === 0) {
      raf.current = 0;
      if (el) {
        el.style.scrollSnapType = '';
        el.style.scrollBehavior = '';
      }
      return;
    }
    const antes = el.scrollLeft;
    el.scrollLeft += v;
    if (el.scrollLeft === antes) vel.current = 0; // llegó al final
    raf.current = requestAnimationFrame(correr);
  }, []);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || e.buttons !== 0) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    let v = 0;
    if (x < BORDE_PX) v = -((BORDE_PX - x) / BORDE_PX) * VELOCIDAD_MAX;
    else if (x > r.width - BORDE_PX) v = ((x - (r.width - BORDE_PX)) / BORDE_PX) * VELOCIDAD_MAX;
    vel.current = v;
    if (v !== 0 && !raf.current) {
      // Sin "snap" ni scroll suave mientras corre: si no, el imán y la animación frenan el avance.
      el.style.scrollSnapType = 'none';
      el.style.scrollBehavior = 'auto';
      raf.current = requestAnimationFrame(correr);
    }
  };
  const parar = () => {
    vel.current = 0;
  };

  // Lleva el día ancla al principio de la lista visible (sin animación, al abrir y cuando cambia el día).
  useLayoutEffect(() => {
    const cont = ref.current;
    const chip = cont?.querySelector<HTMLElement>(`[data-dia="${ancla}"]`);
    // El contenedor es `relative`: offsetLeft del chip ya es relativo a él.
    if (cont && chip) cont.scrollTo({ left: chip.offsetLeft - 16, behavior: 'instant' });
  }, [ancla]);

  return (
    <div className="relative -mx-4">
      {bordes.izq && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 lg:block"
          style={{ background: 'linear-gradient(to right, var(--c-bg), transparent)' }}
        />
      )}
      {bordes.der && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 lg:block"
          style={{ background: 'linear-gradient(to left, var(--c-bg), transparent)' }}
        />
      )}
    <div
      ref={ref}
      role="listbox"
      aria-label={t('Días del viaje', 'Trip days')}
      onScroll={medirBordes}
      onPointerMove={onPointerMove}
      onPointerLeave={parar}
      onPointerDown={parar}
      className="no-scrollbar relative flex snap-x gap-2 overflow-x-auto scroll-smooth px-4 py-1"
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
            aria-label={`${diaCorto(d.fecha)}, ${nombreCiudad(d.ciudad)}${hoy ? t(', hoy', ', today') : pasado ? t(', ya pasó', ', past') : ''}`}
            onClick={() => onSelect(d.id)}
            className={cx(
              'relative flex min-h-14 shrink-0 snap-start flex-col items-start justify-center rounded-2xl border-2 px-3 py-1.5 text-left transition-colors',
              activo ? 'border-rosa bg-surface shadow-sm' : 'border-transparent',
              !activo && (pasado ? 'bg-sunken' : 'bg-surface'),
              pasado && !activo && 'opacity-60',
            )}
          >
            <span className={cx('text-sm font-semibold tabular', pasado ? 'text-muted' : hoy ? 'text-rosa-ink' : 'text-fg')}>
              {hoy ? t('Hoy', 'Today') : diaCorto(d.fecha)}
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
    </div>
  );
}
