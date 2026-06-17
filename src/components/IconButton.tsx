import type { ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';

type IconButtonAccent = 'green' | 'blue' | 'neutral';

const accentClass: Record<IconButtonAccent, string> = {
  green: 'text-green',
  blue: 'text-blue',
  neutral: 'text-text-2',
};

interface IconButtonProps {
  icon: ReactNode;
  label: string;
  accent?: IconButtonAccent;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  label,
  accent = 'neutral',
  onClick,
  disabled = false,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={mergeClass(
        'ui-icon-btn',
        accentClass[accent],
        disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
        className,
      )}
      onClick={onClick}
    >
      <div className="w-6 h-6">{icon}</div>
    </button>
  );
}