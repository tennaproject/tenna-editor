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

export const toast = (...args: ToastOptions) => {
  if (!pushToast) {
    throw new Error('Toast not initialized');
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
    pushToast = (message, type, duration, onClose) => {
      const id = crypto.randomUUID();
      type = type ?? 'info';
      duration = duration ?? 5000;
      setToasts((prev) => [
        ...prev,
        { id, message, type, duration, createdAt: performance.now(), onClose },
      ]);
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
