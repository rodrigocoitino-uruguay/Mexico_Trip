import { Plane } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui/Chip';
import { ConUSD } from '../../components/ui/Montos';
import { Sheet } from '../../components/ui/Sheet';
import { comprarItem, descomprarItem } from '../../db/reservas';
import type { Tramo, Vuelo } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { toast } from '../../store/toast';
import { DatosReserva, ReservaForm } from './ReservaForm';

type Item = { tabla: 'vuelos'; v: Vuelo } | { tabla: 'tramos'; v: Tramo };

export function Transporte({ vuelos, tramos }: { vuelos: Vuelo[]; tramos: Tramo[] }) {
  const [form, setForm] = useState<Item | null>(null);
  const nombre = (i: Item) => (i.tabla === 'vuelos' ? `${i.v.origenCodigo} → ${i.v.destinoCodigo}` : i.v.nombre);

  const deshacer = (i: Item) =>
    void descomprarItem(i.tabla, i.v.id).then(() => toast(`${nombre(i)}: vuelve a pendiente`));

  return (
    <div className="space-y-6">
      {vuelos.length > 0 && (
        <section aria-labelledby="vuelos" className="space-y-3">
          <h2 id="vuelos" className="font-display text-xl font-semibold">
            Vuelos
          </h2>
          {vuelos.map((v) => (
            <BoardingPass
              key={v.id}
              v={v}
              onComprar={() => setForm({ tabla: 'vuelos', v })}
              onDeshacer={() => deshacer({ tabla: 'vuelos', v })}
            />
          ))}
        </section>
      )}

      {tramos.length > 0 && (
        <section aria-labelledby="tramos" className="space-y-3">
          <h2 id="tramos" className="font-display text-xl font-semibold">
            Tramos
          </h2>
          {tramos.map((t) => (
            <TramoCard
              key={t.id}
              t={t}
              onComprar={() => setForm({ tabla: 'tramos', v: t })}
              onDeshacer={() => deshacer({ tabla: 'tramos', v: t })}
            />
          ))}
        </section>
      )}

      <Sheet open={!!form} onClose={() => setForm(null)} title={form ? `Lo compré · ${nombre(form)}` : 'Lo compré'}>
        {form && (
          <ReservaForm
            key={form.v.id}
            inicial={form.v.reserva}
            conCheckout={false}
            monedaDefault="MXN"
            checkInDefault={form.v.fecha}
            textoGuardar="Guardar"
            onCancelar={() => setForm(null)}
            onGuardar={async (r) => {
              const auto = await comprarItem(form.tabla, form.v.id, r);
              toast(auto.length ? `Listo. También marqué como hecho: ${auto.join(', ')}` : 'Marcado como comprado', {
                duration: 5000,
              });
              setForm(null);
            }}
          />
        )}
      </Sheet>
    </div>
  );
}

function BoardingPass({ v, onComprar, onDeshacer }: { v: Vuelo; onComprar: () => void; onDeshacer: () => void }) {
  const comprado = v.estado === 'comprado';
  return (
    <article className="card overflow-hidden">
      <div className="flex items-center justify-between bg-azul px-4 py-2 text-white">
        <span className="font-semibold">{v.aerolinea}</span>
        <span className="text-[14px] opacity-90">{diaCorto(v.fecha)}</span>
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 pt-3">
        <div>
          <p className="font-display text-[30px] leading-none font-semibold text-azul">{v.origenCodigo}</p>
          <p className="mt-1 text-[13px] text-muted">{v.origen}</p>
          <p className="mt-1 font-semibold tabular">{v.salida}</p>
        </div>
        <div className="flex flex-col items-center text-muted">
          <Plane size={20} className="text-azul" aria-hidden="true" />
          <span className="mt-1 text-[12px] whitespace-nowrap">{v.duracion}</span>
        </div>
        <div className="text-right">
          <p className="font-display text-[30px] leading-none font-semibold text-azul">{v.destinoCodigo}</p>
          <p className="mt-1 text-[13px] text-muted">{v.destino}</p>
          <p className="mt-1 font-semibold tabular">
            {v.llegada}
            {v.llegadaFecha && <span className="ml-1 text-[13px] font-normal text-muted">({diaCorto(v.llegadaFecha)})</span>}
          </p>
        </div>
      </div>
      {/* Línea punteada tipo talón */}
      <div aria-hidden="true" className="mx-4 my-3 border-t-2 border-dashed border-line" />
      <dl className="grid grid-cols-2 gap-x-3 gap-y-1 px-4 text-[14px]">
        <div>
          <dt className="text-muted">Escala</dt>
          <dd className="font-medium">{v.escala}</dd>
        </div>
        <div>
          <dt className="text-muted">Tarifa</dt>
          <dd className="font-medium">{v.tarifa}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted">Equipaje</dt>
          <dd className="font-medium">{v.equipaje}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted">Costo</dt>
          <dd className="font-medium">
            <ConUSD texto={v.costo} />
          </dd>
        </div>
      </dl>
      <div className="px-4 pt-2 pb-4">
        <p className="text-[14px] leading-snug text-muted">{v.notas}</p>
        {comprado && v.reserva && <DatosReserva r={v.reserva} />}
        <div className="mt-3 flex items-center gap-2">
          {comprado ? <Chip tono="verde">comprado</Chip> : <Chip tono="cempa">pendiente</Chip>}
          {v.pagaEmpresa && <Chip tono="azul">paga la empresa</Chip>}
        </div>
        {v.modificable && (
          <BotonesCompra comprado={comprado} onComprar={onComprar} onDeshacer={onDeshacer} />
        )}
        {!v.modificable && (
          <button
            type="button"
            onClick={onComprar}
            className="mt-3 min-h-11 w-full rounded-full bg-sunken font-semibold active:opacity-70"
          >
            {v.reserva ? 'Editar código y notas' : 'Agregar código y notas'}
          </button>
        )}
      </div>
    </article>
  );
}

function TramoCard({ t, onComprar, onDeshacer }: { t: Tramo; onComprar: () => void; onDeshacer: () => void }) {
  const comprado = t.estado === 'comprado';
  return (
    <article className={cx('card p-4', comprado && 'ring-2 ring-verde')}>
      <p className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
        {t.fecha && <span>{diaCorto(t.fecha)}</span>}
        {comprado && <Chip tono="verde">comprado</Chip>}
      </p>
      <h3 className="text-[17px] leading-snug font-semibold">{t.nombre}</h3>
      <p className="mt-2 rounded-xl bg-azul-soft/60 p-2 text-[15px] leading-snug">
        <span className="font-semibold text-azul">Recomendado: </span>
        {t.recomendada}
      </p>
      <dl className="mt-2 space-y-1 text-[14px] leading-snug">
        <div>
          <dt className="inline text-muted">Opciones: </dt>
          <dd className="inline">{t.opciones}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Costo: </dt>
          <dd className="inline">
            <ConUSD texto={t.costo} />
          </dd>
        </div>
        {t.duracion && (
          <div>
            <dt className="inline text-muted">Duración: </dt>
            <dd className="inline">{t.duracion}</dd>
          </div>
        )}
      </dl>
      {comprado && t.reserva && <DatosReserva r={t.reserva} />}
      {/* Los tramos sin fecha (moverse dentro de CDMX) no se compran. */}
      {t.fecha && <BotonesCompra comprado={comprado} onComprar={onComprar} onDeshacer={onDeshacer} />}
    </article>
  );
}

function BotonesCompra({
  comprado,
  onComprar,
  onDeshacer,
}: {
  comprado: boolean;
  onComprar: () => void;
  onDeshacer: () => void;
}) {
  return comprado ? (
    <div className="mt-3 flex gap-2">
      <button type="button" onClick={onComprar} className="min-h-11 flex-1 rounded-full bg-sunken font-semibold active:opacity-70">
        Editar datos
      </button>
      <button type="button" onClick={onDeshacer} className="min-h-11 flex-1 rounded-full font-semibold text-rojo active:bg-rojo-soft">
        No lo compré
      </button>
    </div>
  ) : (
    <button type="button" onClick={onComprar} className="mt-3 min-h-12 w-full rounded-full bg-verde font-semibold text-white active:opacity-80">
      Lo compré
    </button>
  );
}
