import Image from 'next/image'
import { CircleCheck } from 'lucide-react'

import { cn } from '@/lib'

interface Props {
	name: string
	price: number
	imageUrl: string
	active?: boolean
	onClick?: () => void
	className?: string
}

export const IngredientItem = ({ name, price, imageUrl, active, onClick, className }: Props) => {
	return (
		<div
			className={cn(
				'relative flex w-32 cursor-pointer flex-col items-center rounded-md border border-transparent bg-white p-1 text-center shadow-md',
				{ 'border-primary': active },
				className,
			)}
			onClick={onClick}
		>
			{active && <CircleCheck className='absolute top-2 right-2 text-primary' />}

			<Image width={110} height={110} src={imageUrl} alt={name} />

			<span className='mb-1 text-xs'>{name}</span>

			<span className='font-bold'>{price} грн</span>
		</div>
	)
}
