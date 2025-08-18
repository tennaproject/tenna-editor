import type { ReactNode } from 'react';

interface TextLabelProps {
  className?: string;
  children?: ReactNode;
}

export function TextLabel({ children, className = '' }: TextLabelProps) {
  const customClass = className ? ` ${className}` : '';
  return (
    <label className={`block text-sm text-text-2 mb-2${customClass}`}>
      {children}
    </label>
  );
}
