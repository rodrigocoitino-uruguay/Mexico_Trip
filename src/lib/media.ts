import { useSyncExternalStore } from 'react';

const QUERY = '(min-width: 1024px)';

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

/** true en pantallas anchas (desktop: barra lateral y 2 columnas). */
export function useEsDesktop(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
