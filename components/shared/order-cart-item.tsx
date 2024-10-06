import { FC } from 'react'

import { cn } from '@/lib'
import * as CartItemDetails from '@/components/shared/cart-item-details'

interface Props {
	name: string
	count: number
	imageUrl: string
	details: string
	price: number
	className?: string
}

export const OrderCartItem: FC<Props> = ({ name, count, imageUrl, details, price, className }) => {
	return (
		<div className={cn('flex justify-between items-center p-4 px-7', className)}>
			<div className="flex items-center gap-3">
				<CartItemDetails.Image src={imageUrl} name={name} />

				<CartItemDetails.Info name={name} details={details} />
			</div>

			<div>
				<CartItemDetails.Price value={price} />

				<span className="text-gray-400">{count} шт.</span>
			</div>
		</div>
	)
}
