import {
  useEffect,
  useRef,
  type JSX,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { ToastType } from '@services';
import InfoIcon from '@assets/icons/info-box.svg?react';
import ErrorIcon from '@assets/icons/alert.svg?react';
import SuccessIcon from '@assets/icons/radio-on.svg?react';
import WarningIcon from '@assets/icons/warning-box.svg?react';
import Markdown from 'react-markdown';
import { stripIdentation } from '@utils';

const COLORS: Record<ToastType, { background: string; text: string }> = {
  info: { background: 'bg-blue', text: 'text-blue' },
  error: { background: 'bg-red', text: 'text-red' },
  success: { background: 'bg-green', text: 'text-green' },
  warning: { background: 'bg-yellow', text: 'text-yellow' },
} as const;

const TEXT_SIZES = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
  xl: 'text-xl',
} as const;

const ICONS: Record<ToastType, JSX.Element> = {
  info: <InfoIcon />,
  error: <ErrorIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
} as const;

interface ToastItemProps {
  message: string | JSX.Element;
  type: ToastType;
  duration: number;
  createdAt: number;
  size?: keyof typeof TEXT_SIZES;
  onClose: () => void;
}

export function ToastItem({
  message,
  type,
  duration,
  createdAt,
  size = 'lg',
  onClose,
}: ToastItemProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<Animation | null>(null);
  const onCloseRef = useRef(onClose);
  const startXRef = useRef(0);
  const dragXRef = useRef(0);
  const draggingRef = useRef(false);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const el = progressRef.current;
    if (!el) return;
    const anim = el.animate(
      [{ transform: 'scaleX(1)' }, { transform: 'scaleX(0)' }],
      { duration, easing: 'linear', fill: 'forwards' },
    );
    animationRef.current = anim;

    const now = performance.now();
    const elapsed = Math.max(0, Math.min(duration, now - createdAt));
    try {
      anim.currentTime = elapsed;
    } catch {
      console.error('Toast animation error');
    }

    if (elapsed >= duration) {
      onCloseRef.current?.();
      return () => {
        anim.cancel();
      };
    }

    const onFinish = () => {
      onCloseRef.current?.();
    };
    anim.addEventListener('finish', onFinish);
    return () => {
      anim.removeEventListener('finish', onFinish);
      anim.cancel();
    };
  }, [duration, createdAt]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    startXRef.current = e.clientX ?? 0;
    dragXRef.current = 0;
    const el = containerRef.current;
    if (el) el.style.transition = 'none';
    animationRef.current?.pause();
    e.currentTarget?.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = (e.clientX ?? 0) - startXRef.current;
    const clamped = Math.max(0, Math.min(240, delta));
    dragXRef.current = clamped;
    const el = containerRef.current;
    if (el) {
      el.style.transform = `translateX(${clamped}px)`;
      el.style.opacity = String(1 - Math.min(0.6, clamped / 160));
    }
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    const x = dragXRef.current;
    const el = containerRef.current;
    const threshold = 80;
    if (x > threshold) {
      onCloseRef.current?.();
      return;
    }
    animationRef.current?.play();
    if (el) {
      el.style.transition = 'transform 200ms ease, opacity 200ms ease';
      el.style.transform = 'translateX(0px)';
      el.style.opacity = '1';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ willChange: 'transform, opacity', touchAction: 'pan-y' }}
    >
      <div className="bg-surface-3 border-b-0 border border-border text-text-1 p-3 w-80">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 ${COLORS[type].text}`}>{ICONS[type]}</div>
          <div className={TEXT_SIZES[size]}>
            {typeof message === 'string' ? (
              <Markdown>{stripIdentation(message)}</Markdown>
            ) : (
              message
            )}
          </div>
        </div>
      </div>
      <div
        ref={progressRef}
        className={`h-1 rounded border-b-1 border-border ${COLORS[type].background}`}
        style={{ transformOrigin: 'left' }}
      />
    </div>
  );
}
