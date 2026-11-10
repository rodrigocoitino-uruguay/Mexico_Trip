import { useLiveQuery } from 'dexie-react-hooks';
import { Search, X } from 'lucide-react';
import { RESUMEN } from '../../data/seed';
import { db } from '../../db/db';
import type { Ciudad, CiudadAlojamiento, Lugar, TipoLugar } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { coincide } from '../../lib/texto';
import { useUI, type SubLugares } from '../../store/ui';
import { Alojamiento } from './Alojamiento';
import { LugarCard } from './LugarCard';
import { Transporte } from './Transporte';

const SUBS: { id: SubLugares; label: string }[] = [
  { id: 'atraccion', label: 'Atracciones' },
  { id: 'comida', label: 'Comida' },
  { id: 'noche', label: 'Noche' },
  { id: 'alojamiento', label: 'Alojamiento' },
  { id: 'transporte', label: 'Transporte' },
];

const FILTROS: { id: string; label: string; ciudades: Ciudad[] }[] = [
  { id: 'todas', label: 'Todas', ciudades: [] },
  { id: 'CDMX', label: 'CDMX', ciudades: ['CDMX'] },
  { id: 'Mérida', label: 'Mérida', ciudades: ['Mérida'] },
  { id: 'Izamal', label: 'Izamal', ciudades: ['Izamal/Valladolid'] },
  { id: 'Valladolid', label: 'Valladolid', ciudades: ['Valladolid'] },
  { id: 'Cancún', label: 'Cancún y Cozumel', ciudades: ['Cancún', 'Cozumel'] },
];

export function Lugares() {
  const sub = useUI((s) => s.subLugares);
  const setSub = useUI((s) => s.setSubLugares);
  const q = useUI((s) => s.busquedaLugares);
  const setQ = useUI((s) => s.setBusquedaLugares);
  const filtro = useUI((s) => s.ciudadLugares);
  const setFiltro = useUI((s) => s.setCiudadLugares);

  const lugares = useLiveQuery(() => db.lugares.toArray(), []);
  const alojamientos = useLiveQuery(() => db.alojamientos.toArray(), []);
  const vuelos = useLiveQuery(() => db.vuelos.orderBy('id').toArray(), []);
  const tramos = useLiveQuery(() => db.tramos.toArray(), []);
  const dias = useLiveQuery(() => db.dias.toArray(), []);
  if (!lugares || !alojamientos || !vuelos || !tramos || !dias) return null;

  const ciudades = FILTROS.find((f) => f.id === filtro)?.ciudades ?? [];
  const enCiudad = (c: Ciudad | undefined) => !ciudades.length || (c !== undefined && ciudades.includes(c));
  const ciudadDeFecha = (f?: string) => dias.find((d) => d.id === f)?.ciudad;

  const deTipo = (t: TipoLugar) =>
    lugares
      .filter((l) => l.tipo === t && enCiudad(l.ciudad))
      .filter((l) => coincide(q, l.nombre, l.direccion, l.consejo, l.entrada, l.ciudad))
      .sort((a, b) => (a.diaIds[0] ?? '9').localeCompare(b.diaIds[0] ?? '9') || a.nombre.localeCompare(b.nombre));

  return (
    <div className="space-y-4">
      {/* Sub-pestañas */}
      <div role="tablist" aria-label="Tipo de lugar" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
        {SUBS.map((s) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={sub === s.id}
            onClick={() => setSub(s.id)}
            className={cx(
              'min-h-11 shrink-0 rounded-full px-4 font-semibold transition-colors',
              sub === s.id ? 'bg-fg text-bg' : 'bg-surface text-fg',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Buscador y ciudad */}
      <div className="space-y-2">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar"
            aria-label="Buscar lugares"
            className="min-h-12 w-full rounded-full border border-line bg-surface pr-11 pl-10 outline-none focus:border-rosa"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              aria-label="Borrar búsqueda"
              className="absolute top-1/2 right-1 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted"
            >
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4">
          {FILTROS.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
              className={cx(
                'min-h-9 shrink-0 rounded-full border px-3 text-[14px] font-medium',
                filtro === f.id ? 'border-rosa bg-rosa-soft text-rosa-ink' : 'border-line text-muted',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {sub === 'atraccion' && <ListaLugares lista={deTipo('atraccion')} />}

      {sub === 'comida' && (
        <>
          {!q && filtro === 'todas' && <Destacados />}
          <ListaLugares lista={deTipo('comida')} />
        </>
      )}

      {sub === 'noche' && <ListaLugares lista={deTipo('noche')} />}

      {sub === 'alojamiento' && (
        <Alojamiento
          opciones={alojamientos.filter((o) => coincide(q, o.nombre, o.ubicacion, o.notas))}
          ciudades={(ciudades.length ? ciudades : ['CDMX', 'Mérida', 'Valladolid']).filter(
            (c): c is CiudadAlojamiento => c === 'CDMX' || c === 'Mérida' || c === 'Valladolid',
          )}
        />
      )}

      {sub === 'transporte' && (
        <Transporte
          vuelos={vuelos.filter(
            (v) =>
              (!ciudades.length || enCiudad(ciudadDeFecha(v.fecha)) || ciudades.some((c) => coincide(c === 'CDMX' ? 'mexico' : c, v.destino, v.origen))) &&
              coincide(q, v.aerolinea, v.origen, v.destino, v.notas),
          )}
          tramos={tramos
            .filter((t) => !ciudades.length || (t.fecha ? enCiudad(ciudadDeFecha(t.fecha)) : ciudades.includes('CDMX')))
            .filter((t) => coincide(q, t.nombre, t.opciones, t.recomendada))
            .sort((a, b) => a.orden - b.orden)}
        />
      )}
    </div>
  );
}

function ListaLugares({ lista }: { lista: Lugar[] }) {
  if (!lista.length) return <p className="card p-5 text-center text-muted">No hay lugares con ese filtro.</p>;
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {lista.map((l) => (
        <LugarCard key={l.id} l={l} extra={l.id === 'l-oxman' ? `Por qué Oxmán: ${RESUMEN.porQueOxman}` : undefined} />
      ))}
    </div>
  );
}

/** Experiencias gastronómicas, noches memorables y cómo cuidar la panza. */
function Destacados() {
  const verDia = useUI((s) => s.verDia);
  const bloque = (titulo: string, items: typeof RESUMEN.nochesMemorables) => (
    <div>
      <h3 className="text-[15px] font-semibold text-muted">{titulo}</h3>
      <ul className="mt-1 space-y-1">
        {items.map((d) => (
          <li key={d.titulo}>
            <button
              type="button"
              onClick={() => verDia(d.diaId)}
              className="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl px-2 text-left active:bg-sunken"
            >
              <span className="font-medium">{d.titulo}</span>
              <span className="shrink-0 text-[14px] font-semibold text-rosa-ink">{diaCorto(d.diaId)} →</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="card space-y-3 p-4">
      {bloque('Experiencias gastronómicas', RESUMEN.experienciasGastronomicas)}
      {bloque('Noches memorables', RESUMEN.nochesMemorables)}
      <ul className="space-y-1 border-t border-line pt-3 text-[15px] leading-snug">
        {RESUMEN.comida.map((c) => (
          <li key={c} className="flex gap-2">
            <span aria-hidden="true" className="text-cempa">•</span>
            {c}
          </li>
        ))}
      </ul>
    </section>
  );
}
