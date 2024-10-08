import { calcCartItemTotalPrice } from '@/lib'
import { CartDTO } from '@/services/dto/cart.dto'

/**
 * Extracts the cart details from the provided CartDTO object.
 *
 * @param data - The CartDTO object containing cart information.
 *
 * @returns An object containing an array of CartStateItem objects representing the items
 *          in the cart and the total amount of the cart.
 */

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	pizzaSize?: number | null
	pizzaType?: number | null
	ingredients: Array<{ name: string; price: number }>
	disabled?: boolean
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		pizzaSize: item.productItem.pizzaSize,
		pizzaType: item.productItem.pizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
		disabled: false,
	})) as CartStateItem[]

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
