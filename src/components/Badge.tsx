import type { ReactNode } from 'react';
import { mergeClass } from '@utils';

export type BadgeTone = 'neutral' | 'red' | 'yellow' | 'green' | 'blue';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  size?: BadgeSize;
  className?: string;
  title?: string;
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'border-border-2 bg-surface-3 text-text-2',
  red: 'border-red bg-red-soft text-red',
  yellow: 'border-yellow/40 bg-yellow-soft text-text-1',
  green: 'border-green/40 bg-green-soft text-green',
  blue: 'border-blue/40 bg-blue-soft text-blue',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'h-6 px-2 text-xs',
  md: 'h-10 px-2.5 text-sm',
};

export function Badge({
  children,
  tone = 'neutral',
  size = 'sm',
  className,
  title,
}: BadgeProps) {
  return (
    <span
      className={mergeClass(
        'inline-flex shrink-0 items-center border font-black leading-none',
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
      title={title}
    >
      {children}
    </span>
  );
}
