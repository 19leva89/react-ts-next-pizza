'use server'

import { prisma } from '@/prisma/db'

/**
 * Retrieves a list of pizzas based on the provided search parameters.
 *
 * @param params - an object containing search parameters to filter pizzas
 * @param query - search query string
 * @param sortBy - field by which to sort the results
 * @param pizzaSizes - comma-separated string of pizza size IDs to filter by
 * @param pizzaTypes - comma-separated string of pizza type IDs to filter by
 * @param ingredients - comma-separated string of ingredient IDs to filter by
 * @param priceFrom - minimum price to filter pizzas
 * @param priceTo - maximum price to filter pizzas
 *
 * @returns a promise that resolves to an array of categories, each containing
 *          products that match the specified criteria
 */

export interface GetSearchParams {
	query?: string
	sortBy?: string
	pizzaSizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000

export const findPizzas = async (params: GetSearchParams) => {
	const pizzaSizes = params.pizzaSizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
	const ingredientsIdArr = params.ingredients?.split(',').map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
							}
						: undefined,
					items: {
						some: {
							pizzaSize: {
								in: pizzaSizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	})

	return categories
}
