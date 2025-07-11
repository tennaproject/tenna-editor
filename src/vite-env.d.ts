/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_OLD_UI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
