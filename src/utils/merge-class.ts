import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function mergeClass(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
