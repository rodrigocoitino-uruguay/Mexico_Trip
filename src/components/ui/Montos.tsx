import { useLiveQuery } from 'dexie-react-hooks';
import { PRESUPUESTO } from '../../data/seed';
import { db } from '../../db/db';
import { formatoUSD, segmentarMontos } from '../../domain/montos';
import { mxn } from '../../lib/numeros';

/** Tipo de cambio de Ajustes (MXN por USD). */
export function useTipoCambio(): number {
  return useLiveQuery(() => db.ajustes.get('ajustes').then((a) => a?.tipoCambio), []) ?? PRESUPUESTO.tipoCambioDefault;
}

/** Equivalente en USD, chiquito y en gris. */
export function Usd({ children }: { children: string }) {
  return <span className="ml-1 text-[0.8em] font-normal whitespace-nowrap text-muted">≈ {children}</span>;
}

/** Texto del plan con cada monto en MXN seguido de su equivalente en USD. */
export function ConUSD({ texto }: { texto: string }) {
  const tc = useTipoCambio();
  return (
    <>
      {segmentarMontos(texto, tc).map((s, i) =>
        s.tipo === 'texto' ? (
          <span key={i}>{s.texto}</span>
        ) : (
          <span key={i}>
            {s.texto}
            <Usd>{s.usd}</Usd>
          </span>
        ),
      )}
    </>
  );
}

/** 'MXN 1.267' con '≈ USD 68' al lado. */
export function MontoMXN({ valor, apilado = false }: { valor: number; apilado?: boolean }) {
  const tc = useTipoCambio();
  const usd = `USD ${formatoUSD(valor, tc)}`;
  return apilado ? (
    <>
      <span className="block">{mxn(valor)}</span>
      <span className="block text-[12px] font-normal text-muted">≈ {usd}</span>
    </>
  ) : (
    <>
      {mxn(valor)}
      <Usd>{usd}</Usd>
    </>
  );
}
