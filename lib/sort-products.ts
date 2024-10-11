'use server'

import { prisma } from '@/prisma/db'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, DEFAULT_SORT } from '@/constants/filter'

/**
 * Retrieves a list of pizzas based on the provided search parameters.
 *
 * @param params - an object containing search parameters to filter pizzas
 * @param query - search query string
 * @param sort - field by which to sort the results
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
	sort?: string
	pizzaSizes?: string
	pizzaTypes?: string
	ingredients?: string
	priceFrom?: string
	priceTo?: string
}

export const sortProducts = async (params: GetSearchParams) => {
	const pizzaSizes = params.pizzaSizes?.split(',').map(Number)
	const pizzaTypes = params.pizzaTypes?.split(',').map(Number)
	const ingredientsIdArr = params.ingredients?.split(',').map(Number)

	const sort = String(params.sort) || DEFAULT_SORT
	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
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
						orderBy:
							sort === 'cheap'
								? { price: 'asc' }
								: sort === 'expensive'
									? { price: 'desc' }
									: sort === 'novelty'
										? { createdAt: 'desc' }
										: sort === 'rating'
											? { rating: 'desc' }
											: { createdAt: 'asc' },
					},
				},
			},
		},
	})

	categories.forEach((category) => {
		category.products.sort((a, b) => {
			// Получаем минимальные цены для сортировки
			const minPriceA = Math.min(...a.items.map((item) => item.price))
			const minPriceB = Math.min(...b.items.map((item) => item.price))

			if (sort === 'cheap') {
				return minPriceA - minPriceB
			} else if (sort === 'expensive') {
				return minPriceB - minPriceA
			} else if (sort === 'novelty') {
				return b.items[0].createdAt.getTime() - a.items[0].createdAt.getTime()
			} else if (sort === 'rating') {
				return b.items[0].rating - a.items[0].rating
			}
			return 0 // Если нет подходящего критерия сортировки, ничего не изменяем
		})
	})

	return categories
}
