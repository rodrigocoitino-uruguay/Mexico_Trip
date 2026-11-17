import { RefreshCw } from 'lucide-react';
import { t } from '../lib/i18n';
import { useRegisterSW } from 'virtual:pwa-register/react';

const CHECK_EVERY_MS = 60 * 60 * 1000;

/** Registra el service worker (funcionamiento sin señal) y avisa si hay una versión nueva. */
export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      if (registration) window.setInterval(() => void registration.update(), CHECK_EVERY_MS);
    },
  });

  if (!needRefresh) return null;
  return (
    <div
      role="status"
      className="fixed inset-x-0 z-[70] flex justify-center px-4"
      style={{ top: 'calc(var(--safe-top) + 8px)' }}
    >
      <div className="card flex max-w-full animate-rise items-center gap-2 py-1 pr-1 pl-4 text-[15px]">
        <RefreshCw size={16} className="shrink-0 text-rosa" aria-hidden="true" />
        <span className="py-2">{t('Hay una versión nueva')}</span>
        <button type="button" onClick={() => setNeedRefresh(false)} className="min-h-11 rounded-full px-3 text-muted">
          {t('Luego')}
        </button>
        <button
          type="button"
          onClick={() => void updateServiceWorker(true)}
          className="min-h-11 rounded-full bg-rosa-ink px-4 font-medium text-white active:opacity-80"
        >
          {t('Actualizar')}
        </button>
      </div>
    </div>
  );
}
