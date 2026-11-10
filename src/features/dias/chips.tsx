import { Chip } from '../../components/ui/Chip';
import type { Actividad } from '../../domain/types';

/** Chips de una actividad: opcional, est., sin verificar, gratis, saltada, tuya. */
export function ChipsActividad({ a }: { a: Actividad }) {
  const gratis = /^gratis\b/i.test(a.costoTexto ?? '');
  return (
    <>
      {a.opcional && <Chip tono="cempa">opcional</Chip>}
      {a.fiabilidad === 'estimado' && <Chip tono="cempa">est.</Chip>}
      {a.fiabilidad === 'sin_verificar' && <Chip tono="cempa">sin verificar</Chip>}
      {gratis && <Chip tono="verde">gratis</Chip>}
      {a.estado === 'saltado' && <Chip>saltada</Chip>}
      {!a.delSeed && <Chip tono="rosa">agregada</Chip>}
    </>
  );
}
