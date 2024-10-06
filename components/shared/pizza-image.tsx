import { FC } from 'react'
import Image from 'next/image'

import { cn } from '@/lib'

interface Props {
	name: string
	size: 20 | 30 | 40
	imageUrl: string
	className?: string
}

export const PizzaImage: FC<Props> = ({ name, size, imageUrl, className }) => {
	return (
		<div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
			<Image
				src={imageUrl}
				alt={name}
				width={size === 20 ? 300 : size === 30 ? 400 : 500}
				height={size === 20 ? 300 : size === 30 ? 400 : 500}
				className={cn('relative left-2 top-2 transition-all z-10 duration-300')}
			/>

			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
		</div>
	)
}
