import { FC } from 'react'

import { getCartItemDetails } from '@/lib'
import { Skeleton } from '@/components/ui'
import { CartStateItem } from '@/lib/get-cart-details'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { CheckoutDrawerItem, Title, WhiteBlock } from '@/components/shared'

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
				{loading ? (
					[...Array(items.length || 3)].map((_, index) => (
						<div key={index} className="flex items-center justify-between">
							<div className="flex items-center gap-5">
								<Skeleton className="w-[60px] h-[60px] rounded-full" />
								<Skeleton className="w-40 h-8 rounded" />
							</div>

							<Skeleton className="h-8 w-16 rounded" />

							<Skeleton className="h-8 w-[133px] rounded" />
						</div>
					))
				) : items.length > 0 ? (
					// Show items in the cart if they exist
					items.map((item) => (
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
					))
				) : (
					// Show text if cart is empty
					<>
						<Title size="sm" text="Кошик порожній" className="text-center font-bold my-2" />

						<p className="text-center text-neutral-500 mb-5">Але це ніколи не пізно виправити :)</p>
					</>
				)}
			</div>
		</WhiteBlock>
	)
}
