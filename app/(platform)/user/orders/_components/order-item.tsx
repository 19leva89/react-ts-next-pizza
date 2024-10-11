'use client'

import { FC, useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { cn, getCartItemDetails } from '@/lib'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { OrderCartItem, Title } from '@/components/shared'
import { OrderStatus as IOrderStatus } from '@prisma/client'
import { OrderStatus } from '@/components/shared/order-status'

interface Props {
	id: number
	items: CartItemDTO[]
	exanded?: boolean
	createdAt: string
	totalAmount: number
	status: IOrderStatus
	className?: string
}

const ITEM_HEIGHT = 98
const FOOTER_HEIGHT = 68

export const OrderItem: FC<Props> = ({
	id = 0,
	items,
	totalAmount = 0,
	createdAt,
	exanded = false,
	status,
	className,
}) => {
	const [isExpanded, setIsExpanded] = useState(exanded)

	const TOTAL_HEIGHT = isExpanded ? items.length * ITEM_HEIGHT + FOOTER_HEIGHT : 0

	return (
		<div className={cn('bg-white rounded-3xl select-none', className)}>
			<div
				onClick={() => setIsExpanded(!isExpanded)}
				className="flex cursor-pointer justify-between items-center gap-2 p-7 border-b border-gray-100"
			>
				<div className="flex items-center gap-6">
					<Title text={`Замовлення #${id}`} size="sm" className="font-bold" />

					<span className="text-gray-400">{createdAt}</span>
				</div>

				<div className="flex items-center gap-5">
					<OrderStatus variant={status} />

					<ChevronDown className={isExpanded ? 'rotate-180' : ''} />
				</div>
			</div>

			<div className={cn('transition-all overflow-hidden')} style={{ height: TOTAL_HEIGHT }}>
				<div>
					{items.map((item) => {
						const bdImagePath = item.productItem.product.imageUrl
						const imageUrl = `${bdImagePath}.avif`

						return (
							<OrderCartItem
								key={item.id}
								id={item.productItem.product.id}
								name={item.productItem.product.name}
								imageUrl={imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.productItem.pizzaType as PizzaType,
									item.productItem.pizzaSize as PizzaSize,
									item.productItem.weight as number,
								)}
								count={item.quantity}
								price={item.productItem.price * item.quantity}
								className="border-b border-gray-100"
							/>
						)
					})}

					<div className="p-5 px-7">
						<h3 className="text-xl">
							Разом: <b>{totalAmount} грн</b>
						</h3>
					</div>
				</div>
			</div>
		</div>
	)
}
