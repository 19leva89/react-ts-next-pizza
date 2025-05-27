import { Minus, Plus } from 'lucide-react'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { CountButtonProps } from './count-button'

interface Props {
	size: CountButtonProps['size']
	disabled?: boolean
	type?: 'plus' | 'minus'
	onClick?: () => void
}

export const CountIconButton = ({ size = 'sm', disabled, type, onClick }: Props) => {
	return (
		<Button
			variant="outline"
			disabled={disabled}
			onClick={!disabled ? onClick : undefined}
			type="button"
			className={cn(
				'p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-400 disabled:text-gray-400 disabled:pointer-events-auto disabled:cursor-not-allowed transition-colors ease-in-out duration-300',
				size === 'sm' ? 'size-[30px] rounded-[10px]' : 'size-[38px] rounded-md',
			)}
		>
			{type === 'plus' ? (
				<Plus className={size === 'sm' ? 'h-4' : 'h-5'} />
			) : (
				<Minus className={size === 'sm' ? 'h-4' : 'h-5'} />
			)}
		</Button>
	)
}
