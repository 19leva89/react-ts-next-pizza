'use client'

import { XIcon } from 'lucide-react'

import { cn } from '@/lib'
import * as CartItemDetails from '@/components/shared/cart-item-details'
import { CartItemProps } from '@/components/shared/cart-item-details/cart-item-details.types'

interface Props extends CartItemProps {
	onClickRemove?: () => void
	onClickCountButton?: (type: 'plus' | 'minus') => void
	className?: string
}

export const CheckoutDrawerItem = ({
	name,
	imageUrl,
	details,
	price,
	quantity,
	disabled,
	className,
	onClickRemove,
	onClickCountButton,
}: Props) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between',
				{
					'pointer-events-none opacity-50': disabled,
				},
				className,
			)}
		>
			<div className='flex flex-1 items-center gap-5'>
				<CartItemDetails.Image src={imageUrl} name={name} />

				<CartItemDetails.Info name={name} details={details} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className='ml-20 flex items-center gap-5'>
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />

				<button type='button' onClick={onClickRemove} className='transition duration-300 ease-in-out'>
					<XIcon className='cursor-pointer text-gray-400 hover:text-gray-600' size={20} />
				</button>
			</div>
		</div>
	)
}
