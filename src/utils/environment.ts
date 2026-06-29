export type AppEnvironment = 'DEV' | 'PREVIEW' | 'PRODUCTION' | 'UNKNOWN';

export function getAppEnvironment(): AppEnvironment {
  if (import.meta.env.DEV) return 'DEV';
  if (import.meta.env.VITE_DEPLOY_TARGET === 'preview') return 'PREVIEW';
  if (import.meta.env.VITE_DEPLOY_TARGET === 'production') return 'PRODUCTION';
  return 'UNKNOWN';
}
