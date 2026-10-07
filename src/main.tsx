import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { setupPWA } from './sw';
import { uiHydration, useUi } from '@store';
import { loadLocale } from '@i18n';

setupPWA();
await uiHydration;
await loadLocale(useUi.getState().ui.locale);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
