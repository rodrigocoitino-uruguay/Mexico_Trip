import { useId, useState, type FormEvent } from 'react';
import type { DatosActividad } from '../../domain/actividades';
import type { Actividad, CategoriaActividad } from '../../domain/types';
import { montoInput, parseMonto } from '../../lib/numeros';
import { t } from '../../lib/i18n';
import { CATEGORIAS } from './categorias';

interface Props {
  inicial?: Actividad;
  onGuardar: (datos: DatosActividad) => void | Promise<void>;
  onCancelar: () => void;
}

const campo = 'w-full rounded-xl border border-line bg-surface px-3 outline-none focus:border-rosa';

/** Formulario para editar una actividad o agregar una nueva. */
export function ActividadForm({ inicial, onGuardar, onCancelar }: Props) {
  const id = useId();
  const [hora, setHora] = useState(inicial?.hora ?? '');
  const [titulo, setTitulo] = useState(inicial?.titulo ?? '');
  const [categoria, setCategoria] = useState<CategoriaActividad>(inicial?.categoria ?? 'atraccion');
  const [descripcion, setDescripcion] = useState(inicial?.descripcion ?? '');
  const [comoLlegar, setComoLlegar] = useState(inicial?.comoLlegar ?? '');
  const [costoTexto, setCostoTexto] = useState(inicial?.costoTexto ?? '');
  const [costo, setCosto] = useState(montoInput(inicial?.costoMXN));
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return setError(t('Poné un título.'));
    const costoMXN = parseMonto(costo);
    if (costo.trim() && costoMXN === undefined) return setError(t('El costo estimado tiene que ser un número.'));
    void onGuardar({ hora, titulo, categoria, descripcion: descripcion.trim(), comoLlegar, costoTexto, costoMXN });
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <div className="grid grid-cols-[7.5rem_1fr] gap-3">
        <div>
          <label htmlFor={`${id}-hora`} className="mb-1 block text-sm font-semibold">
            {t('Hora')}
          </label>
          <input
            id={`${id}-hora`}
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            placeholder="9:30"
            className={`${campo} min-h-12 tabular`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-cat`} className="mb-1 block text-sm font-semibold">
            {t('Tipo')}
          </label>
          <select
            id={`${id}-cat`}
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as CategoriaActividad)}
            className={`${campo} min-h-12`}
          >
            {CATEGORIAS.map((c) => (
              <option key={c.id} value={c.id}>
                {t(c.label)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p className="-mt-2 text-[13px] text-muted">{t('Podés escribir "9:00–13:30" o "aprox. 11:30". Se ordena sola por la hora.')}</p>

      <div>
        <label htmlFor={`${id}-titulo`} className="mb-1 block text-sm font-semibold">
          {t('Título')}
        </label>
        <input
          id={`${id}-titulo`}
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            setError(null);
          }}
          className={`${campo} min-h-12`}
        />
      </div>
      <div>
        <label htmlFor={`${id}-desc`} className="mb-1 block text-sm font-semibold">
          {t('Qué hacer')}
        </label>
        <textarea
          id={`${id}-desc`}
          value={descripcion}
          rows={3}
          onChange={(e) => setDescripcion(e.target.value)}
          className={`${campo} py-2`}
        />
      </div>
      <div>
        <label htmlFor={`${id}-llegar`} className="mb-1 block text-sm font-semibold">
          {t('Cómo llegar')}
        </label>
        <input
          id={`${id}-llegar`}
          value={comoLlegar}
          onChange={(e) => setComoLlegar(e.target.value)}
          className={`${campo} min-h-12`}
        />
      </div>
      <div className="grid grid-cols-[1fr_7.5rem] gap-3">
        <div>
          <label htmlFor={`${id}-costotxt`} className="mb-1 block text-sm font-semibold">
            {t('Costo (texto)')}
          </label>
          <input
            id={`${id}-costotxt`}
            value={costoTexto}
            onChange={(e) => setCostoTexto(e.target.value)}
            placeholder={t('MXN 150 a 250')}
            className={`${campo} min-h-12`}
          />
        </div>
        <div>
          <label htmlFor={`${id}-costo`} className="mb-1 block text-sm font-semibold">
            {t('Estimado MXN')}
          </label>
          <input
            id={`${id}-costo`}
            inputMode="decimal"
            value={costo}
            onChange={(e) => {
              setCosto(e.target.value);
              setError(null);
            }}
            className={`${campo} min-h-12 tabular`}
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-[15px] font-medium text-rojo">
          {error}
        </p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onCancelar}
          className="min-h-12 flex-1 rounded-full bg-sunken px-4 font-semibold active:opacity-70"
        >
          {t('Cancelar')}
        </button>
        <button type="submit" className="min-h-12 flex-1 rounded-full bg-rosa-ink px-4 font-semibold text-white active:opacity-80">
          {t('Guardar')}
        </button>
      </div>
    </form>
  );
}
