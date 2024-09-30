import { CartStateItem } from './get-cart-details'
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants'

export const getCartItemDetails = (
	ingredients: CartStateItem['ingredients'],
	pizzaType?: PizzaType,
	pizzaSize?: PizzaSize,
): string => {
	const details = []

	if (pizzaSize && pizzaType) {
		const typeName = mapPizzaType[pizzaType]
		details.push(`${typeName} ${pizzaSize} см`)
	}

	if (ingredients && ingredients.length > 0) {
		details.push(ingredients.map((ingredient) => ingredient.name).join(', '))
	}

	return details.join('<br />')
}
