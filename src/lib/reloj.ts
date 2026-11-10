import { useEffect, useState } from 'react';

/**
 * La hora actual. Solo en modo desarrollo se puede simular con `?ahora=2027-02-15T10:00-06:00`
 * en la dirección, para probar cómo se ve la app en un día del viaje.
 */
export function ahora(): Date {
  if (import.meta.env.DEV && typeof location !== 'undefined') {
    const p = new URLSearchParams(location.search).get('ahora');
    if (p) {
      const d = new Date(p);
      if (!Number.isNaN(d.getTime())) return d;
    }
  }
  return new Date();
}

/** Hora actual que se actualiza sola cada minuto (y al volver a la app). */
export function useAhora(): Date {
  const [now, setNow] = useState(ahora);
  useEffect(() => {
    const tick = () => setNow(ahora());
    const t = window.setInterval(tick, 60_000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(t);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
  return now;
}
