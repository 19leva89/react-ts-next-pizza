/**
 * Generates a descriptive string for a product based on its weight.
 *
 * @param weight - The weight of the product (in grams).
 *
 * @returns An object containing:
 *   - details: A string describing the weight the product.
 *   - additionalIngredients: A string listing any additional ingredients selected by the user.
 */

export const generateProductDescription = (weight: number): { details: string } => {
	const details = `Вага:  ${weight} г`

	return { details }
}
