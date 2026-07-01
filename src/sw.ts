/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="./types/globals.d.ts" />

import { toast } from '@services';
import { registerSW } from 'virtual:pwa-register';
import { translate } from './i18n';

export function setupPWA() {
  const storageisUpdatingKey = 'tenna-isupdating';
  let hasRefreshed = false;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (hasRefreshed) return;
      if (localStorage.getItem(storageisUpdatingKey) === 'true') {
        hasRefreshed = true;
        window.location.reload();
      }
    });
  }

  registerSW({
    immediate: true,

    onRegistered(registration) {
      registration?.update().catch(() => {});

      if (registration) {
        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;
          if (!installing) return;
          installing.addEventListener('statechange', () => {
            if (
              installing.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              toast(translate('ui.sw.updating', 'Editor is updating...'), 'info');
              localStorage.setItem(storageisUpdatingKey, 'true');
            }
          });
        });
      }

      const isUpdating = JSON.parse(
        localStorage.getItem(storageisUpdatingKey) ?? 'false',
      );
      if (isUpdating) {
        const message = `
        ${translate('ui.sw.updated', 'Editor was updated to version {version}').replace('{version}', __VERSION__)}

        ${translate('ui.sw.checkChangelog', 'Check out changelog in the About page')}
        `;
        toast(message, 'success', undefined, 'sm');
        localStorage.removeItem(storageisUpdatingKey);
      }
    },

    onRegisterError(error) {
      console.error('Service worker registration error', error);
      toast(
        translate('ui.sw.registrationFailed', 'Failed to register service worker'),
        'error',
      );
    },
  });
}
