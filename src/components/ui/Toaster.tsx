import { useEffect } from 'react';
import { useToast } from '../../store/toast';

/** Avisos cortos abajo de la pantalla, con acción opcional ("Deshacer"). */
export function Toaster() {
  const current = useToast((s) => s.current);
  const dismiss = useToast((s) => s.dismiss);

  useEffect(() => {
    if (!current) return;
    const t = window.setTimeout(() => dismiss(current.id), current.duration);
    return () => window.clearTimeout(t);
  }, [current, dismiss]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 z-[60] flex justify-center px-4 lg:bottom-6"
      style={{ bottom: 'calc(var(--safe-bottom) + var(--tabbar-h) + 12px)' }}
    >
      {current && (
        <div
          key={current.id}
          role="status"
          className="pointer-events-auto flex min-h-12 max-w-full animate-rise items-center gap-3 rounded-2xl bg-fg py-1 pr-2 pl-4 text-[15px] text-bg shadow-lg"
        >
          <span className="line-clamp-2 min-w-0 py-2 leading-snug">{current.message}</span>
          {current.actionLabel ? (
            <button
              type="button"
              onClick={() => {
                current.onAction?.();
                dismiss(current.id);
              }}
              className="min-h-11 shrink-0 rounded-full px-3 font-semibold text-rosa active:opacity-70"
            >
              {current.actionLabel}
            </button>
          ) : (
            <span className="w-2" />
          )}
        </div>
      )}
    </div>
  );
}
