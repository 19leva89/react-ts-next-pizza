import { cn } from '@/lib'
import { CountIconButton } from '@/components/shared'

export interface CountButtonProps {
	value: number
	size?: 'sm' | 'lg'
	onClick?: (type: 'plus' | 'minus') => void
	className?: string
}

export const CountButton = ({ value = 1, size = 'sm', onClick, className }: CountButtonProps) => {
	return (
		<div className={cn('inline-flex items-center justify-between gap-3', className)}>
			<CountIconButton disabled={value === 1} size={size} type='minus' onClick={() => onClick?.('minus')} />

			<b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

			<CountIconButton onClick={() => onClick?.('plus')} size={size} type='plus' />
		</div>
	)
}
