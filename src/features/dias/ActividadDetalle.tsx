import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowRightLeft, Check, CircleDashed, ExternalLink, Pencil, SkipForward, Trash2 } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import { borrar, deshacerBorrado, mover, setActiva, setEstado, setGastoReal, setNota } from '../../db/actividades';
import { db } from '../../db/db';
import type { Actividad, Dia, EstadoActividad } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { ciudadMaps, mapsUrl } from '../../lib/maps';
import { montoInput, parseMonto } from '../../lib/numeros';
import { toast } from '../../store/toast';
import { ConUSD } from '../../components/ui/Montos';
import { estiloActividad } from './categorias';
import { ChipsActividad } from './chips';

const ESTADOS: { id: EstadoActividad; label: string; icon: typeof Check }[] = [
  { id: 'pendiente', label: 'Pendiente', icon: CircleDashed },
  { id: 'hecho', label: 'Hecha', icon: Check },
  { id: 'saltado', label: 'Saltada', icon: SkipForward },
];

interface Props {
  a: Actividad;
  dias: Dia[];
  onEditar: () => void;
  /** Después de borrar o mover (para cerrar la hoja). */
  onSalir: () => void;
}

export function ActividadDetalle({ a, dias, onEditar, onSalir }: Props) {
  const lugar = useLiveQuery(() => (a.lugarId ? db.lugares.get(a.lugarId) : undefined), [a.lugarId]);
  const dia = dias.find((d) => d.id === a.diaId);
  const { icon: Icon, punto } = estiloActividad(a);
  const idNota = useId();
  const idGasto = useId();
  const idMover = useId();

  const [nota, setNotaLocal] = useState(a.nota ?? '');
  const [gasto, setGastoLocal] = useState(montoInput(a.gastoRealMXN));
  // Si cambia la actividad (otra elegida, o editada en otro lado), refrescar los campos.
  useEffect(() => setNotaLocal(a.nota ?? ''), [a.id, a.nota]);
  useEffect(() => setGastoLocal(montoInput(a.gastoRealMXN)), [a.id, a.gastoRealMXN]);

  const maps = lugar
    ? mapsUrl(lugar.nombre, lugar.direccion, ciudadMaps(lugar.ciudad))
    : a.mapsQuery
      ? mapsUrl(a.mapsQuery)
      : null;

  const guardarNota = () => {
    if ((a.nota ?? '') !== nota.trim()) void setNota(a.id, nota).then(() => toast('Nota guardada'));
  };
  const guardarGasto = () => {
    const n = parseMonto(gasto);
    if (gasto.trim() && n === undefined) {
      toast('Ese monto no es válido');
      return;
    }
    if (n !== a.gastoRealMXN) void setGastoReal(a.id, n).then(() => toast(n === undefined ? 'Gasto borrado' : 'Gasto guardado'));
  };

  const onBorrar = async () => {
    const borrada = await borrar(a.id);
    onSalir();
    if (borrada) toast(`Borraste "${borrada.titulo}"`, { actionLabel: 'Deshacer', onAction: () => void deshacerBorrado(borrada), duration: 6000 });
  };

  const onMover = async (destino: string) => {
    if (!destino || destino === a.diaId) return;
    const desde = a.diaId;
    await mover(a.id, destino);
    onSalir();
    const d = dias.find((x) => x.id === destino);
    toast(`Pasó al ${d ? diaCorto(d.fecha) : destino}`, {
      actionLabel: 'Deshacer',
      onAction: () => void mover(a.id, desde),
      duration: 6000,
    });
  };

  return (
    <div className="space-y-5">
      <header className="flex gap-3">
        <span aria-hidden="true" className={cx('grid size-11 shrink-0 place-items-center rounded-full', punto)}>
          <Icon size={20} />
        </span>
        <div className="min-w-0">
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {dia && <span>{diaCorto(dia.fecha)}</span>}
            {a.hora && <span className="font-bold text-rosa-ink tabular">{a.hora}</span>}
            <ChipsActividad a={a} />
          </p>
          <h3 className="mt-0.5 font-display text-[22px] leading-tight font-semibold">{a.titulo}</h3>
        </div>
      </header>

      {a.descripcion && <p className="leading-relaxed"><ConUSD texto={a.descripcion} /></p>}

      {(a.comoLlegar || a.costoTexto) && (
        <dl className="space-y-2 rounded-2xl bg-sunken p-3 text-[15px]">
          {a.comoLlegar && (
            <div>
              <dt className="text-[13px] font-semibold text-azul">Cómo llegar</dt>
              <dd><ConUSD texto={a.comoLlegar} /></dd>
            </div>
          )}
          {a.costoTexto && (
            <div>
              <dt className="text-[13px] font-semibold text-cempa-ink">Costo</dt>
              <dd><ConUSD texto={a.costoTexto} /></dd>
            </div>
          )}
        </dl>
      )}

      {lugar && (lugar.horario || lugar.entrada || lugar.consejo) && (
        <dl className="space-y-1 text-[15px]">
          {lugar.direccion && (
            <div className="flex gap-2">
              <dt className="text-muted">Dirección:</dt>
              <dd>{lugar.direccion}</dd>
            </div>
          )}
          {lugar.horario && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">Horario:</dt>
              <dd><ConUSD texto={lugar.horario} /></dd>
            </div>
          )}
          {lugar.consejo && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">Consejo:</dt>
              <dd><ConUSD texto={lugar.consejo} /></dd>
            </div>
          )}
        </dl>
      )}

      {maps && (
        <a
          href={maps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-azul px-4 font-semibold text-azul active:opacity-70"
        >
          <ExternalLink size={18} aria-hidden="true" /> Abrir en Maps
        </a>
      )}

      {a.opcional && (
        <button
          type="button"
          onClick={() => void setActiva(a.id, !a.activa)}
          className={cx(
            'flex min-h-12 w-full items-center justify-center rounded-full px-4 font-semibold active:opacity-70',
            a.activa ? 'bg-sunken text-fg' : 'bg-cempa text-black',
          )}
        >
          {a.activa ? 'Desactivar (volver a opcional)' : 'Activar esta opcional'}
        </button>
      )}

      {/* Estado */}
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Estado</legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-sunken p-1">
          {ESTADOS.map(({ id, label, icon: I }) => {
            const on = a.estado === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => void setEstado(a.id, id)}
                className={cx(
                  'flex min-h-11 items-center justify-center gap-1.5 rounded-xl text-[15px] font-medium transition-colors',
                  on && id === 'hecho' && 'bg-verde text-white',
                  on && id !== 'hecho' && 'bg-surface shadow-sm',
                  !on && 'text-muted',
                )}
              >
                <I size={16} aria-hidden="true" className={cx(on && id === 'hecho' && 'animate-check')} />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Nota y gasto real */}
      <div className="space-y-3">
        <div>
          <label htmlFor={idNota} className="mb-1 block text-sm font-semibold">
            Nota
          </label>
          <textarea
            id={idNota}
            value={nota}
            rows={3}
            placeholder="Qué te pareció, qué tener en cuenta…"
            onChange={(e) => setNotaLocal(e.target.value)}
            onBlur={guardarNota}
            className="w-full rounded-xl border border-line bg-surface px-3 py-2 outline-none focus:border-rosa"
          />
        </div>
        <div>
          <label htmlFor={idGasto} className="mb-1 block text-sm font-semibold">
            Gasto real (MXN)
          </label>
          <input
            id={idGasto}
            inputMode="decimal"
            value={gasto}
            placeholder={a.costoMXN !== undefined ? `Estimado: ${a.costoMXN}` : '0'}
            onChange={(e) => setGastoLocal(e.target.value)}
            onBlur={guardarGasto}
            onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
            className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 tabular outline-none focus:border-rosa"
          />
        </div>
      </div>

      {/* Ajustes de la actividad */}
      <div className="space-y-2 border-t border-line pt-4">
        <button
          type="button"
          onClick={onEditar}
          className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 font-medium active:bg-sunken"
        >
          <Pencil size={18} className="text-rosa-ink" aria-hidden="true" /> Editar hora y textos
        </button>
        <div className="flex min-h-12 items-center gap-3 rounded-xl px-2">
          <ArrowRightLeft size={18} className="shrink-0 text-rosa-ink" aria-hidden="true" />
          <label htmlFor={idMover} className="shrink-0 font-medium">
            Mover a
          </label>
          <select
            id={idMover}
            value=""
            onChange={(e) => void onMover(e.target.value)}
            className="min-h-11 min-w-0 flex-1 rounded-xl border border-line bg-surface px-2"
          >
            <option value="">Elegí un día…</option>
            {dias
              .filter((d) => d.id !== a.diaId)
              .map((d) => (
                <option key={d.id} value={d.id}>
                  {diaCorto(d.fecha)} · {d.ciudad}
                </option>
              ))}
          </select>
        </div>
        <button
          type="button"
          onClick={() => void onBorrar()}
          className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 font-medium text-rojo active:bg-rojo-soft"
        >
          <Trash2 size={18} aria-hidden="true" /> Borrar actividad
        </button>
      </div>
    </div>
  );
}
