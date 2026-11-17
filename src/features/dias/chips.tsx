import { Chip } from '../../components/ui/Chip';
import type { Actividad } from '../../domain/types';
import { t } from '../../i18n';

/** Chips de una actividad: opcional, est., sin verificar, gratis, saltada, tuya. */
export function ChipsActividad({ a }: { a: Actividad }) {
  const gratis = /^(gratis|free)\b/i.test(a.costoTexto ?? '');
  return (
    <>
      {a.opcional && <Chip tono="cempa">{t('opcional', 'optional')}</Chip>}
      {a.fiabilidad === 'estimado' && <Chip tono="cempa">{t('est.', 'est.')}</Chip>}
      {a.fiabilidad === 'sin_verificar' && <Chip tono="cempa">{t('sin verificar', 'unverified')}</Chip>}
      {gratis && <Chip tono="verde">{t('gratis', 'free')}</Chip>}
      {a.estado === 'saltado' && <Chip>{t('saltada', 'skipped')}</Chip>}
      {!a.delSeed && <Chip tono="rosa">{t('agregada', 'added')}</Chip>}
    </>
  );
}
