import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface FitToViewportProps {
  as?: 'article' | 'div';
  children?: ReactNode;
  className?: string;
  minScale?: number;
}

export function FitToViewport({
  as = 'div',
  children,
  className,
  minScale = 0.6,
}: FitToViewportProps) {
  const elementRef = useRef<HTMLElement>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const element = elementRef.current;
    const viewport = element?.closest<HTMLElement>('[data-page-content]');
    if (!element || !viewport) return;

    const desktop = window.matchMedia('(width >= 64rem)');
    const minimumScale = Math.min(1, Math.max(0.6, minScale));
    let animationFrame = 0;

    const measure = () => {
      let nextScale = 1;

      if (desktop.matches) {
        const viewportRect = viewport.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();
        const elementTop =
          elementRect.top - viewportRect.top + viewport.scrollTop;
        const availableHeight = viewport.clientHeight - elementTop;
        const naturalHeight = element.offsetHeight;

        if (availableHeight > 0 && naturalHeight > 0) {
          nextScale = Math.min(
            1,
            Math.max(minimumScale, availableHeight / naturalHeight),
          );
        }
      }

      nextScale = Math.round(nextScale * 1000) / 1000;
      if (Math.abs(nextScale - scaleRef.current) < 0.005) return;

      scaleRef.current = nextScale;
      setScale(nextScale);
    };

    const scheduleMeasure = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(measure);
    };

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(element);
    resizeObserver.observe(viewport);
    desktop.addEventListener('change', scheduleMeasure);
    window.addEventListener('resize', scheduleMeasure);
    measure();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      desktop.removeEventListener('change', scheduleMeasure);
      window.removeEventListener('resize', scheduleMeasure);
    };
  }, [minScale]);

  const Element = as;

  return (
    <Element
      ref={(element) => {
        elementRef.current = element;
      }}
      className={className}
      data-fit-to-viewport=""
      data-fit-scale={scale < 1 ? scale : undefined}
      style={{ zoom: scale }}
    >
      {children}
    </Element>
  );
}
