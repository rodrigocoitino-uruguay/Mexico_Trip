// Genera los íconos de la app a partir de un SVG propio (dos banderitas de papel picado).
// Uso (una sola vez, no forma parte del build):
//   npm i --no-save sharp && node scripts/generate-icons.mjs
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const BG = '#FBF6EE';
const ROSA = '#E4007C';
const TURQUESA = '#00A6A6';
const TINTA = '#1E1B18';

/** Bandera de papel picado de 160×200 con borde en zigzag y calados. */
function bandera(x, y, color) {
  const zig = Array.from({ length: 8 }, (_, i) => `L${160 - (i + 1) * 20} ${i % 2 === 0 ? 200 : 176}`).join(' ');
  return `<g transform="translate(${x} ${y})"><path fill="${color}" fill-rule="evenodd" d="M0 0H160V176 ${zig} Z
    M80 40L116 88L80 136L44 88Z
    M22 30a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z
    M118 30a10 10 0 1 0 20 0a10 10 0 1 0 -20 0Z
    M28 138L44 160H12Z M132 138L148 160H116Z"/></g>`;
}

/** Ícono de 512: todo el dibujo queda dentro del 80 % central (zona segura de los íconos "maskable"). */
function iconSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  <path d="M86 150Q256 172 426 150" stroke="${TINTA}" stroke-width="7" fill="none" stroke-linecap="round"/>
  ${bandera(92, 156, ROSA)}
  ${bandera(260, 156, TURQUESA)}
</svg>`;
}

const out = new URL('../public/', import.meta.url);
const png = (svg, file) => sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(fileURLToPath(new URL(file, out)));

await writeFile(new URL('icons/icon.svg', out), iconSvg(512));
await png(iconSvg(512), 'icons/icon-512.png');
await png(iconSvg(192), 'icons/icon-192.png');
await png(iconSvg(512), 'icons/icon-maskable-512.png');
await png(iconSvg(180), 'icons/apple-touch-icon.png');
await png(iconSvg(64), 'icons/favicon-64.png');
console.log('Íconos generados en public/icons');
