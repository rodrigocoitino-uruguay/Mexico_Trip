import { CalendarDays, ClipboardCheck, Ellipsis, MapPin, Sun, type LucideIcon } from 'lucide-react';
import { cx } from '../lib/cx';
import { useUI, type Tab } from '../store/ui';

export const TABS: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'hoy', label: 'Hoy', icon: Sun },
  { id: 'dias', label: 'Días', icon: CalendarDays },
  { id: 'lugares', label: 'Lugares', icon: MapPin },
  { id: 'reservas', label: 'Reservas', icon: ClipboardCheck },
  { id: 'mas', label: 'Más', icon: Ellipsis },
];

/** Barra inferior (celular). */
export function TabBar() {
  const tab = useUI((s) => s.tab);
  const setTab = useUI((s) => s.setTab);
  return (
    <nav
      aria-label="Secciones"
      className="shrink-0 border-t border-line bg-surface/95 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
    >
      <div className="mx-auto grid h-[var(--tabbar-h)] max-w-xl grid-cols-5">
        {TABS.map(({ id, label, icon: Icon }) => {
          const activo = tab === id;
          return (
            <button
              key={id}
              type="button"
              aria-current={activo ? 'page' : undefined}
              onClick={() => setTab(id)}
              className={cx(
                'flex min-h-11 flex-col items-center justify-center gap-0.5 transition-colors',
                activo ? 'text-rosa-ink' : 'text-muted',
              )}
            >
              <Icon size={23} strokeWidth={activo ? 2.1 : 1.6} aria-hidden="true" />
              <span className={cx('text-[11px] leading-none', activo && 'font-semibold')}>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/** Barra lateral (desktop). */
export function SideNav() {
  const tab = useUI((s) => s.tab);
  const setTab = useUI((s) => s.setTab);
  return (
    <nav aria-label="Secciones" className="hidden w-56 shrink-0 flex-col gap-1 border-r border-line px-3 py-6 lg:flex">
      <p className="px-3 pb-4 font-display text-2xl font-semibold tracking-tight">México 2027</p>
      {TABS.map(({ id, label, icon: Icon }) => {
        const activo = tab === id;
        return (
          <button
            key={id}
            type="button"
            aria-current={activo ? 'page' : undefined}
            onClick={() => setTab(id)}
            className={cx(
              'flex min-h-11 items-center gap-3 rounded-xl px-3 text-left transition-colors',
              activo ? 'bg-rosa-soft font-semibold text-rosa-ink' : 'text-fg hover:bg-sunken',
            )}
          >
            <Icon size={20} strokeWidth={activo ? 2.1 : 1.7} aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
