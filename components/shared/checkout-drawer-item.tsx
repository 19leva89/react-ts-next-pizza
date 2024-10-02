'use client'

import { FC } from 'react'
import { X } from 'lucide-react'

import { cn } from '@/lib'
import * as CartItemDetails from '@/components/shared/cart-item-details'
import { CartItemProps } from '@/components/shared/cart-item-details/cart-item-details.types'

interface Props extends CartItemProps {
	onClickRemove?: () => void
	onClickCountButton?: (type: 'plus' | 'minus') => void
	className?: string
}

export const CheckoutDrawerItem: FC<Props> = ({
	name,
	imageUrl,
	details,
	price,
	quantity,
	disabled,
	className,
	onClickRemove,
	onClickCountButton,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between',
				{
					'opacity-50 pointer-events-none': disabled,
				},
				className,
			)}
		>
			<div className="flex items-center gap-5 flex-1">
				<CartItemDetails.Image src={imageUrl} name={name} />

				<CartItemDetails.Info name={name} details={details} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className="flex items-center gap-5 ml-20">
				<CartItemDetails.CountButton onClick={onClickCountButton} value={quantity} />

				<button type="button" onClick={onClickRemove}>
					<X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
				</button>
			</div>
		</div>
	)
}
