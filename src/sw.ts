/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="./types/globals.d.ts" />

import { toast } from '@services';
import { registerSW } from 'virtual:pwa-register';

export function setupPWA() {
  const storageKey = 'tenna-timestamp';
  const currentBuildTimestamp = JSON.stringify(__BUILD_TIMESTAMP__);

  const doUpdate = registerSW({
    immediate: true,
    onRegisteredSW: async (_url, registration) => {
      await registration?.update().catch(() => {});
      const previousVersion = localStorage.getItem(storageKey);

      if (previousVersion && previousVersion !== currentBuildTimestamp) {
        toast('Editor was updated', 'info');
        await doUpdate();
        return;
      }

      localStorage.setItem(storageKey, currentBuildTimestamp);
    },
  });
}
