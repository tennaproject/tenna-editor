import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import fg from 'fast-glob';
import { resolve } from 'path';
import {
  getVersion,
  getChangelog,
  generateSitemap,
  generateRobots,
} from './scripts';

const { packageVersion, commitHash, branch } = await getVersion();
const changelog = await getChangelog();
await generateSitemap();
await generateRobots(branch);

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    tailwindcss(),
    svgr({
      svgrOptions: {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgo: true,
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeMetadata: false,
                },
              },
            },
            { name: 'prefixIds', params: { prefix: true } },
          ],
        },
        titleProp: true,
      },
      include: '**/*.svg?react',
    }),
    VitePWA({
      includeAssets: fg.sync('**/*.{png,svg,ico,txt,woff,woff2}', {
        cwd: resolve(__dirname, 'public'),
      }),
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      manifest: {
        name: 'Tenna Editor',
        short_name: 'Tenna Editor',
        description: 'An unofficial DELTARUNE Save Editor',
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
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    host: process.env.VITE_HOST ?? '127.0.0.1',
    port: 4500,
  },
  preview: {
    host: process.env.VITE_HOST ?? '127.0.0.1',
    port: 4545,
  },
  build: {
    rolldownOptions: {
      output: {
        chunkFileNames: 'assets/chunk-[name]-[hash].js',
        entryFileNames: 'assets/entry-[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules[/\\](react|react-dom|scheduler)[/\\]/,
              priority: 30,
            },
            {
              name: 'motion',
              test: /node_modules[/\\]framer-motion[/\\]/,
              priority: 20,
            },
            {
              name: 'downshift',
              test: /node_modules[/\\]downshift[/\\]/,
              priority: 20,
            },
            {
              name: 'zustand',
              test: /node_modules[/\\]zustand[/\\]/,
              priority: 20,
            },
            {
              name: 'tailwind',
              test: /node_modules[/\\]tailwind/,
              priority: 20,
            },
            {
              name: 'vendor',
              test: /node_modules[/\\]/,
              priority: 10,
            },
            {
              name: 'common',
              minShareCount: 2,
              minSize: 20 * 1024,
              maxSize: 400 * 1024,
              priority: 5,
            },
          ],
        },
      },
    },
  },
  define: {
    __VERSION__: JSON.stringify(packageVersion) ?? 'error',
    __BRANCH__: JSON.stringify(branch) ?? 'error',
    __COMMIT_HASH__: JSON.stringify(commitHash) ?? 'error',
    __BUILD_TIMESTAMP__: JSON.stringify(new Date().toISOString()),
    __CHANGELOG__: changelog,
  },
});
