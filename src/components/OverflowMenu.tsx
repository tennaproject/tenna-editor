import { useEffect, useRef, useState, type ReactNode } from 'react';
import MoreIcon from '@assets/icons/more-horizontal.svg?react';
import { mergeClass } from '@utils/merge-class';
import { IconButton } from './IconButton';

export interface OverflowMenuItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  onSelect: () => void;
}

interface OverflowMenuProps {
  label: string;
  items: OverflowMenuItem[];
  className?: string;
}

export function OverflowMenu({ label, items, className }: OverflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={mergeClass('relative flex', className)}>
      <IconButton
        accent="neutral"
        label={label}
        icon={<MoreIcon />}
        onClick={() => setIsOpen((open) => !open)}
      />

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1 min-w-40 border border-border bg-surface-3 py-1 shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setIsOpen(false);
                item.onSelect();
              }}
              className={mergeClass(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-text-1',
                'motion-reduce:transition-none transition-colors hover:bg-surface-3-hover',
                'outline-none focus:bg-surface-3-hover',
                item.disabled && 'opacity-40 pointer-events-none',
              )}
            >
              {item.icon && <span className="h-5 w-5">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
