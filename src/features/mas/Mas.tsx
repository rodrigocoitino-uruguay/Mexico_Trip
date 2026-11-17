import { ChevronLeft, ChevronRight, Info as InfoIcon, LifeBuoy, Settings, Wallet, type LucideIcon } from 'lucide-react';
import { Ajustes } from '../ajustes/Ajustes';
import { Info, PlanB } from '../info/Info';
import { Presupuesto } from '../presupuesto/Presupuesto';
import { t } from '../../i18n';
import { useUI, type SeccionMas } from '../../store/ui';

const SECCIONES: { id: SeccionMas; label: string; detalle: string; icon: LucideIcon }[] = [
  { id: 'presupuesto', label: t('Presupuesto', 'Budget'), detalle: t('Tope, gastos y escenarios', 'Cap, expenses and scenarios'), icon: Wallet },
  { id: 'info', label: t('Info práctica', 'Practical info'), detalle: t('Ingreso, dinero, salud, equipaje, contactos', 'Entry, money, health, luggage, contacts'), icon: InfoIcon },
  { id: 'planb', label: t('Plan B', 'Plan B'), detalle: t('Si pasa esto, hacé esto', 'If this happens, do this'), icon: LifeBuoy },
  { id: 'ajustes', label: t('Ajustes', 'Settings'), detalle: t('Tipo de cambio, tema, respaldo', 'Exchange rate, theme, backup'), icon: Settings },
];

export function Mas() {
  const seccion = useUI((s) => s.seccionMas);
  const abrir = useUI((s) => s.abrirMas);

  if (seccion) {
    const s = SECCIONES.find((x) => x.id === seccion)!;
    return (
      <div>
        <button
          type="button"
          onClick={() => abrir(null)}
          className="-ml-2 flex min-h-11 items-center gap-1 rounded-xl px-2 font-medium text-rosa-ink"
        >
          <ChevronLeft size={20} aria-hidden="true" /> {t('Más', 'More')}
        </button>
        <h2 className="mb-3 font-display text-[24px] font-semibold">{s.label}</h2>
        {seccion === 'presupuesto' && <Presupuesto />}
        {seccion === 'info' && <Info />}
        {seccion === 'planb' && <PlanB />}
        {seccion === 'ajustes' && <Ajustes />}
      </div>
    );
  }

  return (
    <ul className="card divide-y divide-line overflow-hidden">
      {SECCIONES.map(({ id, label, detalle, icon: Icon }) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => abrir(id)}
            className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-left active:bg-sunken"
          >
            <Icon size={22} className="text-rosa" aria-hidden="true" />
            <span className="flex-1">
              <span className="block font-medium">{label}</span>
              <span className="block text-sm text-muted">{detalle}</span>
            </span>
            <ChevronRight size={18} className="text-muted" aria-hidden="true" />
          </button>
        </li>
      ))}
    </ul>
  );
}
