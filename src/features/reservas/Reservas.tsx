import { useLiveQuery } from 'dexie-react-hooks';
import { Check, CircleHelp, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui/Chip';
import { Sheet } from '../../components/ui/Sheet';
import { toast } from '../../store/toast';
import { db } from '../../db/db';
import { agregarPendiente, borrarPendiente, deshacerBorradoPendiente, setHecho } from '../../db/pendientes';
import { reabrirDecision, resolverDecision } from '../../db/reservas';
import { urgencia } from '../../domain/hoy';
import { fechaEnZona } from '../../domain/tiempo';
import type { Decision, GrupoPendiente, Pendiente } from '../../domain/types';
import { t } from '../../i18n';
import { cx } from '../../lib/cx';
import { diaMes } from '../../lib/fechas';
import { useAhora } from '../../lib/reloj';

const GRUPOS: GrupoPendiente[] = ['Reservar ya', 'Más adelante', 'En destino'];

/** Los grupos se guardan en español (son una clave de datos); acá se traducen para mostrarlos. */
const nombreGrupo = (g: GrupoPendiente) =>
  g === 'Reservar ya' ? t('Reservar ya', 'Book now') : g === 'Más adelante' ? t('Más adelante', 'Later') : t('En destino', 'On the trip');

/** '15/12/26' o '29/1' (las del 2027 sin año). */
function fechaCorta(iso: string): string {
  return iso.startsWith('2027') ? diaMes(iso) : `${diaMes(iso)}/${iso.slice(2, 4)}`;
}

export function Reservas() {
  const pendientes = useLiveQuery(() => db.pendientes.toArray(), []);
  const decisiones = useLiveQuery(() => db.decisiones.toArray(), []);
  const now = useAhora();
  const [nueva, setNueva] = useState<GrupoPendiente | null>(null);
  if (!pendientes || !decisiones) return null;

  const hoy = fechaEnZona(now, 'America/Montevideo');
  const hechos = pendientes.filter((p) => p.hecho).length;
  const pct = pendientes.length ? Math.round((hechos / pendientes.length) * 100) : 0;
  const abiertas = decisiones.filter((d) => !d.resuelta).sort((a, b) => a.orden - b.orden);
  const resueltas = decisiones.filter((d) => d.resuelta).sort((a, b) => a.orden - b.orden);

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <section className="card p-4" aria-label={t('Progreso', 'Progress')}>
        <p className="flex items-baseline justify-between">
          <span className="font-semibold">
            {t(`${hechos} de ${pendientes.length} hechas`, `${hechos} of ${pendientes.length} done`)}
          </span>
          <span className="text-muted tabular">{pct}%</span>
        </p>
        <div
          className="mt-2 h-2.5 overflow-hidden rounded-full bg-sunken"
          role="progressbar"
          aria-label={t('Reservas hechas', 'Bookings done')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
        >
          <div className="h-full rounded-full bg-verde transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
      </section>

      {abiertas.length > 0 && (
        <section aria-labelledby="decisiones" className="space-y-2">
          <h2 id="decisiones" className="font-display text-xl font-semibold">
            {t('Decisiones abiertas', 'Open decisions')}
          </h2>
          {abiertas.map((d) => (
            <DecisionCard key={d.id} d={d} />
          ))}
        </section>
      )}

      {GRUPOS.map((g) => {
        const lista = pendientes
          .filter((p) => p.grupo === g)
          .sort((a, b) => Number(a.hecho) - Number(b.hecho) || (a.fechaLimite ?? '9').localeCompare(b.fechaLimite ?? '9') || a.orden - b.orden);
        const hechosG = lista.filter((p) => p.hecho).length;
        return (
          <section key={g} aria-labelledby={`g-${g}`}>
            <h2 id={`g-${g}`} className="flex items-baseline justify-between font-display text-xl font-semibold">
              {nombreGrupo(g)}
              <span className="font-sans text-[14px] font-normal text-muted tabular">
                {hechosG}/{lista.length}
              </span>
            </h2>
            <ul className="card mt-2 divide-y divide-line overflow-hidden">
              {lista.map((p) => (
                <PendienteItem key={p.id} p={p} hoy={hoy} />
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => setNueva(g)}
                  className="flex min-h-12 w-full items-center gap-2 px-4 font-semibold text-rosa-ink active:bg-sunken"
                >
                  <Plus size={18} aria-hidden="true" /> {t('Agregar tarea', 'Add task')}
                </button>
              </li>
            </ul>
          </section>
        );
      })}

      <Sheet open={!!nueva} onClose={() => setNueva(null)} title={t('Nueva tarea', 'New task')}>
        {nueva && <NuevaTarea key={nueva} grupo={nueva} onListo={() => setNueva(null)} />}
      </Sheet>

      {resueltas.length > 0 && (
        <section aria-labelledby="resueltas" className="space-y-2">
          <h2 id="resueltas" className="font-display text-xl font-semibold text-muted">
            {t('Decisiones tomadas', 'Decisions made')}
          </h2>
          {resueltas.map((d) => (
            <DecisionCard key={d.id} d={d} />
          ))}
        </section>
      )}
    </div>
  );
}

function PendienteItem({ p, hoy }: { p: Pendiente; hoy: string }) {
  const u = p.hecho ? null : urgencia(p.fechaLimite, hoy);
  return (
    <li
      className={cx(
        'flex items-start gap-2 py-2 pr-3 pl-1',
        u === 'vencida' && 'bg-rojo-soft/60',
        u === 'pronto' && 'bg-cempa-soft/60',
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={p.hecho}
        aria-label={`${t('Hecho', 'Done')}: ${p.titulo}`}
        onClick={() => void setHecho(p.id, !p.hecho)}
        className="grid size-11 shrink-0 place-items-center rounded-full active:bg-sunken"
      >
        <span
          className={cx(
            'grid size-7 place-items-center rounded-lg border-2 transition-colors',
            p.hecho ? 'border-verde bg-verde text-white' : 'border-line bg-surface',
          )}
        >
          {p.hecho && <Check size={17} strokeWidth={3} className="animate-check" aria-hidden="true" />}
        </span>
      </button>
      <div className={cx('min-w-0 flex-1 py-2 leading-snug', p.hecho && 'text-muted line-through decoration-1')}>
        <p className="font-medium">{p.titulo}</p>
        {p.fechaLimite && !p.hecho && (
          <p
            className={cx(
              'mt-0.5 text-[14px] font-semibold tabular',
              u === 'vencida' ? 'text-rojo' : u === 'pronto' ? 'text-cempa-ink' : 'text-muted',
            )}
          >
            {u === 'vencida' ? t('Venció el ', 'Overdue since ') : t('Antes del ', 'Before ')}
            {fechaCorta(p.fechaLimite)}
          </p>
        )}
        {p.detalle && !p.hecho && <p className="mt-0.5 text-[15px] text-muted">{p.detalle}</p>}
      </div>
      {!p.delSeed && (
        <button
          type="button"
          aria-label={`${t('Borrar tarea', 'Delete task')}: ${p.titulo}`}
          onClick={() =>
            void borrarPendiente(p.id).then((b) =>
              b && toast(t('Tarea borrada', 'Task deleted'), { actionLabel: t('Deshacer', 'Undo'), onAction: () => void deshacerBorradoPendiente(b), duration: 6000 }),
            )
          }
          className="grid size-11 shrink-0 place-items-center self-center rounded-full text-muted active:bg-rojo-soft active:text-rojo"
        >
          <Trash2 size={18} aria-hidden="true" />
        </button>
      )}
    </li>
  );
}

function DecisionCard({ d }: { d: Decision }) {
  const [abierta, setAbierta] = useState(false);
  const [texto, setTexto] = useState(d.resolucion ?? '');
  return (
    <article className={cx('card p-4', !d.resuelta && 'border-l-4 border-cempa')}>
      <div className="flex items-start gap-2">
        <CircleHelp size={20} className={cx('mt-0.5 shrink-0', d.resuelta ? 'text-verde' : 'text-cempa-ink')} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold leading-snug">{d.titulo}</h3>
          <p className="mt-0.5 text-[15px] text-muted">{d.detalle}</p>
          {d.resuelta && (
            <p className="mt-2 flex flex-wrap items-center gap-2">
              <Chip tono="verde">{t('decidido', 'decided')}</Chip>
              {d.resolucion && <span className="font-medium">{d.resolucion}</span>}
            </p>
          )}
        </div>
      </div>
      {d.resuelta ? (
        <button
          type="button"
          onClick={() => void reabrirDecision(d.id)}
          className="mt-2 min-h-11 rounded-full px-3 font-semibold text-muted active:bg-sunken"
        >
          {t('Reabrir', 'Reopen')}
        </button>
      ) : abierta ? (
        <form
          className="mt-3 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            void resolverDecision(d.id, texto);
          }}
        >
          <label htmlFor={`dec-${d.id}`} className="block text-sm font-semibold">
            {t('¿Qué decidiste?', 'What did you decide?')}
          </label>
          <input
            id={`dec-${d.id}`}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={t('Por ejemplo: BSE Viajeros, USD 62', 'For example: BSE Viajeros, USD 62')}
            className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa"
          />
          <div className="flex gap-2">
            <button type="button" onClick={() => setAbierta(false)} className="min-h-11 flex-1 rounded-full bg-sunken font-semibold">
              {t('Cancelar', 'Cancel')}
            </button>
            <button type="submit" className="min-h-11 flex-1 rounded-full bg-verde font-semibold text-white">
              {t('Listo', 'Done')}
            </button>
          </div>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setAbierta(true)}
          className="mt-3 min-h-11 w-full rounded-full bg-cempa-soft font-semibold text-cempa-ink active:opacity-70"
        >
          {t('Resolver', 'Resolve')}
        </button>
      )}
    </article>
  );
}

function NuevaTarea({ grupo: inicial, onListo }: { grupo: GrupoPendiente; onListo: () => void }) {
  const [titulo, setTitulo] = useState('');
  const [grupo, setGrupo] = useState<GrupoPendiente>(inicial);
  const [fecha, setFecha] = useState('');
  const [detalle, setDetalle] = useState('');
  const campo = 'min-h-12 w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa';
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (!titulo.trim()) return;
        void agregarPendiente({ titulo, grupo, fechaLimite: fecha, detalle }).then(() => {
          toast(t('Tarea agregada', 'Task added'));
          onListo();
        });
      }}
    >
      <div>
        <label htmlFor="nt-titulo" className="mb-1 block text-sm font-semibold">
          {t('Qué hay que hacer', 'What needs doing')}
        </label>
        <input id="nt-titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} className={campo} />
      </div>
      <fieldset>
        <legend className="mb-1 text-sm font-semibold">{t('Cuándo', 'When')}</legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl bg-sunken p-1">
          {GRUPOS.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={grupo === g}
              onClick={() => setGrupo(g)}
              className={cx('min-h-11 rounded-xl text-[14px] font-medium', grupo === g ? 'bg-surface shadow-sm' : 'text-muted')}
            >
              {nombreGrupo(g)}
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="nt-fecha" className="mb-1 block text-sm font-semibold">
          {t('Fecha límite (opcional)', 'Deadline (optional)')}
        </label>
        <input id="nt-fecha" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className={campo} />
      </div>
      <div>
        <label htmlFor="nt-detalle" className="mb-1 block text-sm font-semibold">
          {t('Detalle (opcional)', 'Details (optional)')}
        </label>
        <input id="nt-detalle" value={detalle} onChange={(e) => setDetalle(e.target.value)} className={campo} />
      </div>
      <button
        type="submit"
        disabled={!titulo.trim()}
        className="min-h-12 w-full rounded-full bg-rosa-ink font-semibold text-white active:opacity-80 disabled:opacity-40"
      >
        {t('Agregar', 'Add')}
      </button>
    </form>
  );
}
