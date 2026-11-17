/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

/** Nombre del repositorio en GitHub: la app se publica en https://<usuario>.github.io/<repo>/ */
const REPO_BASE = '/cuaderno/';

/**
 * Content-Security-Policy (solo en el build de producción; el modo dev de Vite
 * necesita scripts en línea). La app no carga nada de otros dominios.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://commons.wikimedia.org https://upload.wikimedia.org",
  "font-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

function securityHeaders(): Plugin {
  return {
    name: 'viaje-security-meta',
    apply: 'build',
    transformIndexHtml: () => [
      { tag: 'meta', attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP }, injectTo: 'head-prepend' },
    ],
  };
}

export default defineConfig({
  base: REPO_BASE,
  plugins: [
    react(),
    tailwindcss(),
    securityHeaders(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      manifest: {
        id: REPO_BASE,
        name: 'México 2027',
        short_name: 'México',
        description: 'Itinerario, reservas y presupuesto del viaje. Funciona sin señal.',
        lang: 'es-UY',
        dir: 'ltr',
        start_url: REPO_BASE,
        scope: REPO_BASE,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#FBF6EE',
        theme_color: '#FBF6EE',
        categories: ['travel'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Todo lo necesario para abrir sin conexión queda guardado en el teléfono.
        globPatterns: ['**/*.{js,css,html,woff2,svg,png,webmanifest}'],
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: { target: 'es2022', sourcemap: false },
  server: { port: 5174, strictPort: true },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test/setup.ts'],
  },
});
