import { Plus } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Sheet } from '../../components/ui/Sheet';
import { agregar, editar } from '../../db/actividades';
import { actividadEnCurso, proximaActividad, textoEnMinutos } from '../../domain/hoy';
import { estadoDia } from '../../domain/tiempo';
import type { Actividad, Dia } from '../../domain/types';
import { diaLargo } from '../../lib/fechas';
import { useEsDesktop } from '../../lib/media';
import { toast } from '../../store/toast';
import { ActividadDetalle } from './ActividadDetalle';
import { ActividadForm } from './ActividadForm';
import { PieDia, Timeline } from './Timeline';

type Formulario = { modo: 'editar'; id: string } | { modo: 'agregar' } | null;

interface Props {
  dia: Dia;
  dias: Dia[];
  /** Actividades del día, ordenadas. */
  lista: Actividad[];
  now: Date;
  /** Lo que va arriba del timeline (encabezado del día, tarjeta de Hoy…). */
  arriba?: ReactNode;
  /** Hoy: esconde lo anterior a la actividad en curso o próxima (con botón para verlo). */
  ocultarAnteriores?: boolean;
}

/**
 * Timeline de un día con todas sus acciones: detalle (hoja en el celular, columna en desktop),
 * editar, agregar y el pie de costos. Lo usan Días y Hoy.
 */
export function VistaDia({ dia, dias, lista, now, arriba, ocultarAnteriores = false }: Props) {
  const esDesktop = useEsDesktop();
  const [actId, setActId] = useState<string | null>(null);
  const [form, setForm] = useState<Formulario>(null);
  const [verAnteriores, setVerAnteriores] = useState(false);

  const esHoy = estadoDia(dia, now) === 'hoy';
  const enCurso = esHoy ? actividadEnCurso(lista, dia, now) : null;
  const proxima = esHoy ? proximaActividad(lista, dia, now) : null;
  const ancla = enCurso ?? proxima?.actividad ?? null;
  const corte = ocultarAnteriores && ancla ? lista.findIndex((a) => a.id === ancla.id) : 0;
  const visibles = corte > 0 && !verAnteriores ? lista.slice(corte) : lista;
  const seleccionada = actId ? (lista.find((a) => a.id === actId) ?? null) : null;
  const formActividad = form?.modo === 'editar' ? lista.find((a) => a.id === form.id) : undefined;

  const detalle = seleccionada && (
    <ActividadDetalle
      a={seleccionada}
      dias={dias}
      onEditar={() => setForm({ modo: 'editar', id: seleccionada.id })}
      onSalir={() => setActId(null)}
    />
  );

  return (
    <>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-6">
        <div>
          {arriba}
          {corte > 0 && (
            <button
              type="button"
              onClick={() => setVerAnteriores((v) => !v)}
              className="mt-3 min-h-11 w-full rounded-full text-[15px] font-semibold text-muted active:bg-sunken"
            >
              {verAnteriores ? 'Esconder las anteriores' : `Ver ${corte} ${corte === 1 ? 'anterior' : 'anteriores'}`}
            </button>
          )}
          <div className="mt-4">
            <Timeline
              actividades={visibles}
              seleccionada={esDesktop ? actId : null}
              enCursoId={enCurso?.id}
              proximaId={proxima?.actividad.id}
              proximaCuando={proxima ? textoEnMinutos(proxima.enMinutos) : undefined}
              onAbrir={setActId}
            />
          </div>

          <button
            type="button"
            onClick={() => setForm({ modo: 'agregar' })}
            className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-[16px] border-2 border-dashed border-line font-semibold text-rosa-ink active:bg-sunken"
          >
            <Plus size={18} aria-hidden="true" /> Agregar actividad
          </button>

          <PieDia
            bajo={dia.costoBajoMXN}
            central={dia.costoCentralMXN}
            alto={dia.costoAltoMXN}
            nota={dia.costoNota}
            actividades={lista}
          />
        </div>

        {esDesktop && (
          <aside
            className="scroll-area sticky top-2 hidden max-h-[calc(100dvh-140px)] lg:block"
            aria-label="Detalle de la actividad"
          >
            {detalle ? (
              <div className="card p-5">{detalle}</div>
            ) : (
              <p className="card p-5 text-muted">Elegí una actividad para ver el detalle, anotar o cargar un gasto.</p>
            )}
          </aside>
        )}
      </div>

      {!esDesktop && (
        <Sheet
          open={!!seleccionada && !form}
          onClose={() => setActId(null)}
          title={seleccionada?.titulo ?? 'Actividad'}
          header={<span />}
        >
          {detalle}
        </Sheet>
      )}

      <Sheet
        open={!!form}
        onClose={() => setForm(null)}
        title={form?.modo === 'agregar' ? `Nueva actividad · ${diaLargo(dia.fecha)}` : 'Editar actividad'}
      >
        {form && (
          <ActividadForm
            key={form.modo === 'editar' ? form.id : 'nueva'}
            inicial={formActividad}
            onCancelar={() => setForm(null)}
            onGuardar={async (datos) => {
              if (form.modo === 'editar') {
                await editar(form.id, datos);
                toast('Cambios guardados');
              } else {
                const nueva = await agregar(dia.id, datos);
                setActId(esDesktop ? nueva.id : null);
                toast('Actividad agregada');
              }
              setForm(null);
            }}
          />
        )}
      </Sheet>
    </>
  );
}
