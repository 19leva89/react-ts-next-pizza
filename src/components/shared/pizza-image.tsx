import Image from 'next/image'

import { cn } from '@/lib'

interface Props {
	name: string
	size: 20 | 30 | 40
	imageUrl: string
	className?: string
}

export const PizzaImage = ({ name, size, imageUrl, className }: Props) => {
	return (
		<div className={cn('relative flex w-full flex-1 items-center justify-center', className)}>
			<Image
				src={imageUrl}
				alt={name}
				width={size === 20 ? 300 : size === 30 ? 400 : 500}
				height={size === 20 ? 300 : size === 30 ? 400 : 500}
				className='relative top-2 left-2 z-10 transition-all duration-300 ease-in-out'
			/>

			{/* Decorative circles */}
			<div className='absolute top-1/2 left-1/2 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-gray-200' />
			<div className='absolute top-1/2 left-1/2 size-[370px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dotted border-gray-100' />
		</div>
	)
}
