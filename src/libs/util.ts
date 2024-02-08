import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * @returns merged Tailwind CSS classes and removes 
 * any duplicate classes while avoiding styling conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isMac = typeof window !== 'undefined' ? navigator.userAgent.toUpperCase().indexOf('MAC') >= 0 : false
