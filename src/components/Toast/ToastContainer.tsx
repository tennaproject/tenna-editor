import { useEffect, useState, type JSX } from 'react';
import { ToastItem } from './ToastItem';
import {
  registerToastDispatcher,
  unregisterToastDispatcher,
  type ToastType,
} from '@services';

export function ToastContainer() {
  const [toasts, setToasts] = useState<
    {
      id: string;
      type: ToastType;
      message: string | JSX.Element;
      duration: number;
      createdAt: number;
      onClose?: () => void;
    }[]
  >([]);

  useEffect(() => {
    // Toasts deduplication
    const recent = new Map<string, number>();
    const DEDUPE_WINDOW = 1000; // ms

    registerToastDispatcher((message, type, duration, onClose) => {
      const id = crypto.randomUUID();
      const resolvedType: ToastType = type ?? 'info';
      const resolvedDuration = duration ?? 5000;

      if (typeof message === 'string') {
        const key = `${resolvedType}:${message}`;
        const now = performance.now();
        const last = recent.get(key);
        if (last && now - last < DEDUPE_WINDOW) {
          // ignore duplicate toast within the window
          return;
        }
        recent.set(key, now);
        for (const [k, t] of recent) {
          if (now - t > DEDUPE_WINDOW) recent.delete(k);
        }
      }

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          type: resolvedType,
          duration: resolvedDuration,
          createdAt: performance.now(),
          onClose,
        },
      ]);
    });

    return () => {
      unregisterToastDispatcher();
    };
  }, []);

  return (
    <div className="fixed top-16 right-3 z-50 flex flex-col gap-2">
      {toasts.map(({ id, message, type, duration, createdAt }) => (
        <ToastItem
          key={id}
          message={message}
          type={type}
          duration={duration}
          createdAt={createdAt}
          onClose={() => {
            setToasts((prev) => {
              const item = prev.find((t) => t.id === id);
              item?.onClose?.();
              return prev.filter((t) => t.id !== id);
            });
          }}
        />
      ))}
    </div>
  );
}
