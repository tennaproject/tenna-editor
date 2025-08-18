import { useEffect, useState, type JSX } from 'react';
import { ToastItem } from './ToastItem';

export type ToastType = 'info' | 'error' | 'success' | 'warning';

export type ToastOptions = [
  message: string | JSX.Element,
  type?: ToastType,
  duration?: number,
  onClose?: () => void,
];

let pushToast: (...args: ToastOptions) => void;
const buffer: ToastOptions[] = [];

export const toast = (...args: ToastOptions) => {
  if (!pushToast) {
    buffer.push(args);
    return;
  }
  pushToast(...args);
};

export const ToastContainer = () => {
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

    pushToast = (message, type, duration, onClose) => {
      const id = crypto.randomUUID();
      type = type ?? 'info';
      duration = duration ?? 5000;

      if (typeof message === 'string') {
        const key = `${type}:${message}`;
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
        { id, message, type, duration, createdAt: performance.now(), onClose },
      ]);
    };

    if (buffer.length) {
      buffer.forEach((args) => pushToast(...args));
      buffer.length = 0;
    }
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
          onClose={() =>
            setToasts((prev) => {
              const item = prev.find((t) => t.id === id);
              item?.onClose?.();
              return prev.filter((t) => t.id !== id);
            })
          }
        />
      ))}
    </div>
  );
};
