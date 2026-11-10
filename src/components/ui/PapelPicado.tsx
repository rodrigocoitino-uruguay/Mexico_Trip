/**
 * Franja de papel picado geométrico (diseño propio): banderitas colgadas de un hilo,
 * cada una con calados simples. Decorativa y sutil.
 */
const COLORES = ['var(--c-rosa)', 'var(--c-cempa)', 'var(--c-turquesa)', 'var(--c-verde)', 'var(--c-azul)'];

function Bandera({ x, color }: { x: number; color: string }) {
  // Bandera de 28×26 con borde inferior en zigzag y calados: rombo, círculos y triángulos.
  return (
    <g transform={`translate(${x} 4)`}>
      <path
        fill={color}
        fillRule="evenodd"
        d={[
          'M0 0H28V22L25.2 26L22.4 22L19.6 26L16.8 22L14 26L11.2 22L8.4 26L5.6 22L2.8 26L0 22Z',
          // rombo central
          'M14 5L19 11L14 17L9 11Z',
          // círculos en las esquinas superiores
          'M3 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z',
          'M21 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0Z',
          // triángulos al pie
          'M4 16L7 19.5H1Z',
          'M24 16L27 19.5H21Z',
        ].join(' ')}
      />
    </g>
  );
}

export function PapelPicado({ className = '' }: { className?: string }) {
  const paso = 34;
  const n = 16;
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none block h-[30px] w-full opacity-70 ${className}`}
      viewBox={`0 0 ${paso * n} 30`}
      preserveAspectRatio="xMinYMin slice"
    >
      <path d={`M0 3.5Q${(paso * n) / 2} 6 ${paso * n} 3.5`} stroke="var(--c-line)" strokeWidth="1" fill="none" />
      {Array.from({ length: n }, (_, i) => (
        <Bandera key={i} x={i * paso + 3} color={COLORES[i % COLORES.length]} />
      ))}
    </svg>
  );
}
