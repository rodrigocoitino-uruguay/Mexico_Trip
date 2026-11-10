import { useLiveQuery } from 'dexie-react-hooks';
import { Download, FileSpreadsheet, Trash2 } from 'lucide-react';
import { useId, useState, type FormEvent } from 'react';
import { MontoMXN, useTipoCambio } from '../../components/ui/Montos';
import { PRESUPUESTO } from '../../data/seed';
import { db } from '../../db/db';
import { agregarGasto, borrarGasto, deshacerBorradoGasto } from '../../db/gastos';
import {
  CATEGORIAS_GASTO,
  gastosACsv,
  respaldoParaFinanzas,
  totales,
  unificarGastos,
  type GastoUnificado,
} from '../../domain/presupuesto';
import { fechaEnZona, momentoViaje } from '../../domain/tiempo';
import type { CategoriaGasto, Moneda } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { saveFile } from '../../lib/files';
import { parseMonto } from '../../lib/numeros';
import { useAhora } from '../../lib/reloj';
import { toast } from '../../store/toast';
import { useUI } from '../../store/ui';

const P = PRESUPUESTO;
const usd0 = (n: number) => `USD ${Math.round(n).toLocaleString('es-UY')}`;

export function Presupuesto() {
  const gastos = useLiveQuery(() => db.gastos.toArray(), []);
  const actividades = useLiveQuery(() => db.actividades.toArray(), []);
  const dias = useLiveQuery(() => db.dias.orderBy('id').toArray(), []);
  const tc = useTipoCambio();
  const now = useAhora();
  if (!gastos || !actividades || !dias) return null;

  const items = unificarGastos(gastos, actividades, tc);
  const t = totales(items);
  const { hoyId } = momentoViaje(dias, now);
  const fechaDefault = hoyId ?? fechaEnZona(now, 'America/Montevideo');

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <Tope gastadoUSD={t.usd} />
      <CargaRapida fechaDefault={fechaDefault} />
      <PorCategoria porCategoria={t.porCategoriaUSD} />
      <PorDia dias={dias.filter((d) => d.costoCentralMXN !== undefined)} porDia={t.porDiaMXN} />
      <ListaGastos items={items} />
      <Escenarios />
      <Margen />
      <Exportar items={items} />
    </div>
  );
}

function Tope({ gastadoUSD }: { gastadoUSD: number }) {
  const pct = Math.min(100, (gastadoUSD / P.topeUSD) * 100);
  const color = gastadoUSD > P.topeUSD ? 'bg-rojo' : pct >= 80 ? 'bg-cempa' : 'bg-verde';
  const queda = P.topeUSD - gastadoUSD;
  return (
    <section className="card p-4" aria-label="Gastado contra el tope">
      <p className="text-[15px] text-muted">Gastado</p>
      <p className="flex items-baseline gap-2">
        <span className="font-display text-[34px] leading-tight font-semibold tabular">{usd0(gastadoUSD)}</span>
        <span className="text-muted tabular">de {usd0(P.topeUSD)}</span>
      </p>
      <div
        className="mt-2 h-3 overflow-hidden rounded-full bg-sunken"
        role="progressbar"
        aria-label="Gastado contra el tope de USD 1.000"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
      >
        <div className={cx('h-full rounded-full transition-[width] duration-500', color)} style={{ width: `${pct}%` }} />
      </div>
      <p className={cx('mt-2 font-semibold tabular', queda < 0 ? 'text-rojo' : 'text-verde')}>
        {queda >= 0 ? `Te quedan ${usd0(queda)}` : `Te pasaste ${usd0(-queda)}`}
      </p>
      <p className="mt-1 text-[14px] text-muted">{P.notaTope}</p>
    </section>
  );
}

function CargaRapida({ fechaDefault }: { fechaDefault: string }) {
  const id = useId();
  const [monto, setMonto] = useState('');
  const [moneda, setMoneda] = useState<Moneda>('MXN');
  const [categoria, setCategoria] = useState<CategoriaGasto>('Comida');
  const [nota, setNota] = useState('');
  const [fecha, setFecha] = useState(fechaDefault);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const n = parseMonto(monto);
    if (!n) return setError('Escribí un monto.');
    await agregarGasto({ fecha: fecha || fechaDefault, categoria, monto: n, moneda, nota });
    setMonto('');
    setNota('');
    toast(`Gasto cargado: ${moneda} ${n.toLocaleString('es-UY')}`);
  };

  return (
    <form onSubmit={(e) => void submit(e)} className="card space-y-3 p-4" aria-label="Cargar un gasto" noValidate>
      <h2 className="font-display text-xl font-semibold">Cargar gasto</h2>
      <div className="flex gap-2">
        <label htmlFor={`${id}-m`} className="sr-only">
          Monto
        </label>
        <input
          id={`${id}-m`}
          inputMode="decimal"
          value={monto}
          onChange={(e) => {
            setMonto(e.target.value);
            setError(null);
          }}
          placeholder="0"
          className="min-h-14 min-w-0 flex-1 rounded-xl border border-line bg-surface px-3 text-[22px] font-semibold tabular outline-none focus:border-rosa"
        />
        <div role="radiogroup" aria-label="Moneda" className="grid grid-cols-2 rounded-xl bg-sunken p-1">
          {(['MXN', 'USD'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={moneda === m}
              onClick={() => setMoneda(m)}
              className={cx('min-h-11 rounded-lg px-3 font-semibold', moneda === m ? 'bg-surface shadow-sm' : 'text-muted')}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div role="radiogroup" aria-label="Categoría" className="flex flex-wrap gap-2">
        {CATEGORIAS_GASTO.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={categoria === c}
            onClick={() => setCategoria(c)}
            className={cx(
              'min-h-10 rounded-full border px-3 text-[15px] font-medium',
              categoria === c ? 'border-rosa bg-rosa-soft text-rosa-ink' : 'border-line text-fg',
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_9.5rem] gap-2">
        <div>
          <label htmlFor={`${id}-n`} className="sr-only">
            Nota
          </label>
          <input
            id={`${id}-n`}
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Nota (opcional)"
            className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa"
          />
        </div>
        <div>
          <label htmlFor={`${id}-f`} className="sr-only">
            Fecha
          </label>
          <input
            id={`${id}-f`}
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="min-h-12 w-full rounded-xl border border-line bg-surface px-2 outline-none focus:border-rosa"
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="font-medium text-rojo">
          {error}
        </p>
      )}
      <button type="submit" className="min-h-12 w-full rounded-full bg-rosa-ink font-semibold text-white active:opacity-80">
        Agregar gasto
      </button>
    </form>
  );
}

function PorCategoria({ porCategoria }: { porCategoria: Record<CategoriaGasto, number> }) {
  return (
    <section className="card p-4" aria-labelledby="por-cat">
      <h2 id="por-cat" className="font-display text-xl font-semibold">
        Por categoría
      </h2>
      <p className="text-[14px] text-muted">Gastado contra el central de la semana del 12 al 20/2</p>
      <ul className="mt-3 space-y-3">
        {P.semana.map((f) => {
          const real = porCategoria[f.categoria];
          const pct = Math.min(100, (real / f.central) * 100);
          return (
            <li key={f.categoria}>
              <p className="flex items-baseline justify-between text-[15px]">
                <span className="font-medium">{f.categoria}</span>
                <span className="tabular">
                  <span className={cx('font-semibold', real > f.central && 'text-rojo')}>{usd0(real)}</span>
                  <span className="text-muted"> / {usd0(f.central)}</span>
                </span>
              </p>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-sunken">
                <div className={cx('h-full rounded-full', real > f.central ? 'bg-rojo' : 'bg-rosa')} style={{ width: `${pct}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function PorDia({ dias, porDia }: { dias: { id: string; fecha: string; ciudad: string; costoCentralMXN?: number }[]; porDia: Record<string, number> }) {
  const verDia = useUI((s) => s.verDia);
  return (
    <section className="card p-4" aria-labelledby="por-dia">
      <h2 id="por-dia" className="font-display text-xl font-semibold">
        Por día
      </h2>
      <ul className="mt-2 divide-y divide-line">
        {dias.map((d) => {
          const real = porDia[d.id] ?? 0;
          const central = d.costoCentralMXN ?? 0;
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => verDia(d.id)}
                className="flex min-h-12 w-full items-center justify-between gap-2 py-1 text-left active:bg-sunken"
              >
                <span className="font-medium">{diaCorto(d.fecha)}</span>
                <span className="text-right text-[15px] tabular">
                  <span className={cx('font-semibold', real > central && 'text-rojo', !real && 'text-muted')}>
                    {real ? <MontoMXN valor={real} /> : '—'}
                  </span>
                  <span className="block text-[13px] text-muted">est. MXN {central.toLocaleString('es-UY')}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ListaGastos({ items }: { items: GastoUnificado[] }) {
  const verDia = useUI((s) => s.verDia);
  if (!items.length) return null;
  const borrar = async (id: string) => {
    const g = await borrarGasto(id);
    if (g) toast('Gasto borrado', { actionLabel: 'Deshacer', onAction: () => void deshacerBorradoGasto(g), duration: 6000 });
  };
  return (
    <section className="card p-4" aria-labelledby="lista-gastos">
      <h2 id="lista-gastos" className="font-display text-xl font-semibold">
        Gastos cargados
      </h2>
      <ul className="mt-2 divide-y divide-line">
        {[...items].reverse().map((g) => (
          <li key={`${g.origen}-${g.id}`} className="flex items-center gap-2 py-2">
            <div className="min-w-0 flex-1 leading-snug">
              <p className="truncate font-medium">{g.nota || g.categoria}</p>
              <p className="text-[13px] text-muted">
                {diaCorto(g.fecha)} · {g.categoria}
                {g.origen === 'actividad' && ' · de una actividad'}
              </p>
            </div>
            <span className="shrink-0 text-right font-semibold tabular">
              {g.moneda} {g.monto.toLocaleString('es-UY')}
              <span className="block text-[12px] font-normal text-muted">≈ USD {g.usd.toLocaleString('es-UY')}</span>
            </span>
            {g.origen === 'gasto' ? (
              <button
                type="button"
                onClick={() => void borrar(g.id)}
                aria-label={`Borrar gasto ${g.nota || g.categoria}`}
                className="grid size-11 shrink-0 place-items-center rounded-full text-muted active:bg-rojo-soft active:text-rojo"
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => verDia(g.fecha)}
                aria-label="Ver la actividad en su día"
                className="grid size-11 shrink-0 place-items-center rounded-full text-rosa-ink active:bg-sunken"
              >
                →
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Escenarios() {
  const filas: [string, { bajo: number; central: number; alto: number }, boolean?][] = [
    ...P.semana.map((f) => [f.etiqueta, f] as [string, typeof f]),
    ['Total semana', P.totalSemana, true],
    ['Del 20/2 en adelante', { bajo: P.subtotalDespuesUSD, central: P.subtotalDespuesUSD, alto: P.subtotalDespuesUSD }],
    ['Total del viaje', P.totalViaje, true],
    ['Si la empresa cubre la noche del 26/2', P.totalViajeSinNoche26],
  ];
  return (
    <section className="card p-4" aria-labelledby="escenarios">
      <h2 id="escenarios" className="font-display text-xl font-semibold">
        Escenarios (USD)
      </h2>
      <div className="-mx-2 mt-2 overflow-x-auto">
        <table className="w-full text-[14px]">
          <thead>
            <tr className="text-muted">
              <th className="px-2 py-1 text-left font-medium" />
              <th className="px-2 py-1 text-right font-medium">Bajo</th>
              <th className="bg-rosa-soft/60 px-2 py-1 text-right font-semibold text-rosa-ink">Central</th>
              <th className="px-2 py-1 text-right font-medium">Alto</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {filas.map(([nombre, v, total]) => (
              <tr key={nombre} className={cx(total && 'font-semibold')}>
                <td className="px-2 py-1.5 leading-snug">{nombre}</td>
                <td className="px-2 py-1.5 text-right tabular">{v.bajo.toLocaleString('es-UY')}</td>
                <td className="bg-rosa-soft/60 px-2 py-1.5 text-right font-semibold tabular">{v.central.toLocaleString('es-UY')}</td>
                <td className={cx('px-2 py-1.5 text-right tabular', v.alto > P.topeUSD && 'text-rojo')}>
                  {v.alto.toLocaleString('es-UY')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 space-y-0.5 text-[14px] text-muted">
        {P.despues.map((d) => (
          <li key={d.concepto}>
            {d.concepto}: USD {d.usd}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Margen() {
  return (
    <section className="card space-y-3 p-4" aria-labelledby="margen">
      <h2 id="margen" className="font-display text-xl font-semibold">
        Margen y extras
      </h2>
      <ul className="space-y-1.5 text-[15px] leading-snug">
        {P.margen.map((m) => (
          <li key={m} className="flex gap-2">
            <span aria-hidden="true" className="text-cempa">•</span>
            {m}
          </li>
        ))}
      </ul>
      <div className="rounded-xl bg-azul-soft/60 p-3 text-[15px] leading-snug">
        <p className="font-semibold text-azul">Cómo se paga</p>
        {P.reglas.map((r) => (
          <p key={r}>{r}</p>
        ))}
      </div>
    </section>
  );
}

function Exportar({ items }: { items: GastoUnificado[] }) {
  const id = useId();
  const [uyu, setUyu] = useState('');
  const fecha = new Date().toISOString().slice(0, 10);

  const csv = async () => {
    const r = await saveFile(`mexico-2027-gastos-${fecha}.csv`, gastosACsv(items, P.categoriaFinanzas), 'text/csv');
    if (r !== 'cancelled') toast('CSV listo');
  };
  const finanzas = async () => {
    const rate = parseMonto(uyu);
    if (!rate || rate < 10 || rate > 200) {
      toast('Poné la cotización del dólar en pesos (por ejemplo 39,35)');
      return;
    }
    const f = respaldoParaFinanzas(items, P.categoriaFinanzas, rate);
    const r = await saveFile(`mexico-2027-para-finanzas-${fecha}.json`, JSON.stringify(f), 'application/json');
    if (r !== 'cancelled') toast('Archivo listo: en Finanzas, Ajustes → Respaldo → Importar → Combinar', { duration: 6000 });
  };

  return (
    <section className="card space-y-3 p-4" aria-labelledby="exportar">
      <h2 id="exportar" className="font-display text-xl font-semibold">
        Pasar los gastos a finanzas
      </h2>
      <p className="text-[15px] leading-snug text-muted">
        Van en la categoría "{P.categoriaFinanzas}", en dólares (finanzas maneja pesos y dólares). Importarlo de nuevo no
        duplica: actualiza lo que cambió.
      </p>
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <label htmlFor={`${id}-uyu`} className="mb-1 block text-sm font-semibold">
            Cotización del dólar (UYU)
          </label>
          <input
            id={`${id}-uyu`}
            inputMode="decimal"
            value={uyu}
            onChange={(e) => setUyu(e.target.value)}
            placeholder="39,35"
            className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 tabular outline-none focus:border-rosa"
          />
        </div>
        <button
          type="button"
          disabled={!items.length}
          onClick={() => void finanzas()}
          className="flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-rosa-ink px-4 font-semibold text-white active:opacity-80 disabled:opacity-40"
        >
          <Download size={18} aria-hidden="true" /> Para finanzas
        </button>
      </div>
      <p className="text-[13px] text-muted">
        Después, en finanzas, podés tocar la cotización → Recalcular para usar la del BROU de cada fecha.
      </p>
      <button
        type="button"
        disabled={!items.length}
        onClick={() => void csv()}
        className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sunken font-semibold active:opacity-70 disabled:opacity-40"
      >
        <FileSpreadsheet size={18} aria-hidden="true" /> Exportar CSV
      </button>
    </section>
  );
}
