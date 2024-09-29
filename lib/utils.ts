import { twMerge } from 'tailwind-merge'
import { clsx, type ClassValue } from 'clsx'

/**
 * Combines multiple class names into a single string, merging Tailwind CSS classes
 * and resolving any conflicting styles.
 *
 * @param inputs - A variable number of class names or conditionally applied class names.
 *
 * @returns A single string containing all the merged class names.
 */

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
