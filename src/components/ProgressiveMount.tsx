import { useEffect, useState, type ReactNode } from 'react';

interface ProgressiveMountProps {
  children: ReactNode;
  delayMs?: number;
  fallback?: ReactNode;
}

export function ProgressiveMount({
  children,
  delayMs = 0,
  fallback = null,
}: ProgressiveMountProps) {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    if (delayMs > 0) {
      const id = window.setTimeout(() => setMounted(true), delayMs);
      return () => window.clearTimeout(id);
    }

    if (window.requestIdleCallback) {
      const id = window.requestIdleCallback(() => setMounted(true), {
        timeout: 500,
      });
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return isMounted ? children : fallback;
}
