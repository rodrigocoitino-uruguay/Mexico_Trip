import { Check, MapPin, NotebookPen, Plus, Receipt, SkipForward } from 'lucide-react';
import { setActiva, setEstado } from '../../db/actividades';
import { cuenta } from '../../domain/actividades';
import type { Actividad } from '../../domain/types';
import { t } from '../../i18n';
import { cx } from '../../lib/cx';
import { horaVisible } from '../../lib/hora';
import { ConUSD, MontoMXN } from '../../components/ui/Montos';
import { estiloActividad } from './categorias';
import { ChipsActividad } from './chips';

interface Props {
  actividades: Actividad[];
  seleccionada: string | null;
  /** Próxima actividad (solo el día de hoy): se resalta. */
  proximaId?: string | null;
  /** La que está pasando ahora (solo hoy). */
  enCursoId?: string | null;
  /** 'en 45 min' para la próxima. */
  proximaCuando?: string;
  onAbrir: (id: string) => void;
}

export function Timeline({ actividades, seleccionada, proximaId, proximaCuando, enCursoId, onAbrir }: Props) {
  if (!actividades.length) {
    return <p className="card p-5 text-center text-muted">{t('No hay actividades este día.', 'No activities this day.')}</p>;
  }
  return (
    <ol className="relative space-y-3">
      {/* Línea del timeline */}
      <span aria-hidden="true" className="absolute top-3 bottom-3 left-[21px] w-px bg-line" />
      {actividades.map((a) => (
        <ActividadItem
          key={a.id}
          a={a}
          activa={a.id === seleccionada}
          proxima={a.id === proximaId}
          proximaCuando={proximaCuando}
          enCurso={a.id === enCursoId}
          onAbrir={() => onAbrir(a.id)}
        />
      ))}
    </ol>
  );
}

function ActividadItem({
  a,
  activa,
  proxima,
  enCurso,
  proximaCuando,
  onAbrir,
}: {
  a: Actividad;
  activa: boolean;
  proxima: boolean;
  enCurso: boolean;
  proximaCuando?: string;
  onAbrir: () => void;
}) {
  const { icon: Icon, punto } = estiloActividad(a);
  const apagada = a.opcional && !a.activa;
  const hecho = a.estado === 'hecho';
  const saltado = a.estado === 'saltado';

  return (
    <li className="relative flex gap-3">
      {/* Punto del timeline con el ícono de la categoría */}
      <span
        aria-hidden="true"
        className={cx(
          'relative z-10 mt-3 grid size-11 shrink-0 place-items-center rounded-full ring-4 ring-bg',
          hecho ? 'bg-verde text-white' : punto,
        )}
      >
        <Icon size={20} strokeWidth={1.9} />
      </span>

      <div
        className={cx(
          'min-w-0 flex-1 transition-[opacity,box-shadow]',
          apagada ? 'rounded-[16px] border-2 border-dashed border-cempa bg-surface/50' : 'card',
          activa && 'ring-2 ring-rosa',
          (proxima || enCurso) && !activa && 'ring-2 ring-cempa',
        )}
      >
        <div className="flex items-start gap-1 p-1">
          <button
            type="button"
            onClick={onAbrir}
            className={cx('min-w-0 flex-1 rounded-xl p-3 pr-1 text-left active:bg-sunken', (hecho || saltado) && 'opacity-60')}
            aria-label={`${a.hora ? `${horaVisible(a.hora)}, ` : ''}${a.titulo}. ${t('Ver detalle', 'See details')}`}
          >
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {a.hora && <span className="text-[15px] font-bold text-rosa-ink tabular">{horaVisible(a.hora)}</span>}
              {enCurso && <span className="text-[13px] font-semibold text-cempa-ink">{t('Ahora', 'Now')}</span>}
              {proxima && <span className="text-[13px] font-semibold text-cempa-ink">{t('Próxima', 'Next')}{proximaCuando && ` · ${proximaCuando}`}</span>}
              <ChipsActividad a={a} />
            </p>
            <p className={cx('mt-1 text-[17px] leading-snug font-semibold', saltado && 'line-through')}>
              {a.titulo}
            </p>
            {a.descripcion && <p className="mt-1 text-[15px] leading-snug text-muted"><ConUSD texto={a.descripcion} /></p>}
            {a.comoLlegar && (
              <p className="mt-2 flex gap-1.5 text-[15px] leading-snug">
                <MapPin size={16} className="mt-0.5 shrink-0 text-azul" aria-hidden="true" />
                <span><ConUSD texto={a.comoLlegar} /></span>
              </p>
            )}
            {a.costoTexto && (
              <p className="mt-1 flex gap-1.5 text-[15px] leading-snug">
                <Receipt size={16} className="mt-0.5 shrink-0 text-cempa-ink" aria-hidden="true" />
                <span><ConUSD texto={a.costoTexto} /></span>
              </p>
            )}
            {(a.nota || a.gastoRealMXN !== undefined) && (
              <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 rounded-lg bg-sunken px-2 py-1.5 text-[14px]">
                {a.gastoRealMXN !== undefined && (
                  <span className="font-semibold tabular">{t('Gastaste', 'You spent')} <MontoMXN valor={a.gastoRealMXN} /></span>
                )}
                {a.nota && (
                  <span className="flex min-w-0 gap-1">
                    <NotebookPen size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="line-clamp-2">{a.nota}</span>
                  </span>
                )}
              </p>
            )}
          </button>

          {apagada ? (
            <button
              type="button"
              onClick={() => void setActiva(a.id, true)}
              className="m-2 flex min-h-11 shrink-0 items-center gap-1 rounded-full bg-cempa-soft px-3 text-sm font-semibold text-cempa-ink active:opacity-70"
            >
              <Plus size={16} aria-hidden="true" /> {t('Activar', 'Enable')}
            </button>
          ) : (
            <BotonHecho a={a} />
          )}
        </div>
      </div>
    </li>
  );
}

/** Tocar = hecho / pendiente. Si estaba saltada, vuelve a pendiente. */
function BotonHecho({ a }: { a: Actividad }) {
  const hecho = a.estado === 'hecho';
  const saltado = a.estado === 'saltado';
  const label = hecho
    ? t('Marcar como pendiente', 'Mark as pending')
    : saltado
      ? t('Volver a pendiente', 'Back to pending')
      : t('Marcar como hecha', 'Mark as done');
  return (
    <button
      type="button"
      aria-label={`${label}: ${a.titulo}`}
      aria-pressed={hecho}
      onClick={() => void setEstado(a.id, hecho || saltado ? 'pendiente' : 'hecho')}
      className="grid size-12 shrink-0 place-items-center rounded-full active:bg-sunken"
    >
      <span
        className={cx(
          'grid size-8 place-items-center rounded-full border-2 transition-colors',
          hecho ? 'border-verde bg-verde text-white' : saltado ? 'border-line bg-sunken text-muted' : 'border-line',
        )}
      >
        {hecho && <Check key="ok" size={18} strokeWidth={3} className="animate-check" aria-hidden="true" />}
        {saltado && <SkipForward size={15} aria-hidden="true" />}
      </span>
    </button>
  );
}

/** Pie del día: estimado del plan (bajo/central/alto) y lo que cargaste. */
export function PieDia({
  bajo,
  central,
  alto,
  nota,
  actividades,
}: {
  bajo?: number;
  central?: number;
  alto?: number;
  nota?: string;
  actividades: Actividad[];
}) {
  const real = actividades.reduce((s, a) => s + (a.gastoRealMXN ?? 0), 0);
  const conGasto = actividades.filter((a) => a.gastoRealMXN !== undefined).length;
  const hechas = actividades.filter((a) => cuenta(a) && a.estado === 'hecho').length;
  const total = actividades.filter(cuenta).length;
  return (
    <section className="card mt-4 p-4" aria-label={t('Costo del día', 'Cost of the day')}>
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-lg font-semibold">{t('Costo del día', 'Cost of the day')}</h3>
        <span className="text-sm text-muted tabular">
          {t(`${hechas} de ${total} hechas`, `${hechas} of ${total} done`)}
        </span>
      </div>
      {central !== undefined ? (
        <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
          {[
            ['Bajo', t('Bajo', 'Low'), bajo],
            ['Central', t('Central', 'Mid'), central],
            ['Alto', t('Alto', 'High'), alto],
          ].map(([k, etiqueta, v]) => (
            <div key={k as string} className={cx('rounded-xl p-2', k === 'Central' ? 'bg-rosa-soft' : 'bg-sunken')}>
              <dt className="text-[13px] text-muted">{etiqueta}</dt>
              <dd className={cx('font-semibold tabular', k === 'Central' && 'text-rosa-ink')}>
                {v !== undefined ? <MontoMXN valor={v as number} apilado /> : "—"}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        nota && <p className="mt-2 text-[15px] text-muted">{nota}</p>
      )}
      <p className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
        <span>{t('Gasto real cargado', 'Actual spending logged')}</span>
        <span className="font-semibold tabular">
          {conGasto ? <MontoMXN valor={real} /> : "—"}
          {central !== undefined && conGasto > 0 && (
            <span className={cx('ml-2 text-sm', real > central ? 'text-rojo' : 'text-verde')}>
              {real > central ? t('por encima del central', 'above the mid estimate') : t('dentro del central', 'within the mid estimate')}
            </span>
          )}
        </span>
      </p>
    </section>
  );
}
