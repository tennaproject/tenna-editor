import { mergeClass } from '@utils';

const variantClass = {
  primary: 'bg-red hover:bg-red-active text-text-1',
  secondary: 'bg-surface-4 hover:bg-surface-4-active text-text-1',
  ghost:
    'bg-transparent hover:bg-surface-3-active text-text-2 hover:text-text-1 border border-border ',
};

const sizeClass = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-sm',
  lg: 'px-4 py-2 text-base',
};

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  variant = 'ghost',
  size = 'md',
  children,
  onClick,
  className = '',
  disabled = false,
  fullWidth = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type='button'
      className={mergeClass(
        'transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center',
        variantClass[variant],
        sizeClass[size],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
