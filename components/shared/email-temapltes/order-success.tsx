import { FC } from 'react'

import { CartItemDTO } from '@/services/dto/cart.dto'

interface Props {
	orderId: number
	items: CartItemDTO[]
}

export const OrderSuccessTemplate: FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Дякуємо за покупку! 🎉</h1>

		<p>Ваше замовлення #{orderId} сплачено. Список товарів:</p>

		<hr />

		<ul>
			{items.map((item) => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} грн x {item.quantity} шт. ={' '}
					{item.productItem.price * item.quantity} грн
				</li>
			))}
		</ul>
	</div>
)
