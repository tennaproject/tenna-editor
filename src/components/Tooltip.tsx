import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';

interface TooltipProps {
  content?: ReactNode;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
  widthClassName?: string; // Overrides PANEL_WIDTH for a specific tooltip
}

const OPEN_DELAY_MS = 250;
const ESTIMATED_HEIGHT = 180;
const PANEL_WIDTH = 'w-80';

export function Tooltip({
  content,
  children,
  className,
  focusable = true,
  widthClassName,
}: TooltipProps) {
  const tooltipId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldOpenUp, setShouldOpenUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);

  const isEnabled = !!content;

  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    // Touch also opens the tooltip
    function onPointerDownOutside(event: PointerEvent) {
      if (containerRef.current?.contains(event.target as Node)) return;
      setIsOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDownOutside);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDownOutside);
    };
  }, [isOpen]);

  const isVisible = isEnabled && isOpen;

  function open() {
    if (!isEnabled) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const spaceBelow = window.innerHeight - rect.bottom;
      setShouldOpenUp(spaceBelow < ESTIMATED_HEIGHT && rect.top > spaceBelow);
    }

    setIsOpen(true);
  }

  function scheduleOpen() {
    if (!isEnabled) return;
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(open, OPEN_DELAY_MS);
  }

  function close() {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    setIsOpen(false);
  }

  return (
    <div
      ref={containerRef}
      className={mergeClass('relative inline-flex', className)}
      aria-describedby={isVisible ? tooltipId : undefined}
      tabIndex={focusable && isEnabled ? 0 : undefined}
      onMouseEnter={scheduleOpen}
      onMouseLeave={close}
      onFocus={focusable ? open : undefined}
      onBlur={focusable ? close : undefined}
      onPointerDown={(event) => {
        if (event.pointerType !== 'touch') return;
        if (isOpen) {
          close();
          return;
        }
        open();
      }}
    >
      {children}

      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={mergeClass(
            'absolute left-1/2 -translate-x-1/2 z-[70] max-w-[90vw] cursor-default border border-border bg-surface-3 px-3 py-2 text-left shadow-lg',
            widthClassName ?? PANEL_WIDTH,
            shouldOpenUp ? 'bottom-full mb-2' : 'top-full mt-2',
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
