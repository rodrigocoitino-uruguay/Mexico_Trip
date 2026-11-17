import { INGLES } from '../lib/i18n';

/** Un pedazo de texto: texto común o un monto en MXN con su equivalente en USD. */
export type Segmento = { tipo: 'texto'; texto: string } | { tipo: 'mxn'; texto: string; usd: string };

// 'MXN 1.300 a 2.300', 'MXN 75', 'MXN 500+', 'MXN 120 a 200'; en inglés 'MXN 1,300 to 2,300'.
const RE = /MXN\s?(\d{1,3}(?:[.,]\d{3})+|\d+)(?:\s?(?:a|to)\s?(\d{1,3}(?:[.,]\d{3})+|\d+))?(\+)?/g;

const num = (s: string) => Number(s.replace(/[.,]/g, ''));

/** 'USD 0,3', 'USD 11', 'USD 70' */
export function formatoUSD(mxn: number, tipoCambio: number): string {
  const v = mxn / tipoCambio;
  const txt = v < 1 ? (Math.round(v * 10) / 10).toString().replace('.', INGLES ? '.' : ',') : String(Math.round(v));
  return txt;
}

/** Separa un texto del plan en partes, marcando cada monto en MXN con su equivalente en USD. */
export function segmentarMontos(texto: string, tipoCambio: number): Segmento[] {
  const out: Segmento[] = [];
  let last = 0;
  for (const m of texto.matchAll(RE)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ tipo: 'texto', texto: texto.slice(last, i) });
    const desde = formatoUSD(num(m[1]), tipoCambio);
    const hasta = m[2] ? formatoUSD(num(m[2]), tipoCambio) : null;
    out.push({ tipo: 'mxn', texto: m[0], usd: `USD ${desde}${hasta ? ` ${INGLES ? 'to' : 'a'} ${hasta}` : ''}${m[3] ?? ''}` });
    last = i + m[0].length;
  }
  if (last < texto.length) out.push({ tipo: 'texto', texto: texto.slice(last) });
  return out;
}
