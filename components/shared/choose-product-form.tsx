import { FC } from 'react'
import Image from 'next/image'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { Title } from '@/components/shared'

interface Props {
	name: string
	price: number
	imageUrl: string
	loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

/**
 * PRODUCT selection form
 */
export const ChooseProductForm: FC<Props> = ({ name, price, imageUrl, loading, onSubmit, className }) => {
	return (
		<div className={cn(className, 'flex flex-1')}>
			<div className="flex items-center justify-center flex-1 relative w-full">
				<Image
					src={imageUrl}
					alt={name}
					width={350}
					height={350}
					className="relative left-2 top-2 transition-all z-10 duration-300"
				/>
			</div>

			<div className="w-[490px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
				>
					Додати до кошику за {price} грн
				</Button>
			</div>
		</div>
	)
}
