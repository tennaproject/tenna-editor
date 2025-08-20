import type { JSX } from 'react';

export type ToastType = 'info' | 'error' | 'success' | 'warning';

export type ToastOptions = [
  message: string | JSX.Element,
  type?: ToastType,
  duration?: number,
  onClose?: () => void,
];

let pushToast: ((...args: ToastOptions) => void) | undefined;
const toastBuffer: ToastOptions[] = [];

export function toast(...args: ToastOptions) {
  if (!pushToast) {
    toastBuffer.push(args);
    return;
  }
  pushToast(...args);
}

export function registerToastDispatcher(fn: (...args: ToastOptions) => void) {
  pushToast = fn;
  if (toastBuffer.length) {
    toastBuffer.forEach((args) => pushToast?.(...args));
    toastBuffer.length = 0;
  }
}

export function unregisterToastDispatcher() {
  pushToast = undefined;
}
