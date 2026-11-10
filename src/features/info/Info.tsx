import { useLiveQuery } from 'dexie-react-hooks';
import {
  Backpack,
  Banknote,
  CalendarX,
  ChevronDown,
  Clock,
  HeartPulse,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Stamp,
  Wifi,
  type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import { ConUSD } from '../../components/ui/Montos';
import { Sheet } from '../../components/ui/Sheet';
import { RESUMEN } from '../../data/seed';
import { db } from '../../db/db';
import { editarContacto } from '../../db/pendientes';
import { linkSeguro } from '../../domain/reservas';
import type { Contacto } from '../../domain/types';
import { cx } from '../../lib/cx';
import { toast } from '../../store/toast';

const ICONOS: Record<string, LucideIcon> = {
  stamp: Stamp,
  banknote: Banknote,
  wifi: Wifi,
  'shield-check': ShieldCheck,
  'heart-pulse': HeartPulse,
  backpack: Backpack,
  'calendar-x': CalendarX,
};

export function Info() {
  const secciones = useLiveQuery(() => db.info.toArray(), []);
  const contactos = useLiveQuery(() => db.contactos.toArray(), []);
  if (!secciones || !contactos) return null;
  return (
    <div className="mx-auto max-w-2xl space-y-3">
      <p className="card flex gap-3 p-4 text-[15px] leading-snug">
        <Clock size={20} className="mt-0.5 shrink-0 text-azul" aria-hidden="true" />
        {RESUMEN.zonasHorarias}
      </p>
      {[...secciones]
        .sort((a, b) => a.orden - b.orden)
        .map((s) => {
          const Icon = ICONOS[s.icono] ?? Stamp;
          return (
            <details key={s.id} className="card group overflow-hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 [&::-webkit-details-marker]:hidden">
                <Icon size={20} className="shrink-0 text-rosa" aria-hidden="true" />
                <span className="flex-1 font-semibold">{s.titulo}</span>
                <ChevronDown size={18} className="text-muted transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <ul className="space-y-2 px-4 pb-4 text-[15px] leading-snug">
                {s.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span aria-hidden="true" className="text-cempa">•</span>
                    <span>
                      <ConUSD texto={it} />
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          );
        })}
      <Contactos contactos={contactos} />
    </div>
  );
}

function Contactos({ contactos }: { contactos: Contacto[] }) {
  const [editando, setEditando] = useState<Contacto | null>(null);
  return (
    <section aria-labelledby="contactos" className="pt-3">
      <h2 id="contactos" className="font-display text-xl font-semibold">
        Contactos
      </h2>
      <ul className="card mt-2 divide-y divide-line overflow-hidden">
        {[...contactos]
          .sort((a, b) => a.orden - b.orden)
          .map((c) => {
            const web = linkSeguro(c.web);
            return (
              <li key={c.id} className="flex items-center gap-2 py-2 pr-2 pl-4">
                <div className="min-w-0 flex-1 leading-snug">
                  <p className="font-medium">{c.nombre}</p>
                  <p className="text-[14px] text-muted">{c.rol}</p>
                  {c.notas && <p className="text-[14px]">{c.notas}</p>}
                  {web && (
                    <a href={web} target="_blank" rel="noopener noreferrer" className="text-[14px] break-all text-azul underline">
                      {c.web}
                    </a>
                  )}
                </div>
                {c.telefono && (
                  <a
                    href={`tel:${c.telefono.replace(/[^\d+]/g, '')}`}
                    aria-label={`Llamar a ${c.nombre}`}
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-verde-soft text-verde"
                  >
                    <Phone size={18} aria-hidden="true" />
                  </a>
                )}
                {c.email && (
                  <a
                    href={`mailto:${c.email}`}
                    aria-label={`Escribir a ${c.nombre}`}
                    className="grid size-11 shrink-0 place-items-center rounded-full bg-azul-soft text-azul"
                  >
                    <Mail size={18} aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setEditando(c)}
                  aria-label={`Editar ${c.nombre}`}
                  className="grid size-11 shrink-0 place-items-center rounded-full text-muted active:bg-sunken"
                >
                  <Pencil size={17} aria-hidden="true" />
                </button>
              </li>
            );
          })}
      </ul>
      <Sheet open={!!editando} onClose={() => setEditando(null)} title={editando?.nombre ?? 'Contacto'}>
        {editando && <ContactoForm key={editando.id} c={editando} onListo={() => setEditando(null)} />}
      </Sheet>
    </section>
  );
}

function ContactoForm({ c, onListo }: { c: Contacto; onListo: () => void }) {
  const [v, setV] = useState({
    nombre: c.nombre,
    telefono: c.telefono ?? '',
    email: c.email ?? '',
    web: c.web ?? '',
    notas: c.notas ?? '',
  });
  const [error, setError] = useState<string | null>(null);
  const campo = 'min-h-12 w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa';
  const filas: { k: keyof typeof v; label: string; type?: string; mode?: 'tel' | 'email' | 'url' }[] = [
    { k: 'nombre', label: 'Nombre' },
    { k: 'telefono', label: 'Teléfono', type: 'tel', mode: 'tel' },
    { k: 'email', label: 'Email', type: 'email', mode: 'email' },
    { k: 'web', label: 'Web', type: 'url', mode: 'url' },
    { k: 'notas', label: 'Notas' },
  ];
  return (
    <form
      className="space-y-3"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!v.nombre.trim()) return setError('Poné un nombre.');
        if (v.web.trim() && !linkSeguro(v.web)) return setError('La web no parece una dirección válida.');
        void editarContacto(c.id, v).then(() => {
          toast('Contacto guardado');
          onListo();
        });
      }}
    >
      {filas.map((f) => (
        <div key={f.k}>
          <label htmlFor={`ct-${f.k}`} className="mb-1 block text-sm font-semibold">
            {f.label}
          </label>
          <input
            id={`ct-${f.k}`}
            type={f.type ?? 'text'}
            inputMode={f.mode}
            value={v[f.k]}
            onChange={(e) => {
              setV({ ...v, [f.k]: e.target.value });
              setError(null);
            }}
            className={campo}
          />
        </div>
      ))}
      {error && (
        <p role="alert" className="font-medium text-rojo">
          {error}
        </p>
      )}
      <button type="submit" className={cx('min-h-12 w-full rounded-full bg-rosa-ink font-semibold text-white active:opacity-80')}>
        Guardar
      </button>
    </form>
  );
}

export function PlanB() {
  const items = useLiveQuery(() => db.planB.toArray(), []);
  if (!items) return null;
  return (
    <ul className="mx-auto grid max-w-3xl gap-3 lg:grid-cols-2">
      {[...items]
        .sort((a, b) => a.orden - b.orden)
        .map((p) => (
          <li key={p.id} className="card p-4">
            <p className="text-[13px] font-semibold tracking-wide text-rojo uppercase">Si pasa esto</p>
            <p className="font-semibold leading-snug">{p.si}</p>
            <p className="mt-2 text-[13px] font-semibold tracking-wide text-verde uppercase">Hacé esto</p>
            <p className="leading-snug">
              <ConUSD texto={p.entonces} />
            </p>
          </li>
        ))}
    </ul>
  );
}
