/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="./types/globals.d.ts" />

import { toast } from '@services';
import { registerSW } from 'virtual:pwa-register';

export function setupPWA() {
  const storageTimestampKey = 'tenna-timestamp';
  const storageisUpdatingKey = 'tenna-isupdating';
  const currentBuildTimestamp = JSON.stringify(__BUILD_TIMESTAMP__);

  const doUpdate = registerSW({
    immediate: true,
    onRegisteredSW: async (_url, registration) => {
      await registration?.update().catch(() => {});
      const previousVersion = localStorage.getItem(storageTimestampKey);
      const isUpdating = localStorage.getItem(storageisUpdatingKey);

      if (previousVersion && previousVersion !== currentBuildTimestamp) {
        toast('Editor is updating...', 'info');
        localStorage.setItem(storageisUpdatingKey, 'true');
        await doUpdate();
      }

      if (JSON.parse(isUpdating ?? 'false')) {
        const message = `
        Editor was updated to version ${__VERSION__}

        Check out changelog in the About page
        `;
        toast(message, 'success', undefined, 'sm');

        localStorage.removeItem(storageisUpdatingKey);
      }

      localStorage.setItem(storageTimestampKey, currentBuildTimestamp);
    },
  });
}
