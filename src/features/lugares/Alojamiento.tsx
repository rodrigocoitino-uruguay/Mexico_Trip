import { ChevronDown, ExternalLink, Star } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui/Chip';
import { Sheet } from '../../components/ui/Sheet';
import { NOTA_PRECIOS_ALOJAMIENTO } from '../../data/seed';
import { cancelarReserva, editarReserva, reservar } from '../../db/reservas';
import { opcionesVisibles } from '../../domain/reservas';
import type { CiudadAlojamiento, OpcionAlojamiento } from '../../domain/types';
import { cx } from '../../lib/cx';
import { mapsUrl } from '../../lib/maps';
import { toast } from '../../store/toast';
import { DatosReserva, ReservaForm } from './ReservaForm';

const CIUDADES: CiudadAlojamiento[] = ['CDMX', 'Mérida', 'Valladolid'];

/** Día siguiente (check-out). */
const masUno = (iso: string) => new Date(Date.parse(`${iso}T12:00:00Z`) + 86_400_000).toISOString().slice(0, 10);

export function Alojamiento({ opciones, ciudades }: { opciones: OpcionAlojamiento[]; ciudades: CiudadAlojamiento[] }) {
  const [form, setForm] = useState<{ op: OpcionAlojamiento; editar: boolean } | null>(null);
  const lista = CIUDADES.filter((c) => ciudades.includes(c));

  return (
    <div className="space-y-6">
      <p className="text-[14px] text-muted">{NOTA_PRECIOS_ALOJAMIENTO}</p>
      {lista.map((c) => {
        const deCiudad = opciones.filter((o) => o.ciudad === c);
        if (!deCiudad.length) return null;
        return <Ciudad key={c} ciudad={c} opciones={deCiudad} onReservar={(op, editar) => setForm({ op, editar })} />;
      })}

      <Sheet
        open={!!form}
        onClose={() => setForm(null)}
        title={form?.editar ? `Reserva · ${form.op.nombre}` : `Reservé ${form?.op.nombre ?? ''}`}
      >
        {form && (
          <ReservaForm
            key={form.op.id}
            inicial={form.op.reserva}
            conCheckout
            monedaDefault="USD"
            checkInDefault={form.op.desde}
            checkOutDefault={masUno(form.op.hasta)}
            textoGuardar={form.editar ? 'Guardar' : 'Confirmar reserva'}
            onCancelar={() => setForm(null)}
            onGuardar={async (r) => {
              if (form.editar) {
                await editarReserva(form.op.id, r);
                toast('Reserva actualizada');
              } else {
                const auto = await reservar(form.op.id, r);
                toast(
                  auto.length
                    ? `Reservado. También marqué como hecho: ${auto.join(', ')}`
                    : 'Reservado. Las otras opciones quedan en “Ver descartadas”',
                  { duration: 5000 },
                );
              }
              setForm(null);
            }}
          />
        )}
      </Sheet>
    </div>
  );
}

function Ciudad({
  ciudad,
  opciones,
  onReservar,
}: {
  ciudad: CiudadAlojamiento;
  opciones: OpcionAlojamiento[];
  onReservar: (op: OpcionAlojamiento, editar: boolean) => void;
}) {
  const [verDescartadas, setVerDescartadas] = useState(false);
  const { visibles, descartadas } = opcionesVisibles(opciones);
  const hayReserva = visibles[0]?.estado === 'reservado';

  return (
    <section aria-labelledby={`aloj-${ciudad}`}>
      <h2 id={`aloj-${ciudad}`} className="flex items-baseline gap-2 font-display text-xl font-semibold">
        {ciudad}
        <span className="font-sans text-[14px] font-normal text-muted">{opciones[0].noches}</span>
      </h2>
      <div className="mt-2 space-y-3">
        {visibles.map((o) => (
          <OpcionCard key={o.id} o={o} onReservar={() => onReservar(o, o.estado === 'reservado')} />
        ))}
      </div>

      {descartadas.length > 0 && (
        <div className="mt-2">
          <button
            type="button"
            aria-expanded={verDescartadas}
            onClick={() => setVerDescartadas((v) => !v)}
            className="flex min-h-11 items-center gap-1 rounded-full px-2 text-[15px] font-semibold text-muted active:bg-sunken"
          >
            <ChevronDown size={18} className={cx('transition-transform', verDescartadas && 'rotate-180')} aria-hidden="true" />
            {verDescartadas ? 'Esconder' : 'Ver'} opciones descartadas ({descartadas.length})
          </button>
          {verDescartadas && (
            <div className="mt-2 animate-rise space-y-3 opacity-80">
              {descartadas.map((o) => (
                <OpcionCard key={o.id} o={o} onReservar={() => onReservar(o, false)} />
              ))}
              {hayReserva && (
                <button
                  type="button"
                  onClick={() =>
                    void cancelarReserva(ciudad).then(() => toast(`Reserva de ${ciudad} cancelada: vuelven las 3 opciones`))
                  }
                  className="min-h-11 w-full rounded-full border-2 border-rojo font-semibold text-rojo active:bg-rojo-soft"
                >
                  Cancelar la reserva y volver a las opciones
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function OpcionCard({ o, onReservar }: { o: OpcionAlojamiento; onReservar: () => void }) {
  const reservado = o.estado === 'reservado';
  return (
    <article className={cx('card p-4', reservado && 'ring-2 ring-verde')}>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap gap-1.5">
            {reservado && <Chip tono="verde">reservado</Chip>}
            {!reservado && o.recomendado && (
              <Chip tono="rosa">
                <Star size={12} aria-hidden="true" /> recomendado
              </Chip>
            )}
          </p>
          <h3 className="mt-1 text-[17px] leading-snug font-semibold">{o.nombre}</h3>
          <p className="text-[15px] text-muted">{o.ubicacion}</p>
        </div>
        <a
          href={mapsUrl(o.direccion)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir ${o.nombre} en Maps`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-azul-soft text-azul active:opacity-70"
        >
          <ExternalLink size={18} aria-hidden="true" />
        </a>
      </div>

      {reservado && o.reserva && <DatosReserva r={o.reserva} />}

      {!reservado && (
        <dl className="mt-2 grid grid-cols-2 gap-2 text-[15px]">
          <div className="rounded-xl bg-sunken p-2">
            <dt className="text-[13px] text-muted">Dormitorio / noche</dt>
            <dd className="font-semibold">{o.precioDorm}</dd>
          </div>
          <div className="rounded-xl bg-sunken p-2">
            <dt className="text-[13px] text-muted">Puntaje</dt>
            <dd className="font-semibold">{o.puntaje}</dd>
          </div>
        </dl>
      )}
      <p className="mt-2 text-[15px] leading-snug">{o.notas}</p>
      {!reservado && <p className="mt-1 text-[14px] text-muted">Privada: {o.precioPrivada}</p>}

      <button
        type="button"
        onClick={onReservar}
        className={cx(
          'mt-3 min-h-12 w-full rounded-full font-semibold active:opacity-80',
          reservado ? 'bg-sunken text-fg' : 'bg-verde text-white',
        )}
      >
        {reservado ? 'Editar datos de la reserva' : 'Reservé esta'}
      </button>
    </article>
  );
}
