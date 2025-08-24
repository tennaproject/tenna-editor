import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { preload } from 'react-dom';

const fontUrls = [
  new URL('./assets/fonts/PixelOperator.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperator-Bold.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperatorMono.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperatorMono-Bold.woff2', import.meta.url).href,
];

fontUrls.forEach((href) => preload(href, { as: 'font' }));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
