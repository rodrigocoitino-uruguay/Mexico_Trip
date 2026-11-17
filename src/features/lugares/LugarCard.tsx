import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Chip } from '../../components/ui/Chip';
import { ConUSD } from '../../components/ui/Montos';
import { COLOR_CIUDAD } from '../../domain/ciudades';
import type { Lugar } from '../../domain/types';
import { cx } from '../../lib/cx';
import { diaCorto } from '../../lib/fechas';
import { t } from '../../lib/i18n';
import { ciudadMaps, mapsUrl } from '../../lib/maps';
import { useUI } from '../../store/ui';
import { FOTOS, urlFoto, urlPaginaFoto } from '../../data/fotos';

/** Ficha de una atracción, restaurante o lugar de noche. */
export function LugarCard({ l, extra }: { l: Lugar; extra?: string }) {
  const verDia = useUI((s) => s.verDia);
  const foto = FOTOS[l.id];
  const [fotoRota, setFotoRota] = useState(false);
  const ciudad = l.ciudad === 'Izamal/Valladolid' ? 'Izamal' : l.ciudad;
  return (
    <article className={cx('card overflow-hidden p-4', l.opcional && 'border-2 border-dashed border-cempa')}>
      {foto && !fotoRota && (
        <figure className="-mx-4 -mt-4 mb-3">
          <img
            src={urlFoto(foto)}
            alt={l.nombre}
            loading="lazy"
            decoding="async"
            onError={() => setFotoRota(true)}
            className="aspect-[16/9] w-full bg-sunken object-cover"
          />
          <figcaption className="px-4 pt-1 text-[12px] text-muted">
            {t('Foto:')} {foto.autor} ·{' '}
            <a href={urlPaginaFoto(foto)} target="_blank" rel="noopener noreferrer" className="underline">
              Wikimedia Commons
            </a>
          </figcaption>
        </figure>
      )}
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-1.5">
            <span className={cx('rounded-full px-2 text-[12px] font-semibold', COLOR_CIUDAD[l.ciudad].chip)}>{ciudad}</span>
            {l.opcional && <Chip tono="cempa">{t('opcional')}</Chip>}
            {l.fiabilidad === 'estimado' && <Chip tono="cempa">{t('est.')}</Chip>}
            {l.fiabilidad === 'sin_verificar' && <Chip tono="cempa">{t('sin verificar')}</Chip>}
          </p>
          <h3 className="mt-1 text-[17px] leading-snug font-semibold">{l.nombre}</h3>
          {l.direccion && <p className="text-[15px] text-muted">{l.direccion}</p>}
        </div>
        <a
          href={mapsUrl(l.nombre, l.direccion, ciudadMaps(l.ciudad))}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('Abrir {nombre} en Maps', { nombre: l.nombre })}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-azul-soft text-azul active:opacity-70"
        >
          <ExternalLink size={18} aria-hidden="true" />
        </a>
      </div>

      {(l.entrada || l.horario || l.consejo || extra) && (
        <dl className="mt-2 space-y-1 text-[15px] leading-snug">
          {l.entrada && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">{l.tipo === 'atraccion' ? t('Entrada') : t('Precio')}:</dt>
              <dd className="font-medium">
                <ConUSD texto={l.entrada} />
              </dd>
            </div>
          )}
          {l.horario && (
            <div className="flex gap-2">
              <dt className="shrink-0 text-muted">{t('Horario:')}</dt>
              <dd>{l.horario}</dd>
            </div>
          )}
          {l.consejo && (
            <div>
              <dd>
                <ConUSD texto={l.consejo} />
              </dd>
            </div>
          )}
          {extra && <dd className="text-muted">{extra}</dd>}
        </dl>
      )}

      {l.diaIds.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {l.diaIds.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => verDia(d)}
              className="min-h-9 rounded-full bg-rosa-soft px-3 text-[14px] font-semibold text-rosa-ink active:opacity-70"
            >
              {diaCorto(d)} →
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
