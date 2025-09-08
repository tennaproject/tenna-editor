import { useRef, useState, useEffect, type ReactNode } from 'react';
import { Heading } from './Heading';
import LightbulbIcon from '@assets/icons/lightbulb-on.svg?react';
import { Modal } from './Modal';

interface HelpTipProps {
  title?: string;
  children?: ReactNode;
}

export function HelpTip({ title, children }: HelpTipProps) {
  const [isOpen, setOpen] = useState(false);
  const [isSupressed, setSuppression] = useState(false);
  const tipTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (tipTimerRef.current) {
        window.clearTimeout(tipTimerRef.current);
      }
    };
  }, []);

  function onClose() {
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
        onClick={() => setOpen(true)}
        className="inline-flex w-6 h-6 select-none leading-none justify-center items-center"
      >
        <span
          className={`${isOpen ? 'text-text-1' : 'text-text-2'} hover:text-text-1 focus-visible:text-text-1 transition-all duration-200 ease-in-out flex-1 inline-flex items-center justify-center`}
        >
          <LightbulbIcon />
        </span>
      </button>

      {!isOpen && !isSupressed && (
        <div className="hidden lg:inline absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none z-[70]">
          <div className="border border-border bg-surface-3 px-2 py-1 shadow-lg whitespace-nowrap text-text-1 text-xs">
            Click to show description
          </div>
        </div>
      )}

      <Modal isOpen={isOpen} setOpen={setOpen} onClose={onClose}>
        <div className="flex flex-col gap-3">
          <Heading level={6}>{title}</Heading>
          <div className="text-text-2">{children}</div>
        </div>
      </Modal>
    </div>
  );
}
