import { useSet } from 'react-use'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import { DEFAULT_SORT } from '@/constants/filter'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
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
	prices: PriceProps
	ingredients: Set<string>
	sort: string
}

interface ReturnProps extends Filters {
	setPizzaTypes: (value: string) => void
	setPizzaSizes: (value: string) => void
	setPrices: (name: keyof PriceProps, value: number) => void
	setIngredients: (value: string) => void
	setSort: (name: string, value: 'cheap' | 'expensive' | 'novelty' | 'rating') => void
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

	const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
		new Set<string>(searchParams.has('pizzaSizes') ? searchParams.get('pizzaSizes')?.split(',') : []),
	)

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
		new Set<string>(searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []),
	)

	const [ingredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.has('ingredients') ? searchParams.get('ingredients')?.split(',') : []),
	)

	const [sort, setSort] = useState<string>(
		searchParams.has('sort') ? (searchParams.get('sort') as string) : DEFAULT_SORT,
	)

	const [prices, setPrices] = useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const onPriceChange = (name: keyof PriceProps, value: number) => {
		setPrices((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const onSortChange = (name: string, value: string) => {
		if (name === 'sort') {
			setSort((prev) => (prev === value ? '' : value))
		}
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
		}),
		[
			pizzaTypes,
			pizzaSizes,
			prices,
			ingredients,
			sort,
			togglePizzaTypes,
			togglePizzaSizes,
			toggleIngredients,
		],
	)
}
