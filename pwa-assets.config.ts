import {
  defineConfig,
  minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config';

export default defineConfig({
  preset: {
    ...preset,
    transparent: {
      ...preset.transparent,
      favicons: [],
    },
  },
  images: ['public/logo.svg'],
});
