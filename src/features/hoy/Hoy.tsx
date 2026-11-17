import { useLiveQuery } from 'dexie-react-hooks';
import { BedDouble, CloudSun, ExternalLink, Plane, Wallet } from 'lucide-react';
import { Chip } from '../../components/ui/Chip';
import { MontoMXN, useTipoCambio } from '../../components/ui/Montos';
import { db } from '../../db/db';
import { setHecho } from '../../db/pendientes';
import { porOrden } from '../../domain/actividades';
import { alojamientoDeNoche } from '../../domain/alojamiento';
import { COLOR_CIUDAD, nombreCiudad } from '../../domain/ciudades';
import { cuentaRegresiva, gastoDelDia, pendientesUrgentes, urgencia } from '../../domain/hoy';
import { fechaEnZona, momentoViaje } from '../../domain/tiempo';
import type { Actividad, Dia, Gasto, OpcionAlojamiento, Pendiente } from '../../domain/types';
import { t } from '../../i18n';
import { cx } from '../../lib/cx';
import { diaCorto, diaLargo, diaMes } from '../../lib/fechas';
import { mapsUrl } from '../../lib/maps';
import { useAhora } from '../../lib/reloj';
import { toast } from '../../store/toast';
import { useUI } from '../../store/ui';
import { VistaDia } from '../dias/VistaDia';

export function Hoy() {
  const dias = useLiveQuery(() => db.dias.orderBy('id').toArray(), []);
  const actividades = useLiveQuery(() => db.actividades.toArray(), []);
  const alojamientos = useLiveQuery(() => db.alojamientos.toArray(), []);
  const pendientes = useLiveQuery(() => db.pendientes.toArray(), []);
  const gastos = useLiveQuery(() => db.gastos.toArray(), []);
  const now = useAhora();

  if (!dias || !actividades || !alojamientos || !pendientes || !gastos) return null;
  const { fase, hoyId } = momentoViaje(dias, now);

  if (fase === 'antes') return <Antes now={now} pendientes={pendientes} />;
  if (fase === 'despues') return <Despues dias={dias} actividades={actividades} gastos={gastos} />;

  const dia = dias.find((d) => d.id === hoyId)!;
  const lista = actividades.filter((a) => a.diaId === dia.id).sort(porOrden);

  return (
    <div className="space-y-4">
      <VistaDia
        key={dia.id}
        dia={dia}
        dias={dias}
        lista={lista}
        now={now}
        ocultarAnteriores
        arriba={
          <div className="space-y-3">
            <div>
              <p className="flex items-center gap-2 text-[15px] text-muted">
                <span className="capitalize">{diaLargo(dia.fecha)}</span>
                <span className={cx('rounded-full px-2 text-[12px] font-semibold', COLOR_CIUDAD[dia.ciudad].chip)}>
                  {nombreCiudad(dia.ciudad)}
                </span>
              </p>
              <h2 className="mt-1 font-display text-[26px] leading-tight font-semibold tracking-tight">{dia.titulo}</h2>
            </div>

            <TarjetaHoy
              dia={dia}
              alojamientos={alojamientos}
              actividades={actividades}
              gastos={gastos}
            />

          </div>
        }
      />
    </div>
  );
}

/** Dónde dormís, clima y gasto del día contra lo estimado. */
function TarjetaHoy({
  dia,
  alojamientos,
  actividades,
  gastos,
}: {
  dia: Dia;
  alojamientos: OpcionAlojamiento[];
  actividades: Actividad[];
  gastos: Gasto[];
}) {
  const tc = useTipoCambio();
  const noche = alojamientoDeNoche(dia, alojamientos);
  const real = gastoDelDia(dia.id, actividades, gastos, tc);
  const central = dia.costoCentralMXN;
  const pct = central ? Math.min(100, (real / central) * 100) : 0;
  const pasado = central !== undefined && real > central;

  return (
    <section className="card divide-y divide-line" aria-label={t('Resumen de hoy', "Today's summary")}>
      {/* Dónde dormís */}
      <div className="flex items-center gap-3 p-3">
        {dia.nocheEn || !/^(En el avión|On the plane)/.test(dia.nocheTexto ?? '') ? (
          <BedDouble size={22} className="shrink-0 text-rosa" aria-hidden="true" />
        ) : (
          <Plane size={22} className="shrink-0 text-azul" aria-hidden="true" />
        )}
        <div className="min-w-0 flex-1 leading-snug">
          <p className="text-[13px] text-muted">{t('Hoy dormís en', 'Tonight you sleep at')}</p>
          {noche ? (
            <>
              <p className="font-semibold">
                {noche.opcion.nombre}
                {!noche.reservado && <span className="ml-1 text-[13px] font-medium text-cempa-ink">· {t('sin reservar', 'not booked')}</span>}
              </p>
              <p className="text-[14px] text-muted">{noche.opcion.direccion.split(',').slice(0, 2).join(',')}</p>
            </>
          ) : (
            <p className="font-semibold">{dia.nocheTexto ?? '—'}</p>
          )}
        </div>
        {noche && (
          <a
            href={mapsUrl(noche.opcion.direccion)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border-2 border-azul px-3 text-[14px] font-semibold text-azul active:opacity-70"
          >
            <ExternalLink size={15} aria-hidden="true" /> Maps
          </a>
        )}
      </div>

      {dia.clima && (
        <div className="flex items-start gap-3 p-3">
          <CloudSun size={22} className="shrink-0 text-cempa-ink" aria-hidden="true" />
          <p className="text-[15px] leading-snug">{dia.clima}</p>
        </div>
      )}

      {/* Gasto del día */}
      <div className="flex items-start gap-3 p-3">
        <Wallet size={22} className="mt-0.5 shrink-0 text-verde" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-baseline justify-between gap-x-2 text-[15px]">
            <span>
              {t('Gastaste', 'You spent')} <strong className="tabular">{real ? <MontoMXN valor={real} /> : 'MXN 0'}</strong>
            </span>
            {central !== undefined && (
              <span className="text-[14px] text-muted tabular">
                {t('de', 'of')} <MontoMXN valor={central} /> est.
              </span>
            )}
          </p>
          {central !== undefined ? (
            <div
              className="mt-2 h-2 overflow-hidden rounded-full bg-sunken"
              role="progressbar"
              aria-label={t('Gasto del día contra lo estimado', "Today's spending vs. the estimate")}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct)}
            >
              <div className={cx('h-full rounded-full', pasado ? 'bg-rojo' : 'bg-verde')} style={{ width: `${pct}%` }} />
            </div>
          ) : (
            dia.costoNota && <p className="mt-0.5 text-[14px] text-muted">{dia.costoNota}</p>
          )}
        </div>
      </div>
    </section>
  );
}

/** Antes del viaje: cuenta regresiva y las 3 tareas más urgentes. */
function Antes({ now, pendientes }: { now: Date; pendientes: Pendiente[] }) {
  const setTab = useUI((s) => s.setTab);
  const { dias, horas } = cuentaRegresiva(now);
  const hoy = fechaEnZona(now, 'America/Montevideo');
  const urgentes = pendientesUrgentes(pendientes);

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <section className="card p-5 text-center">
        {dias > 0 ? (
          <>
            <p className="font-display text-[64px] leading-none font-semibold text-rosa-ink tabular">{dias}</p>
            <p className="mt-1 text-lg font-semibold">{dias === 1 ? t('día para salir', 'day to go') : t('días para salir', 'days to go')}</p>
          </>
        ) : (
          <>
            <p className="font-display text-[44px] leading-none font-semibold text-rosa-ink">{t('Hoy salís', 'You leave today')}</p>
            <p className="mt-2 text-lg font-semibold tabular">{t(`Faltan ${horas} h para el vuelo`, `${horas} h until the flight`)}</p>
          </>
        )}
        <p className="mt-2 text-[15px] text-muted">{t('Jue 11/2 de noche a Carrasco · Copa 3:06\u00a0a.\u00a0m.', 'Thu 2/11 at night to Carrasco · Copa 3:06\u00a0a.m.')}</p>
      </section>

      <section className="card p-4" aria-labelledby="urgentes">
        <h2 id="urgentes" className="font-display text-lg font-semibold">
          {t('Lo más urgente', 'Most urgent')}
        </h2>
        {urgentes.length ? (
          <ul className="mt-2 divide-y divide-line">
            {urgentes.map((p) => {
              const u = urgencia(p.fechaLimite, hoy);
              return (
                <li key={p.id} className="flex items-center gap-3 py-2">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={p.hecho}
                    aria-label={`${t('Hecho', 'Done')}: ${p.titulo}`}
                    onClick={() =>
                      void setHecho(p.id, true).then(() =>
                        toast(`${t('Hecho', 'Done')}: ${p.titulo}`, {
                          actionLabel: t('Deshacer', 'Undo'),
                          onAction: () => void setHecho(p.id, false),
                          duration: 5000,
                        }),
                      )
                    }
                    className="grid size-11 shrink-0 place-items-center rounded-full active:bg-sunken"
                  >
                    <span className="grid size-7 place-items-center rounded-lg border-2 border-line" />
                  </button>
                  <div className="min-w-0 flex-1 leading-snug">
                    <p className="font-medium">{p.titulo}</p>
                    {p.fechaLimite && (
                      <p
                        className={cx(
                          'text-[14px] font-medium',
                          u === 'vencida' ? 'text-rojo' : u === 'pronto' ? 'text-cempa-ink' : 'text-muted',
                        )}
                      >
                        {u === 'vencida' ? t('Venció el', 'Overdue since') : t('Antes del', 'Before')} {diaMes(p.fechaLimite)}
                        {p.fechaLimite.slice(0, 4) !== '2027' && `/${p.fechaLimite.slice(2, 4)}`}
                      </p>
                    )}
                  </div>
                  {u === 'vencida' && <Chip tono="rojo">{t('vencida', 'overdue')}</Chip>}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-2 text-muted">{t('No queda nada pendiente. ¡Bien!', 'Nothing left to do. Nice!')}</p>
        )}
        <button
          type="button"
          onClick={() => setTab('reservas')}
          className="mt-2 min-h-11 w-full rounded-full bg-sunken font-semibold text-rosa-ink active:opacity-70"
        >
          {t('Ver todas las reservas', 'See all bookings')}
        </button>
      </section>
    </div>
  );
}

/** Después del viaje: lo gastado, para pasarlo a finanzas. */
function Despues({ dias, actividades, gastos }: { dias: Dia[]; actividades: Actividad[]; gastos: Gasto[] }) {
  const tc = useTipoCambio();
  const abrirMas = useUI((s) => s.abrirMas);
  const total = dias.reduce((s, d) => s + gastoDelDia(d.id, actividades, gastos, tc), 0);
  return (
    <section className="card mx-auto max-w-xl p-5 text-center">
      <p className="font-display text-[32px] font-semibold">{t('¡Bienvenido de vuelta!', 'Welcome back!')}</p>
      <p className="mt-2 text-muted">
        {t('Del', 'From')} {diaCorto(dias[0].fecha)} {t('al', 'to')} {diaCorto(dias[dias.length - 1].fecha)} {t('cargaste', 'you logged')}
      </p>
      <p className="mt-1 text-2xl font-semibold tabular">
        <MontoMXN valor={total} />
      </p>
      <button
        type="button"
        onClick={() => abrirMas('presupuesto')}
        className="mt-4 min-h-12 w-full rounded-full bg-rosa-ink px-4 font-semibold text-white active:opacity-80"
      >
        {t('Ver presupuesto y exportar', 'See budget and export')}
      </button>
    </section>
  );
}
