import { Delete } from 'lucide-react'

import { cn } from '@/lib'

interface Props {
	className?: string
	onClick?: VoidFunction
}

export const ClearButton = ({ onClick, className }: Props) => {
	return (
		<button
			onClick={onClick}
			type='button'
			className={cn(
				'absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer opacity-30 transition duration-300 ease-in-out hover:opacity-100',
				className,
			)}
		>
			<Delete className='size-5' />
		</button>
	)
}
