import { Ingredient } from '@prisma/client'
import { mapPizzaType, PizzaSize, PizzaType } from '@/constants'

/**
 * Generates a descriptive string for a pizza based on its type, size, and selected ingredients.
 *
 * @param type - The type of the pizza (e.g., vegetarian, meat, etc.).
 * @param size - The size of the pizza (e.g., small, medium, large).
 * @param ingredients - An array of available ingredients to look up names based on IDs.
 * @param selectedIngredientIds - A Set of ingredient IDs that the user has selected.
 *
 * @returns An object containing:
 *   - details: A string describing the type and size of the pizza.
 *   - additionalIngredients: A string listing any additional ingredients selected by the user.
 */

export const generatePizzaDescription = (
	type: PizzaType,
	size: PizzaSize,
	ingredients: Ingredient[],
	selectedIngredientIds: Set<number>,
): { details: string; additionalIngredients: string } => {
	const selectedIngredientNames = Array.from(selectedIngredientIds)
		.map((ingredientId) => ingredients.find((ingredient) => ingredient.id === ingredientId)?.name)
		.filter(Boolean)

	const additionalIngredients =
		selectedIngredientNames.length > 0
			? `Додаткові інгредієнти: ${selectedIngredientNames.join(', ').toLowerCase()}`
			: ''

	const details = `${mapPizzaType[type]} піца, ${size} см`

	return { details, additionalIngredients }
}
