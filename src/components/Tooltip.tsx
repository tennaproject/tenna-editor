import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { mergeClass } from '@utils/merge-class';

interface TooltipProps {
  content?: ReactNode;
  children: ReactNode;
  className?: string;
  focusable?: boolean;
  widthClassName?: string; // Overrides PANEL_WIDTH for a specific tooltip
}

const OPEN_DELAY_MS = 250;
const CLOSE_DELAY_MS = 100;
const PANEL_WIDTH = 'w-84';
const GAP_PX = 8;
const VIEWPORT_MARGIN_PX = 8;
const FIT_TOLERANCE_PX = 2;

// portalled to body so tab skips it
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement | null) {
  if (!root) return [];
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
}

interface PanelPosition {
  top: number;
  left: number;
  maxHeight: number;
  openUp: boolean;
}

export function Tooltip({
  content,
  children,
  className,
  focusable = true,
  widthClassName,
}: TooltipProps) {
  const tooltipId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<PanelPosition | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const isEnabled = !!content;
  const isVisible = isEnabled && isOpen;

  const updatePosition = useCallback(() => {
    const trigger = containerRef.current;
    const panel = panelRef.current;
    if (!trigger || !panel) return;

    const rect = trigger.getBoundingClientRect();
    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.scrollHeight + panel.clientTop * 2;

    const spaceBelow =
      window.innerHeight - rect.bottom - GAP_PX - VIEWPORT_MARGIN_PX;
    const spaceAbove = rect.top - GAP_PX - VIEWPORT_MARGIN_PX;

    let openUp: boolean;
    if (panelHeight <= spaceBelow + FIT_TOLERANCE_PX) {
      openUp = false;
    } else if (panelHeight <= spaceAbove + FIT_TOLERANCE_PX) {
      openUp = true;
    } else {
      openUp = spaceAbove > spaceBelow;
    }

    const maxHeight = Math.max(
      Math.ceil((openUp ? spaceAbove : spaceBelow) + FIT_TOLERANCE_PX),
      96,
    );
    const shownHeight = Math.min(panelHeight, maxHeight);

    const adjacentTop = openUp ? rect.top - shownHeight - GAP_PX : rect.bottom;

    const top = Math.min(
      Math.max(adjacentTop, VIEWPORT_MARGIN_PX),
      Math.max(
        window.innerHeight - shownHeight - VIEWPORT_MARGIN_PX,
        VIEWPORT_MARGIN_PX,
      ),
    );
    const left = Math.min(
      Math.max(rect.left + rect.width / 2 - panelWidth / 2, VIEWPORT_MARGIN_PX),
      Math.max(
        window.innerWidth - panelWidth - VIEWPORT_MARGIN_PX,
        VIEWPORT_MARGIN_PX,
      ),
    );

    const next = { top, left, maxHeight, openUp };
    // eslint-disable-next-line @eslint-react/set-state-in-effect
    setPosition((prev) =>
      prev &&
      prev.top === next.top &&
      prev.left === next.left &&
      prev.maxHeight === next.maxHeight &&
      prev.openUp === next.openUp
        ? prev
        : next,
    );
  }, []);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line @eslint-react/set-state-in-effect
      setPosition(null);
      return;
    }

    updatePosition();

    const panel = panelRef.current;
    const observer = new ResizeObserver(updatePosition);
    if (panel) observer.observe(panel);

    let frame = 0;
    function onScrollOrResize() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    }

    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isVisible, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    // Touch also opens the tooltip
    function onPointerDownOutside(event: PointerEvent) {
      if (contains(event.target as Node)) return;
      setIsOpen(false);
    }

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('pointerdown', onPointerDownOutside);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('pointerdown', onPointerDownOutside);
    };
  }, [isOpen]);

  function contains(node: Node | null) {
    if (!node) return false;
    return (
      !!containerRef.current?.contains(node) ||
      !!wrapperRef.current?.contains(node)
    );
  }

  function open() {
    if (!isEnabled) return;
    setIsOpen(true);
  }

  function clearTimers() {
    if (openTimerRef.current) window.clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }

  function scheduleOpen() {
    if (!isEnabled) return;
    clearTimers();
    openTimerRef.current = window.setTimeout(open, OPEN_DELAY_MS);
  }

  function scheduleClose() {
    clearTimers();
    closeTimerRef.current = window.setTimeout(
      () => setIsOpen(false),
      CLOSE_DELAY_MS,
    );
  }

  function close() {
    clearTimers();
    setIsOpen(false);
  }

  function onBlur(event: FocusEvent) {
    if (contains(event.relatedTarget)) return;
    close();
  }

  function focusAfterTrigger() {
    const trigger = containerRef.current;
    if (!trigger) return;

    const order = getFocusable(document.body).filter(
      (element) => !wrapperRef.current?.contains(element),
    );
    const index = order.indexOf(trigger);
    if (index >= 0) order[index + 1]?.focus();
  }

  function onTriggerKeyDown(event: ReactKeyboardEvent) {
    if (event.key !== 'Tab' || event.shiftKey) return;
    if (!isVisible || event.target !== containerRef.current) return;

    const [first] = getFocusable(wrapperRef.current);
    if (!first) return;

    event.preventDefault();
    first.focus();
  }

  function onPanelKeyDown(event: ReactKeyboardEvent) {
    if (event.key !== 'Tab') return;

    const focusables = getFocusable(wrapperRef.current);
    if (!focusables.length) return;

    const active = document.activeElement;

    if (event.shiftKey && active === focusables[0]) {
      event.preventDefault();
      containerRef.current?.focus();
      return;
    }

    if (!event.shiftKey && active === focusables[focusables.length - 1]) {
      event.preventDefault();
      close();
      focusAfterTrigger();
    }
  }

  return (
    <div
      ref={containerRef}
      className={mergeClass('relative inline-flex', className)}
      aria-describedby={isVisible ? tooltipId : undefined}
      tabIndex={focusable && isEnabled ? 0 : undefined}
      onMouseEnter={scheduleOpen}
      onMouseLeave={scheduleClose}
      onFocus={focusable ? open : undefined}
      onBlur={focusable ? onBlur : undefined}
      onKeyDown={focusable ? onTriggerKeyDown : undefined}
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

      {isVisible &&
        createPortal(
          <div
            ref={wrapperRef}
            className={mergeClass(
              'fixed z-[70] max-w-[calc(100vw-16px)]',
              widthClassName ?? PANEL_WIDTH,
              position?.openUp ? 'pb-2' : 'pt-2',
            )}
            style={{
              top: position?.top ?? 0,
              left: position?.left ?? 0,
              visibility: position ? 'visible' : 'hidden',
            }}
            onPointerDown={(event) => event.stopPropagation()}
            onMouseEnter={clearTimers}
            onMouseLeave={scheduleClose}
            onBlur={onBlur}
            onKeyDown={onPanelKeyDown}
          >
            <div
              ref={panelRef}
              id={tooltipId}
              role="tooltip"
              style={{ maxHeight: position?.maxHeight }}
              className="cursor-default overflow-y-auto border border-border bg-surface-3 px-3 py-2 text-left shadow-lg"
            >
              {content}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
