import { CartItemDTO } from '@/services/dto/cart.dto'

/**
 * Function to calculate the total price of items in the cart
 *
 * @param item - an object representing the cart item, containing information about the product,
 *               its ingredients, and the quantity.
 *
 * @returns The total price of the cart items, taking into account the quantity and ingredient prices
 *
 */

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return (ingredientsPrice + item.productItem.price) * item.quantity
}
