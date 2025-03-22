import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type FormatNumberOptions = {
  notation?: 'compact' | 'standard';
  currency?: boolean;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, options: FormatNumberOptions = {}): string {
  const { notation = 'standard', currency = false } = options;
  
  if (notation === 'compact' && value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  
  const formatted = value.toLocaleString();
  return currency ? `$${formatted}` : formatted;
}

export function formatViews(value: number): string {
  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k';
  }
  return value.toString();
}
