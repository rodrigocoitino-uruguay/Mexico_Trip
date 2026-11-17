import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { EN } from './i18n';
import './styles/index.css';

// La versión en inglés es solo para mostrar la app: el resto del tiempo sigue en español.
if (EN) {
  document.documentElement.lang = 'en';
  document.title = 'Mexico 2027';
}

const root = document.getElementById('root');
if (!root) throw new Error('Falta #root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
