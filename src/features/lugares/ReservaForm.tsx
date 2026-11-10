import { useId, useState, type FormEvent } from 'react';
import { linkSeguro } from '../../domain/reservas';
import type { Moneda, Reserva } from '../../domain/types';
import { montoInput, parseMonto } from '../../lib/numeros';

interface Props {
  inicial?: Reserva;
  /** Hostels: check-in y check-out. Tramos y vuelos: solo fecha. */
  conCheckout: boolean;
  monedaDefault: Moneda;
  checkInDefault?: string;
  checkOutDefault?: string;
  textoGuardar: string;
  onGuardar: (r: Reserva) => void | Promise<void>;
  onCancelar: () => void;
}

const campo = 'min-h-12 w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa';

/** Datos de la reserva: todos opcionales, se pueden completar después. */
export function ReservaForm(p: Props) {
  const id = useId();
  const i = p.inicial ?? {};
  const [codigo, setCodigo] = useState(i.codigo ?? '');
  const [checkIn, setCheckIn] = useState(i.checkIn ?? p.checkInDefault ?? '');
  const [checkOut, setCheckOut] = useState(i.checkOut ?? p.checkOutDefault ?? '');
  const [precio, setPrecio] = useState(montoInput(i.precioPagado));
  const [moneda, setMoneda] = useState<Moneda>(i.moneda ?? p.monedaDefault);
  const [link, setLink] = useState(i.link ?? '');
  const [notas, setNotas] = useState(i.notas ?? '');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const precioPagado = parseMonto(precio);
    if (precio.trim() && precioPagado === undefined) return setError('El precio tiene que ser un número.');
    if (link.trim() && !linkSeguro(link)) return setError('Ese link no parece una dirección web.');
    if (p.conCheckout && checkIn && checkOut && checkOut <= checkIn) return setError('El check-out tiene que ser después del check-in.');
    void p.onGuardar({
      codigo,
      checkIn: checkIn || undefined,
      checkOut: p.conCheckout ? checkOut || undefined : undefined,
      precioPagado,
      moneda: precioPagado !== undefined ? moneda : undefined,
      link,
      notas,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <p className="text-[15px] text-muted">Todo es opcional: podés completarlo después.</p>
      <div>
        <label htmlFor={`${id}-cod`} className="mb-1 block text-sm font-semibold">
          Código de reserva
        </label>
        <input id={`${id}-cod`} value={codigo} onChange={(e) => setCodigo(e.target.value)} autoComplete="off" className={campo} />
      </div>
      <div className={p.conCheckout ? 'grid grid-cols-2 gap-3' : ''}>
        <div>
          <label htmlFor={`${id}-in`} className="mb-1 block text-sm font-semibold">
            {p.conCheckout ? 'Check-in' : 'Fecha'}
          </label>
          <input id={`${id}-in`} type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className={campo} />
        </div>
        {p.conCheckout && (
          <div>
            <label htmlFor={`${id}-out`} className="mb-1 block text-sm font-semibold">
              Check-out
            </label>
            <input id={`${id}-out`} type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className={campo} />
          </div>
        )}
      </div>
      <div className="grid grid-cols-[1fr_6.5rem] gap-3">
        <div>
          <label htmlFor={`${id}-precio`} className="mb-1 block text-sm font-semibold">
            Precio pagado
          </label>
          <input
            id={`${id}-precio`}
            inputMode="decimal"
            value={precio}
            onChange={(e) => {
              setPrecio(e.target.value);
              setError(null);
            }}
            className={`${campo} tabular`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-mon`} className="mb-1 block text-sm font-semibold">
            Moneda
          </label>
          <select id={`${id}-mon`} value={moneda} onChange={(e) => setMoneda(e.target.value as Moneda)} className={campo}>
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-link`} className="mb-1 block text-sm font-semibold">
          Link de la reserva
        </label>
        <input
          id={`${id}-link`}
          type="url"
          inputMode="url"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setError(null);
          }}
          placeholder="https://…"
          className={campo}
        />
      </div>
      <div>
        <label htmlFor={`${id}-notas`} className="mb-1 block text-sm font-semibold">
          Notas
        </label>
        <textarea
          id={`${id}-notas`}
          value={notas}
          rows={2}
          onChange={(e) => setNotas(e.target.value)}
          className="w-full rounded-xl border border-line bg-surface px-3 py-2 outline-none focus:border-rosa"
        />
      </div>
      {error && (
        <p role="alert" className="font-medium text-rojo">
          {error}
        </p>
      )}
      <div className="flex gap-2">
        <button type="button" onClick={p.onCancelar} className="min-h-12 flex-1 rounded-full bg-sunken font-semibold active:opacity-70">
          Cancelar
        </button>
        <button type="submit" className="min-h-12 flex-1 rounded-full bg-verde px-4 font-semibold text-white active:opacity-80">
          {p.textoGuardar}
        </button>
      </div>
    </form>
  );
}

/** Datos de una reserva ya hecha, compactos. */
export function DatosReserva({ r }: { r: Reserva }) {
  const filas: [string, string][] = [];
  if (r.codigo) filas.push(['Código', r.codigo]);
  if (r.checkIn && r.checkOut) filas.push(['Fechas', `${fecha(r.checkIn)} → ${fecha(r.checkOut)}`]);
  else if (r.checkIn) filas.push(['Fecha', fecha(r.checkIn)]);
  if (r.precioPagado !== undefined) filas.push(['Pagaste', `${r.moneda ?? ''} ${montoInput(r.precioPagado)}`.trim()]);
  if (r.notas) filas.push(['Notas', r.notas]);
  const link = linkSeguro(r.link);
  if (!filas.length && !link) return null;
  return (
    <dl className="mt-2 space-y-1 rounded-xl bg-verde-soft/60 p-3 text-[15px]">
      {filas.map(([k, v]) => (
        <div key={k} className="flex gap-2">
          <dt className="shrink-0 text-muted">{k}:</dt>
          <dd className="min-w-0 font-medium break-words select-text">{v}</dd>
        </div>
      ))}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block min-h-11 py-2 font-semibold text-azul underline">
          Abrir la reserva
        </a>
      )}
    </dl>
  );
}

function fecha(iso: string) {
  const [, m, d] = iso.split('-');
  return `${Number(d)}/${Number(m)}`;
}
