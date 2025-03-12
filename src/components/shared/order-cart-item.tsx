import Link from 'next/link'

import { cn } from '@/lib'
import * as CartItemDetails from '@/components/shared/cart-item-details'

interface Props {
	id: number
	name: string
	count: number
	imageUrl: string
	details: string
	price: number
	className?: string
}

export const OrderCartItem = ({ id, name, count, imageUrl, details, price, className }: Props) => {
	return (
		<div className={cn('flex justify-between items-center p-4 px-7 overflow-hidden group', className)}>
			<Link
				href={`/product/${id}`}
				className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-1"
			>
				<div className="flex items-center gap-3">
					<CartItemDetails.Image src={imageUrl} name={name} />

					<CartItemDetails.Info name={name} details={details} />
				</div>
			</Link>

			<div>
				<CartItemDetails.Price value={price} />

				<span className="text-gray-400">{count} шт.</span>
			</div>
		</div>
	)
}
