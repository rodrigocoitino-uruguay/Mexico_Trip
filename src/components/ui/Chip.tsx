import type { ReactNode } from 'react';
import { cx } from '../../lib/cx';

export type TonoChip = 'neutro' | 'rosa' | 'verde' | 'rojo' | 'cempa' | 'azul' | 'turquesa';

const TONOS: Record<TonoChip, string> = {
  neutro: 'bg-sunken text-muted',
  rosa: 'bg-rosa-soft text-rosa-ink',
  verde: 'bg-verde-soft text-verde',
  rojo: 'bg-rojo-soft text-rojo',
  cempa: 'bg-cempa-soft text-cempa-ink',
  azul: 'bg-azul-soft text-azul',
  turquesa: 'bg-turquesa-soft text-turquesa-ink',
};

export function Chip({ tono = 'neutro', children, className }: { tono?: TonoChip; children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] leading-4 font-semibold',
        TONOS[tono],
        className,
      )}
    >
      {children}
    </span>
  );
}
