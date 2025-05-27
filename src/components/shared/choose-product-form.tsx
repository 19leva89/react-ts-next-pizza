import Image from 'next/image'

import { Button } from '@/components/ui'
import { Title } from '@/components/shared'
import { cn, getProductDetails } from '@/lib'

interface Props {
	name: string
	description?: string
	price: number
	weight: number
	imageUrl: string
	loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

/**
 * PRODUCT selection form
 */
export const ChooseProductForm = ({
	name,
	description,
	price,
	weight,
	imageUrl,
	loading,
	onSubmit,
	className,
}: Props) => {
	const { details } = getProductDetails(weight)

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

			<div className="flex flex-col justify-between w-[490px] h-150 p-7 bg-[#f7f6f5]">
				<div className="flex flex-col justify-start">
					<Title text={name} size="md" className="font-extrabold mb-1" />

					{weight >= 1 && <p className="text-gray-400 text-sm">{details}</p>}

					<p className="text-sm text-gray-400">{description}</p>
				</div>

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5 transition-colors ease-in-out duration-300"
				>
					Додати до кошику за {price} грн
				</Button>
			</div>
		</div>
	)
}
