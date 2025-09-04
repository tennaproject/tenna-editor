import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClass(...inputs: ClassValue[]): string | undefined {
  const merged = twMerge(clsx(inputs));
  if (merged.length > 0) return merged;

  return;
}
