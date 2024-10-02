import { FC } from 'react'

import { CheckoutDrawerItem, CheckoutItemSkeleton, WhiteBlock } from '@/components/shared'

import { getCartItemDetails } from '@/lib'
import { CartStateItem } from '@/lib/get-cart-details'
import { PizzaSize, PizzaType } from '@/constants/pizza'

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
					? [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />)
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
