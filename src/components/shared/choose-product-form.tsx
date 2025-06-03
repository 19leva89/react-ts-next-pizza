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
			<div className='relative flex w-full flex-1 items-center justify-center'>
				<Image
					src={imageUrl}
					alt={name}
					width={350}
					height={350}
					className='relative top-2 left-2 z-10 transition-all duration-300'
				/>
			</div>

			<div className='flex h-150 w-[490px] flex-col justify-between bg-[#f7f6f5] p-7'>
				<div className='flex flex-col justify-start'>
					<Title text={name} size='md' className='mb-1 font-extrabold' />

					{weight >= 1 && <p className='text-sm text-gray-400'>{details}</p>}

					<p className='text-sm text-gray-400'>{description}</p>
				</div>

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='mt-5 h-[55px] w-full rounded-[18px] px-10 text-base transition-colors duration-300 ease-in-out'
				>
					Додати до кошику за {price} грн
				</Button>
			</div>
		</div>
	)
}
