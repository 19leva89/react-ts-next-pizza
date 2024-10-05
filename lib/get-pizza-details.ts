import { PizzaSize, PizzaType } from '@/constants'
import { Ingredient } from '@prisma/client'
import { generatePizzaDescription } from './generate-pizza-description'

/**
 * Retrieves the total price and descriptive details of a pizza based on its type, size,
 * selected ingredients, and available items.
 *
 * @param type - The type of the pizza (e.g., vegetarian, meat, etc.).
 * @param size - The size of the pizza (e.g., small, medium, large).
 * @param items - An array of ProductItem objects representing available pizza items.
 * @param ingredients - An array of all possible ingredients to generate descriptions.
 * @param selectedIngredientIds - A Set of ingredient IDs that are selected by the user.
 *
 * @returns An object containing the total price, detailed description of the pizza,
 *          and any additional ingredients selected.
 */

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	ingredients: Ingredient[],
	selectedIngredientIds: Set<number>,
) => {
	const { details, additionalIngredients } = generatePizzaDescription(
		type,
		size,
		ingredients,
		selectedIngredientIds,
	)

	return { details, additionalIngredients }
}
