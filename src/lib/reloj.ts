import { useEffect, useState } from 'react';

/**
 * Fecha simulada con `?ahora=2027-02-15T10:00-06:00` en la dirección, para probar cómo
 * se ve la app en un día del viaje. La app muestra un cartel mientras se simula.
 */
export function fechaSimulada(): Date | null {
  if (typeof location === 'undefined') return null;
  const p = new URLSearchParams(location.search).get('ahora');
  if (!p) return null;
  const d = new Date(p);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** La hora actual (o la simulada). */
export function ahora(): Date {
  return fechaSimulada() ?? new Date();
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
