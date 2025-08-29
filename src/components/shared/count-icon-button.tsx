import { MinusIcon, PlusIcon } from 'lucide-react'

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
			type='button'
			variant='outline'
			disabled={disabled}
			onClick={!disabled ? onClick : undefined}
			className={cn(
				'p-0 transition-colors duration-300 ease-in-out hover:bg-primary hover:text-white disabled:pointer-events-auto disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-white disabled:text-gray-400',
				size === 'sm' ? 'size-[30px] rounded-[10px]' : 'size-[38px] rounded-md',
			)}
		>
			{type === 'plus' ? (
				<PlusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
			) : (
				<MinusIcon className={size === 'sm' ? 'h-4' : 'h-5'} />
			)}
		</Button>
	)
}
