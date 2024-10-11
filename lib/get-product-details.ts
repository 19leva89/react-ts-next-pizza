import { generateProductDescription } from './generate-product-description'

/**
 * Retrieves the weight of a product
 *
 * @param weight - The weight of the product (in grams).
 *
 * @returns An object containing the weight of the product,
 *
 */

export const getProductDetails = (weight: number) => {
	const { details } = generateProductDescription(weight)

	return { details }
}
