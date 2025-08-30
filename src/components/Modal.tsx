import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, type ReactNode } from 'react';
import CloseIcon from '@assets/icons/close.svg';

const transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut',
} as const;

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setOpen: (state: boolean) => void;
  onClose?: () => void;
}

export function Modal({ children, isOpen, setOpen, onClose }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Prevent background scroll
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-overlay backdrop-blur-[1px] z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
            onClick={() => {
              if (onClose) onClose();
              setOpen(false);
            }}
          />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={transition}
            role="dialog"
            aria-modal="true"
            aria-hidden={!isOpen}
          >
            <div className="pointer-events-auto relative max-w-3xl w-full border border-border bg-surface-2 p-6  overflow-y-auto">
              <button
                type="button"
                aria-label="Close"
                className="absolute top-2 right-2 inline-flex items-center justify-center w-6 h-6 transition-all duration-200 text-text-2 hover:text-text-1"
                onClick={() => {
                  if (onClose) onClose();
                  setOpen(false);
                }}
              >
                <span className="w-4 h-4">
                  <CloseIcon />
                </span>
              </button>
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
