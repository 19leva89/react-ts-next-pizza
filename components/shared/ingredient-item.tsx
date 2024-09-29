import { FC } from 'react'
import Image from 'next/image'
import { CircleCheck } from 'lucide-react'

import { cn } from '@/lib'

interface Props {
	imageUrl: string
	name: string
	price: number
	active?: boolean
	onClick?: () => void
	className?: string
}

export const IngredientItem: FC<Props> = ({ className, active, price, name, imageUrl, onClick }) => {
	return (
		<div
			className={cn(
				'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent',
				{ 'border-primary': active },
				className,
			)}
			onClick={onClick}
		>
			{active && <CircleCheck className="absolute top-2 right-2 text-primary" />}

			<Image width={110} height={110} src={imageUrl} alt="ingredient" />

			<span className="text-xs mb-1">{name}</span>

			<span className="font-bold">{price} ₽</span>
		</div>
	)
}
