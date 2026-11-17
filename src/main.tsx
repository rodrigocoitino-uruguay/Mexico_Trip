import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { INGLES, t } from './lib/i18n';
import './styles/index.css';

if (INGLES) {
  document.documentElement.lang = 'en';
  document.title = t('México 2027');
}

const root = document.getElementById('root');
if (!root) throw new Error('Falta #root');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
