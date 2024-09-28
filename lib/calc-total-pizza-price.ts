import { PizzaSize, PizzaType } from '@/constants'
import { Ingredient, ProductItem } from '@prisma/client'

/**
 * Function to calculate the total cost of pizza
 *
 * @param type - type of dough of the selected pizza
 * @param size - size of the selected pizza
 * @param items - list of variations
 * @param ingredients - list of ingredients
 * @param selectedIngredients - selected ingredients
 *
 * @returns number total cost
 */
export const calcTotalPizzaPrice = (
	type: PizzaType,
	size: PizzaSize,
	items: ProductItem[],
	ingredients: Ingredient[],
	selectedIngredients: Set<number>,
) => {
	const pizzaPrice = items.find((item) => item.pizzaType === type && item.pizzaSize === size)?.price || 0

	const totalIngredientsPrice = ingredients
		.filter((ingredient) => selectedIngredients.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)

	return pizzaPrice + totalIngredientsPrice
}
