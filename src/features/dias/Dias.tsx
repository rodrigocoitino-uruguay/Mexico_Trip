import { useLiveQuery } from 'dexie-react-hooks';
import { BedDouble, CloudSun, ExternalLink } from 'lucide-react';
import { useMemo } from 'react';
import { Chip } from '../../components/ui/Chip';
import { db } from '../../db/db';
import { porOrden } from '../../domain/actividades';
import { alojamientoDeNoche } from '../../domain/alojamiento';
import { COLOR_CIUDAD, nombreCiudad } from '../../domain/ciudades';
import { estadoDia, momentoViaje } from '../../domain/tiempo';
import type { Dia } from '../../domain/types';
import { t } from '../../i18n';
import { cx } from '../../lib/cx';
import { diaLargo } from '../../lib/fechas';
import { mapsUrl } from '../../lib/maps';
import { useAhora } from '../../lib/reloj';
import { useUI } from '../../store/ui';
import { DiaChips } from './DiaChips';
import { VistaDia } from './VistaDia';

export function Dias() {
  const dias = useLiveQuery(() => db.dias.orderBy('id').toArray(), []);
  const todas = useLiveQuery(() => db.actividades.toArray(), []);
  const alojamientos = useLiveQuery(() => db.alojamientos.toArray(), []);
  const diaIdStore = useUI((s) => s.diaId);
  const verDia = useUI((s) => s.verDia);
  const now = useAhora();

  const momento = useMemo(() => (dias ? momentoViaje(dias, now) : null), [dias, now]);

  if (!dias || !todas || !alojamientos || !momento) return null;

  // Día por defecto: hoy durante el viaje; antes, el primero; después, el último.
  const porDefecto = momento.hoyId ?? (momento.fase === 'despues' ? dias[dias.length - 1].id : dias[0].id);
  const dia = dias.find((d) => d.id === diaIdStore) ?? dias.find((d) => d.id === porDefecto)!;
  const lista = todas.filter((a) => a.diaId === dia.id).sort(porOrden);
  const estado = estadoDia(dia, now);

  return (
    <div className="space-y-4">
      <DiaChips dias={dias} seleccionado={dia.id} hoyId={momento.hoyId} now={now} onSelect={verDia} />
      <VistaDia
        key={dia.id}
        dia={dia}
        dias={dias}
        lista={lista}
        now={now}
        arriba={
          <EncabezadoDia
            dia={dia}
            esHoy={estado === 'hoy'}
            pasado={estado === 'pasado'}
            noche={alojamientoDeNoche(dia, alojamientos)}
          />
        }
      />
    </div>
  );
}

function EncabezadoDia({
  dia,
  esHoy,
  pasado,
  noche,
}: {
  dia: Dia;
  esHoy: boolean;
  pasado: boolean;
  noche: ReturnType<typeof alojamientoDeNoche>;
}) {
  return (
    <section>
      <p className="flex flex-wrap items-center gap-2 text-[15px] text-muted">
        <span className="capitalize">{diaLargo(dia.fecha)}</span>
        <span className={cx('rounded-full px-2 text-[12px] font-semibold', COLOR_CIUDAD[dia.ciudad].chip)}>{nombreCiudad(dia.ciudad)}</span>
        {esHoy && <Chip tono="rosa">{t('Hoy', 'Today')}</Chip>}
        {pasado && <Chip>{t('Ya pasó', 'Past')}</Chip>}
      </p>
      <h2 className="mt-1 font-display text-[26px] leading-tight font-semibold tracking-tight">{dia.titulo}</h2>
      {dia.resumen && <p className="mt-1 text-muted">{dia.resumen}</p>}

      {(dia.clima || noche || dia.nocheTexto) && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          {(noche || dia.nocheTexto) && (
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-surface px-3 py-2">
              <BedDouble size={20} className="shrink-0 text-rosa" aria-hidden="true" />
              <div className="min-w-0 flex-1 text-[15px] leading-snug">
                <p className="text-[13px] text-muted">{t('Dormís en', 'You sleep at')}</p>
                {noche ? (
                  <p className="font-semibold">
                    {noche.opcion.nombre}{' '}
                    <span className={cx('text-[13px] font-medium', noche.reservado ? 'text-verde' : 'text-cempa-ink')}>
                      {noche.reservado ? t('· reservado', '· booked') : t('· recomendado, sin reservar', '· recommended, not booked')}
                    </span>
                  </p>
                ) : (
                  <p className="font-semibold">{dia.nocheTexto}</p>
                )}
              </div>
              {noche && (
                <a
                  href={mapsUrl(noche.opcion.direccion)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(`Abrir ${noche.opcion.nombre} en Maps`, `Open ${noche.opcion.nombre} in Maps`)}
                  className="grid size-11 shrink-0 place-items-center rounded-full text-azul active:bg-sunken"
                >
                  <ExternalLink size={18} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
          {dia.clima && (
            <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl bg-surface px-3 py-2">
              <CloudSun size={20} className="shrink-0 text-cempa-ink" aria-hidden="true" />
              <p className="text-[15px] leading-snug">{dia.clima}</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
