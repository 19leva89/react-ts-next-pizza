import { useCallback, useEffect, useRef, useState } from 'react'

export function useDebounce<T>(value: T, delay?: number): T {
	const [debounceValue, setDebounceValue] = useState<T>(value)

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounceValue(value)
		}, delay || 500)

		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])

	return debounceValue
}

// Hook for debouncing callbacks
export function useDebouncedCallback<T extends (...args: any[]) => void>(
	callback: T,
	delay: number = 500,
): T {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	return useCallback(
		((...args: Parameters<T>) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}

			timeoutRef.current = setTimeout(() => {
				callback(...args)
			}, delay)
		}) as T,
		[callback, delay],
	)
}
