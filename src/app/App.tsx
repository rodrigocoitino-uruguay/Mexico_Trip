import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useState } from 'react';
import { PapelPicado } from '../components/ui/PapelPicado';
import { db } from '../db/db';
import { aplicarSeed } from '../db/seed';
import { Toaster } from '../components/ui/Toaster';
import { Dias } from '../features/dias/Dias';
import { Hoy } from '../features/hoy/Hoy';
import { Lugares } from '../features/lugares/Lugares';
import { Reservas } from '../features/reservas/Reservas';
import { requestPersistentStorage, useVisualViewportVars } from '../lib/viewport';
import { Mas } from '../features/mas/Mas';
import { useUI } from '../store/ui';
import { SideNav, TabBar, TABS } from './Nav';
import { UpdatePrompt } from './UpdatePrompt';

/** Aplica el tema elegido en Ajustes (o el del sistema). */
function useTema() {
  const tema = useLiveQuery(() => db.ajustes.get('ajustes').then((a) => a?.tema ?? 'sistema'), []);
  useEffect(() => {
    const el = document.documentElement;
    if (tema === 'claro') el.dataset.theme = 'light';
    else if (tema === 'oscuro') el.dataset.theme = 'dark';
    else delete el.dataset.theme;
  }, [tema]);
}

function Pantalla() {
  const tab = useUI((s) => s.tab);
  switch (tab) {
    case 'hoy':
      return <Hoy />;
    case 'dias':
      return <Dias />;
    case 'lugares':
      return <Lugares />;
    case 'reservas':
      return <Reservas />;
    case 'mas':
      return <Mas />;
  }
}

export function App() {
  const [listo, setListo] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const tab = useUI((s) => s.tab);
  useTema();
  useVisualViewportVars();

  useEffect(() => {
    // Pide que el navegador no borre los datos por falta de espacio.
    void requestPersistentStorage();
    aplicarSeed(db)
      .then(() => setListo(true))
      .catch((e: unknown) => setError(e instanceof Error ? e.message : String(e)));
  }, []);

  const titulo = TABS.find((t) => t.id === tab)?.label ?? '';

  return (
    <div className="flex h-full">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="shrink-0 bg-bg" style={{ paddingTop: 'var(--safe-top)' }}>
          <PapelPicado />
          <h1 className="mx-auto max-w-5xl px-4 pt-1 pb-2 font-display text-[28px] font-semibold tracking-tight">
            {titulo}
          </h1>
        </header>
        <main className="scroll-area min-h-0 flex-1">
          <div className="mx-auto max-w-5xl px-4 pt-2 pb-8">
            {error ? (
              <p className="card p-4 text-rojo">No se pudieron cargar los datos: {error}</p>
            ) : listo ? (
              <Pantalla />
            ) : null}
          </div>
        </main>
        <TabBar />
      </div>
      <Toaster />
      <UpdatePrompt />
    </div>
  );
}
