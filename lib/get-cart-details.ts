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
	name: string
	imageUrl: string
	price: number
	ingredients: Array<{ name: string; price: number }>
	quantity: number
	disabled?: boolean
	pizzaSize?: number | null
	pizzaType?: number | null
}

interface ReturnProps {
	items: CartStateItem[]
	totalAmount: number
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map((item) => ({
		id: item.id,
		name: item.productItem.product.name,
		imageUrl: item.productItem.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		quantity: item.quantity,
		disabled: false,
		pizzaSize: item.productItem.pizzaSize,
		pizzaType: item.productItem.pizzaType,
		ingredients: item.ingredients.map((ingredient) => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	})) as CartStateItem[]

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
