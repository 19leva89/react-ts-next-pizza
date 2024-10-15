import { useSet } from 'react-use'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { SortOption } from '@/constants'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, DEFAULT_SORT } from '@/constants/filter'

interface PriceProps {
	priceFrom: number
	priceTo: number
}

interface QueryFilters extends PriceProps {
	pizzaTypes: string
	pizzaSizes: string
	ingredients: string
	sort: string
}

export interface Filters {
	pizzaTypes: Set<string>
	pizzaSizes: Set<string>
	ingredients: Set<string>
	prices: PriceProps
	sort: string
}

interface ReturnProps extends Filters {
	setPizzaTypes: (value: string) => void
	setPizzaSizes: (value: string) => void
	setIngredients: (value: string) => void
	setPrices: (name: keyof PriceProps, value: number) => void
	setSort: (value: SortOption) => void
	reset: () => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

	const [pizzaSizes, { toggle: togglePizzaSizes, reset: resetPizzaSizes }] = useSet(
		new Set<string>(searchParams.has('pizzaSizes') ? searchParams.get('pizzaSizes')?.split(',') : []),
	)

	const [pizzaTypes, { toggle: togglePizzaTypes, reset: resetPizzaTypes }] = useSet(
		new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []),
	)

	const [ingredients, { toggle: toggleIngredients, reset: resetIngredients }] = useSet(
		new Set<string>(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []),
	)

	const [sort, setSort] = useState<SortOption>(
		searchParams.has('sort') ? (searchParams.get('sort') as SortOption) : DEFAULT_SORT,
	)

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || DEFAULT_MIN_PRICE,
		priceTo: Number(searchParams.get('priceTo')) || DEFAULT_MAX_PRICE,
	})

	const onPriceChange = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const onSortChange = (value: SortOption) => {
		setSort(value)
	}

	const reset = () => {
		resetPizzaTypes()
		resetPizzaSizes()
		resetIngredients()
		setSort(DEFAULT_SORT)
		setPrices({
			priceFrom: DEFAULT_MIN_PRICE,
			priceTo: DEFAULT_MAX_PRICE,
		})
	}

	return useMemo(
		() => ({
			pizzaTypes,
			pizzaSizes,
			prices,
			ingredients,
			sort,
			setPizzaTypes: togglePizzaTypes,
			setPizzaSizes: togglePizzaSizes,
			setPrices: onPriceChange,
			setIngredients: toggleIngredients,
			setSort: onSortChange,
			reset,
		}),
		[pizzaTypes, pizzaSizes, prices, ingredients, sort],
	)
}
