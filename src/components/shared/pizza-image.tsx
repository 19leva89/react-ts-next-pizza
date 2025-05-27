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
		<div className={cn('flex items-center justify-center flex-1 relative w-full', className)}>
			<Image
				src={imageUrl}
				alt={name}
				width={size === 20 ? 300 : size === 30 ? 400 : 500}
				height={size === 20 ? 300 : size === 30 ? 400 : 500}
				className="z-10 relative left-2 top-2 transition-all ease-in-out duration-300"
			/>

			{/* Decorative circles */}
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 size-[450px]" />
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 size-[370px]" />
		</div>
	)
}
