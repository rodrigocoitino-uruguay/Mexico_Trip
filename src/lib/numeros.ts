import { LOCALE } from './i18n';

const fmt0 = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 });
const fmt2 = new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 2 });

/** 'MXN 1.267' */
export function mxn(n: number): string {
  return `MXN ${fmt0.format(Math.round(n))}`;
}

/** 'USD 68' (hasta 2 decimales si hacen falta). */
export function usd(n: number, decimales = false): string {
  return `USD ${(decimales ? fmt2 : fmt0).format(decimales ? n : Math.round(n))}`;
}

/** Lee un monto escrito a mano: '1.250,50', '1250.5', '300'. Devuelve undefined si está vacío o no es válido. */
export function parseMonto(texto: string): number | undefined {
  let t = texto.trim().replace(/\s|MXN|USD|\$/gi, '');
  if (!t) return undefined;
  const coma = t.lastIndexOf(',');
  const punto = t.lastIndexOf('.');
  if (coma > -1 && punto > -1) {
    // El último separador es el decimal.
    t = coma > punto ? t.replace(/\./g, '').replace(',', '.') : t.replace(/,/g, '');
  } else if (coma > -1) {
    t = t.replace(',', '.');
  } else if (punto > -1 && /^\d{1,3}(\.\d{3})+$/.test(t)) {
    t = t.replace(/\./g, ''); // '1.250' = mil doscientos cincuenta
  }
  const n = Number(t);
  return Number.isFinite(n) && n >= 0 ? n : undefined;
}

/** Monto para mostrar en un campo editable. */
export function montoInput(n: number | undefined): string {
  return n === undefined ? '' : fmt2.format(n).replace(/\./g, '');
}
