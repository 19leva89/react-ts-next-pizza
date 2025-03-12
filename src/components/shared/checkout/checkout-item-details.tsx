import { ReactNode } from 'react'

import { cn } from '@/lib'

interface Props {
	title?: ReactNode
	value?: ReactNode
	className?: string
}

export const CheckoutItemDetails = ({ title, value, className }: Props) => {
	return (
		<div className={cn('flex my-4', className)}>
			<span className="flex flex-1 text-lg text-neutral-500">
				{title}
				<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
			</span>

			<span className="font-bold text-lg">{value}</span>
		</div>
	)
}
