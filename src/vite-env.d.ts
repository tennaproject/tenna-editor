/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SETTINGS_TAB: string;
  readonly VITE_DEVTOOLS_TAB: string;
  readonly VITE_DEPLOY_TARGET?: 'preview' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
