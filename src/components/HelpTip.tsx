import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Heading } from './Heading';
import { motion, AnimatePresence } from 'framer-motion';
import LightbulbIcon from '@assets/icons/lightbulb-on.svg';
import CloseIcon from '@assets/icons/close.svg';

const transition = {
  type: 'tween',
  duration: 0.2,
  ease: 'easeInOut',
} as const;

interface HelpTipProps {
  title?: string;
  children?: ReactNode;
}

export function HelpTip({ title, children }: HelpTipProps) {
  const [isOpen, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [isSupressed, setSuppression] = useState(false);
  const tipTimerRef = useRef<number | null>(null);

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

  useEffect(() => {
    return () => {
      if (tipTimerRef.current) {
        window.clearTimeout(tipTimerRef.current);
      }
    };
  }, []);

  function closeModal() {
    setOpen(false);
    setSuppression(true);
    if (tipTimerRef.current) window.clearTimeout(tipTimerRef.current);
    tipTimerRef.current = window.setTimeout(() => setSuppression(false), 500);
  }

  return (
    <div
      className="relative inline-flex group"
      onMouseLeave={() => {
        setSuppression(false);
      }}
    >
      <button
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => {
          if (isOpen) {
            closeModal();
          } else {
            setOpen(true);
          }
        }}
        className="inline-flex w-6 h-6 select-none leading-none justify-center items-center"
      >
        <span
          className={`${isOpen ? 'text-text-1' : 'text-text-2'} hover:text-text-1 focus-visible:text-text-1 transition-all duration-200 ease-in-out flex-1 inline-flex items-center justify-center`}
        >
          <LightbulbIcon />
        </span>
      </button>

      {!isOpen && !isSupressed && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none z-[70]">
          <div className="border border-border bg-surface-3 px-2 py-1 shadow-lg whitespace-nowrap text-text-1 text-xs">
            Click to show description
          </div>
        </div>
      )}

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
              onClick={closeModal}
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
                  onClick={closeModal}
                >
                  <span className="w-4 h-4">
                    <CloseIcon />
                  </span>
                </button>
                <div className="flex flex-col gap-3">
                  <Heading level={6}>{title}</Heading>
                  <div className="text-text-2">{children}</div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
