import { FC } from 'react'

import { getCartItemDetails } from '@/lib'
import { Skeleton } from '@/components/ui'
import { CartStateItem } from '@/lib/get-cart-details'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { CheckoutDrawerItem, WhiteBlock } from '@/components/shared'

interface Props {
	items: CartStateItem[]
	loading?: boolean
	className?: string
	removeCartItem: (id: number) => void
	onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void
}

export const CheckoutCart: FC<Props> = ({
	items,
	loading,
	className,
	removeCartItem,
	onClickCountButton,
}) => {
	return (
		<WhiteBlock title="1. Кошик" className={className}>
			<div className="flex flex-col gap-5">
				{loading
					? [...Array(4)].map((_, index) => (
							<div key={index} className="flex items-center justify-between">
								<div className="flex items-center gap-5">
									<Skeleton className="w-[60px] h-[60px] rounded-full" />
									<Skeleton className="w-40 h-8 rounded" />
								</div>

								<Skeleton className="h-8 w-16 rounded" />

								<Skeleton className="h-8 w-[133px] rounded" />
							</div>
						))
					: items.map((item) => (
							<CheckoutDrawerItem
								key={item.id}
								id={item.id}
								name={item.name}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize,
								)}
								price={item.price}
								quantity={item.quantity}
								disabled={item.disabled}
								onClickRemove={() => removeCartItem(item.id)}
								onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
							/>
						))}
			</div>
		</WhiteBlock>
	)
}
