import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import fg from 'fast-glob';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    VitePWA({
      includeAssets: fg.sync('**/*.{png,svg,ico,txt,woff,woff2}', { cwd: resolve(__dirname, 'public') }), 
      manifest: {
        name: 'Tenna Editor',
        short_name: 'TennaEditor',
        description: 'An unofficial Deltarune Save Editor',
        theme_color: '#e53170',
        background_color: '#1f1e2a',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  server: {
    host: '127.0.0.1',
    port: 4500,
  },
  preview: {
    host: '127.0.0.1',
    port: 4545,
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/chunk-[name]-[hash].js',
        entryFileNames: 'assets/entry-[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/src/')) return 'tenna';
        },
      },
    },
  },
});
