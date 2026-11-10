import { create } from 'zustand';

export type Tab = 'hoy' | 'dias' | 'lugares' | 'reservas' | 'mas';
export type SeccionMas = 'presupuesto' | 'info' | 'planb' | 'ajustes';
export type SubLugares = 'atraccion' | 'comida' | 'noche' | 'alojamiento' | 'transporte';

interface UIState {
  tab: Tab;
  /** Dentro de "Más": qué sección está abierta (null = el menú). */
  seccionMas: SeccionMas | null;
  /** Día elegido en la pestaña Días. */
  diaId: string | null;
  subLugares: SubLugares;
  busquedaLugares: string;
  ciudadLugares: string;
  setTab: (t: Tab) => void;
  abrirMas: (s: SeccionMas | null) => void;
  verDia: (id: string) => void;
  setSubLugares: (s: SubLugares) => void;
  setBusquedaLugares: (q: string) => void;
  setCiudadLugares: (c: string) => void;
}

export const useUI = create<UIState>()((set) => ({
  tab: 'hoy',
  seccionMas: null,
  diaId: null,
  subLugares: 'atraccion',
  busquedaLugares: '',
  ciudadLugares: 'todas',
  setTab: (tab) => set((s) => ({ tab, seccionMas: tab === 'mas' && s.tab === 'mas' ? null : s.seccionMas })),
  abrirMas: (seccionMas) => set({ tab: 'mas', seccionMas }),
  verDia: (diaId) => set({ tab: 'dias', diaId }),
  setSubLugares: (subLugares) => set({ subLugares }),
  setBusquedaLugares: (busquedaLugares) => set({ busquedaLugares }),
  setCiudadLugares: (ciudadLugares) => set({ ciudadLugares }),
}));
