import type { ReactNode } from 'react';
import { mergeClass } from '@utils/merge-class';

const variantClass = {
  primary:
    'bg-red hover:bg-red-active text-text-1 border border-[color-mix(in_oklch,var(--color-red)_70%,black)]',
  secondary: 'bg-surface-4 hover:bg-surface-4-active text-text-1',
  ghost:
    'bg-transparent hover:bg-surface-3-active text-text-2 hover:text-text-1 border border-border',
};

const sizeClass = {
  sm: 'px-2 py-1 text-sm gap-1.5',
  md: 'px-3 py-2 text-sm gap-2',
  lg: 'px-4 py-2 text-base gap-2',
};

const iconSizeClass = {
  sm: 'w-4 h-4',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'start' | 'end';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  variant = 'ghost',
  size = 'md',
  icon,
  iconPosition = 'start',
  children,
  onClick,
  className = '',
  disabled = false,
  ...props
}: ButtonProps & { 'aria-label'?: string }) {
  return (
    <button
      type="button"
      className={mergeClass(
        'motion-reduce:transition-none transition-colors disabled:opacity-50 inline-flex items-center justify-center leading-none',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={props['aria-label']}
      {...props}
    >
      {icon && iconPosition === 'start' && (
        <span className={mergeClass('shrink-0', iconSizeClass[size])}>
          {icon}
        </span>
      )}
      <span className="relative -top-px leading-none">{children}</span>
      {icon && iconPosition === 'end' && (
        <span className={mergeClass('shrink-0', iconSizeClass[size])}>
          {icon}
        </span>
      )}
    </button>
  );
}
