import { useLiveQuery } from 'dexie-react-hooks';
import { Download, RotateCcw, Upload } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { Sheet } from '../../components/ui/Sheet';
import { PRESUPUESTO } from '../../data/seed';
import { db } from '../../db/db';
import { setAjustes } from '../../db/gastos';
import { exportarEstado, importarEstado } from '../../db/respaldo';
import { restaurarSeed } from '../../db/seed';
import { MAX_RESPALDO_BYTES } from '../../domain/respaldo';
import type { Ajustes as TAjustes } from '../../domain/types';
import { cx } from '../../lib/cx';
import { readFileText, saveFile } from '../../lib/files';
import { montoInput, parseMonto } from '../../lib/numeros';
import { toast } from '../../store/toast';

const TEMAS: { id: TAjustes['tema']; label: string }[] = [
  { id: 'sistema', label: 'Automático' },
  { id: 'claro', label: 'Claro' },
  { id: 'oscuro', label: 'Oscuro' },
];

export function Ajustes() {
  const ajustes = useLiveQuery(() => db.ajustes.get('ajustes'), []);
  const id = useId();
  const [tc, setTc] = useState('');
  const [confirmar, setConfirmar] = useState(false);
  const archivo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ajustes) setTc(montoInput(ajustes.tipoCambio));
  }, [ajustes?.tipoCambio]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!ajustes) return null;

  const guardarTc = () => {
    const n = parseMonto(tc);
    if (!n || n < 5 || n > 100) {
      toast('El tipo de cambio tiene que ser un número entre 5 y 100');
      setTc(montoInput(ajustes.tipoCambio));
      return;
    }
    if (n !== ajustes.tipoCambio) void setAjustes({ tipoCambio: n }).then(() => toast(`Tipo de cambio: ${montoInput(n)} MXN por USD`));
  };

  const exportar = async () => {
    const r = await saveFile(`mexico-2027-respaldo-${new Date().toISOString().slice(0, 10)}.json`, await exportarEstado(), 'application/json');
    if (r !== 'cancelled') toast('Respaldo listo');
  };

  const importar = async (f: File | undefined) => {
    if (!f) return;
    try {
      const r = await importarEstado(await readFileText(f, MAX_RESPALDO_BYTES));
      toast(`Importado: ${r.nuevos} nuevos, ${r.actualizados} actualizados, ${r.borrados} borrados`, { duration: 6000 });
    } catch (e) {
      toast(e instanceof Error ? e.message : 'No se pudo importar', { duration: 6000 });
    } finally {
      if (archivo.current) archivo.current.value = '';
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <section className="card space-y-2 p-4">
        <label htmlFor={`${id}-tc`} className="block font-semibold">
          Tipo de cambio (MXN por USD)
        </label>
        <input
          id={`${id}-tc`}
          inputMode="decimal"
          value={tc}
          onChange={(e) => setTc(e.target.value)}
          onBlur={guardarTc}
          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLInputElement).blur()}
          className="min-h-12 w-full rounded-xl border border-line bg-surface px-3 text-lg tabular outline-none focus:border-rosa"
        />
        <p className="text-[14px] text-muted">Por defecto {PRESUPUESTO.notaTipoCambio} Se usa para todos los "≈ USD".</p>
      </section>

      <section className="card p-4">
        <p className="mb-2 font-semibold">Tema</p>
        <div role="radiogroup" aria-label="Tema" className="grid grid-cols-3 gap-1 rounded-2xl bg-sunken p-1">
          {TEMAS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={ajustes.tema === t.id}
              onClick={() => void setAjustes({ tema: t.id })}
              className={cx('min-h-11 rounded-xl font-medium', ajustes.tema === t.id ? 'bg-surface shadow-sm' : 'text-muted')}
            >
              {t.label}
            </button>
          ))}
        </div>
      </section>

      <section className="card space-y-3 p-4" aria-labelledby="respaldo">
        <h2 id="respaldo" className="font-semibold">
          Respaldo y otros dispositivos
        </h2>
        <p className="text-[15px] leading-snug text-muted">
          Tus datos viven solo en este dispositivo. Para pasarlos a la compu (o al revés), exportá acá e importá allá: se
          combinan y de cada cosa queda el cambio más reciente.
        </p>
        <button
          type="button"
          onClick={() => void exportar()}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rosa-ink font-semibold text-white active:opacity-80"
        >
          <Download size={18} aria-hidden="true" /> Exportar todo (JSON)
        </button>
        <button
          type="button"
          onClick={() => archivo.current?.click()}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-sunken font-semibold active:opacity-70"
        >
          <Upload size={18} aria-hidden="true" /> Importar un respaldo
        </button>
        <input
          ref={archivo}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => void importar(e.target.files?.[0])}
        />
      </section>

      <section className="card p-4">
        <button
          type="button"
          onClick={() => setConfirmar(true)}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-rojo font-semibold text-rojo active:bg-rojo-soft"
        >
          <RotateCcw size={18} aria-hidden="true" /> Restaurar datos originales
        </button>
      </section>

      <Sheet open={confirmar} onClose={() => setConfirmar(false)} title="¿Restaurar los datos originales?">
        <p className="leading-snug">
          Se borra todo lo que cargaste o cambiaste: actividades hechas, notas, gastos, reservas y tareas nuevas. El
          itinerario vuelve a como estaba al principio. <strong>No se puede deshacer.</strong>
        </p>
        <p className="mt-2 text-[15px] text-muted">Si no estás seguro, exportá un respaldo antes.</p>
        <div className="mt-4 flex gap-2">
          <button type="button" onClick={() => setConfirmar(false)} className="min-h-12 flex-1 rounded-full bg-sunken font-semibold">
            Cancelar
          </button>
          <button
            type="button"
            onClick={() =>
              void restaurarSeed(db).then(() => {
                setConfirmar(false);
                toast('Datos originales restaurados');
              })
            }
            className="min-h-12 flex-1 rounded-full bg-rojo font-semibold text-white active:opacity-80"
          >
            Sí, restaurar
          </button>
        </div>
      </Sheet>
    </div>
  );
}
