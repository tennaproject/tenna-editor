import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

const preloadFont = (href: string) => {
  if (!href) return;
  if (document.head.querySelector(`link[rel="preload"][href="${href}"]`))
    return;
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = 'font';
  link.type = 'font/woff2';
  link.crossOrigin = 'anonymous';
  document.head.appendChild(link);
};

const fontUrls = [
  new URL('./assets/fonts/PixelOperator.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperator-Bold.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperatorMono.woff2', import.meta.url).href,
  new URL('./assets/fonts/PixelOperatorMono-Bold.woff2', import.meta.url).href,
];

fontUrls.forEach(preloadFont);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
