import { EN } from '../i18n';

function a12(h: number, m: number): { txt: string; ap: string } {
  const ap = h >= 12 ? 'p.m.' : 'a.m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return { txt: `${h12}:${String(m).padStart(2, '0')}`, ap };
}

/**
 * Hora tal como se muestra. Los datos guardan '9:00–13:30', 'aprox. 11:30' o 'Noche' (24 h, en español)
 * porque con eso se ordena y se arma "Ahora/Próxima"; en inglés se convierte solo al mostrarla.
 */
export function horaVisible(hora: string): string {
  return EN ? horaEn(hora) : hora;
}

/** La misma hora en inglés: formato de 12 h, 'approx.' y 'Night'. */
export function horaEn(hora: string): string {
  if (!hora) return hora;
  const m = /^(aprox\.\s*)?(\d{1,2})[:.](\d{2})(?:\s*[–-]\s*(\d{1,2})[:.](\d{2}))?$/.exec(hora.trim());
  if (!m) return hora.trim().toLowerCase() === 'noche' ? 'Night' : hora.replace(/^aprox\./i, 'approx.');
  const pre = m[1] ? 'approx. ' : '';
  const ini = a12(Number(m[2]), Number(m[3]));
  if (m[4] === undefined) return `${pre}${ini.txt} ${ini.ap}`;
  const fin = a12(Number(m[4]), Number(m[5]));
  return ini.ap === fin.ap ? `${pre}${ini.txt}–${fin.txt} ${fin.ap}` : `${pre}${ini.txt} ${ini.ap}–${fin.txt} ${fin.ap}`;
}
