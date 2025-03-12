import { PizzaSize, PizzaType } from '@/constants'
import { Ingredient, ProductItem } from '@prisma/client'

/**
 * Calculates the total price of a pizza based on its type, size, and selected ingredients.
 *
 * @param type - The type of the pizza (e.g., vegetarian, meat, etc.).
 * @param size - The size of the pizza (e.g., small, medium, large).
 * @param items - An array of ProductItem objects representing available pizza options.
 * @param ingredients - An array of Ingredient objects representing available ingredients.
 * @param selectedIngredients - A Set of ingredient IDs that the user has selected.
 *
 * @returns The total price of the pizza, including the base price and the cost of selected ingredients.
 */

export const calcTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
) => {
	let pizzaItem = items.find((item) => item.pizzaType === type && item.pizzaSize === size)

	if (!pizzaItem) {
		pizzaItem = items[0]
	}

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaItem.price + totalIngredientsPrice
}
