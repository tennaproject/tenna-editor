import { useEffect } from 'react';

interface ShortcutHandlers {
  onUpload?: () => void;
  onDownload?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      // Don't intercept when typing in inputs (except for undo/redo)
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      switch (e.key.toLowerCase()) {
        case 's':
          if (!isInput) {
            e.preventDefault();
            handlers.onDownload?.();
          }
          break;
        case 'o':
          if (!isInput) {
            e.preventDefault();
            handlers.onUpload?.();
          }
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            handlers.onRedo?.();
          } else {
            handlers.onUndo?.();
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
