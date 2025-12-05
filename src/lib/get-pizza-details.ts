import { PizzaSize, PizzaType } from '@/constants'
import { Ingredient } from '@/generated/prisma/client'
import { generatePizzaDescription } from './generate-pizza-description'

/**
 * Retrieves the total price, weight and descriptive details of a pizza based on its type, size,
 * selected ingredients, and available items.
 *
 * @param type - The type of the pizza (e.g., vegetarian, meat, etc.).
 * @param size - The size of the pizza (e.g., small, medium, large).
 * @param weight - The weight of the pizza (in grams).
 * @param items - An array of ProductItem objects representing available pizza items.
 * @param ingredients - An array of all possible ingredients to generate descriptions.
 * @param selectedIngredientIds - A Set of ingredient IDs that are selected by the user.
 *
 * @returns An object containing the total price, weight, detailed description of the pizza,
 *          and any additional ingredients selected.
 */

export const getPizzaDetails = (
	type: PizzaType,
	size: PizzaSize,
	weight: number,
	ingredients: Ingredient[],
	selectedIngredientIds: Set<number>,
) => {
	const { details, additionalIngredients } = generatePizzaDescription(
		type,
		size,
		weight,
		ingredients,
		selectedIngredientIds,
	)

	return { details, additionalIngredients }
}
