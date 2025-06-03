import { ReactNode } from 'react'

import { cn } from '@/lib'

interface Props {
	title?: ReactNode
	value?: ReactNode
	className?: string
}

export const CheckoutItemDetails = ({ title, value, className }: Props) => {
	return (
		<div className={cn('my-4 flex', className)}>
			<span className='flex flex-1 text-lg text-neutral-500'>
				{title}
				<div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
			</span>

			<span className='text-lg font-bold'>{value}</span>
		</div>
	)
}
