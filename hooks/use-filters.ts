import { useSet } from 'react-use'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

export interface Filters {
	pizzaTypes: Set<string>
	pizzaSizes: Set<string>
	prices: PriceProps
	ingredients: Set<string>
}

interface ReturnProps extends Filters {
	setPizzaTypes: (value: string) => void
	setPizzaSizes: (value: string) => void
	setPrices: (name: keyof PriceProps, value: number) => void
	setIngredients: (value: string) => void
}

const getSetFromParam = (searchParams: URLSearchParams, key: string) =>
	new Set<string>(searchParams.has(key) ? searchParams.get(key)?.split(',') : [])

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()

	const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(getSetFromParam(searchParams, 'pizzaSizes'))
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(getSetFromParam(searchParams, 'pizzaTypes'))
	const [ingredients, { toggle: toggleIngredients }] = useSet(getSetFromParam(searchParams, 'ingredients'))

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

	return useMemo(
		() => ({
			pizzaTypes,
			pizzaSizes,
			prices,
			ingredients,
			setPizzaTypes: togglePizzaTypes,
			setPizzaSizes: togglePizzaSizes,
			setPrices: onPriceChange,
			setIngredients: toggleIngredients,
		}),
		[pizzaTypes, pizzaSizes, prices, ingredients, togglePizzaTypes, togglePizzaSizes, toggleIngredients],
	)
}
