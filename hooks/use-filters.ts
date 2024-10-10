import { useSet } from 'react-use'
import { useSearchParams } from 'next/navigation'
import { useMemo, useState, useEffect, useCallback } from 'react'

import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE, DEFAULT_SORT } from '@/constants/filter'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
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
	setSort: (value: string) => void
}

const getSetFromParam = (searchParams: URLSearchParams, key: string) =>
	new Set<string>(searchParams.has(key) ? searchParams.get(key)?.split(',') : [])

const compareSets = (setA: Set<string>, setB: Set<string>): boolean => {
	if (setA.size !== setB.size) return false
	const arrayA = Array.from(setA)
	const arrayB = Array.from(setB)
	for (const item of arrayA) {
		if (!arrayB.includes(item)) return false
	}
	return true
}

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams()

	const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(getSetFromParam(searchParams, 'pizzaSizes'))
	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(getSetFromParam(searchParams, 'pizzaTypes'))
	const [ingredients, { toggle: toggleIngredients }] = useSet(getSetFromParam(searchParams, 'ingredients'))
	const [sort, setSort] = useState<string>(searchParams.get('sort') || DEFAULT_SORT)

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

	const onSortChange = useCallback(
		(newSort: string) => {
			if (newSort !== sort) {
				setSort(newSort)
			}
		},
		[sort],
	)

	useEffect(() => {
		const updatedPizzaTypes = getSetFromParam(searchParams, 'pizzaTypes')
		const updatedPizzaSizes = getSetFromParam(searchParams, 'pizzaSizes')
		const updatedIngredients = getSetFromParam(searchParams, 'ingredients')
		const updatedSort = searchParams.get('sort') || DEFAULT_SORT

		// Сравниваем с текущими параметрами
		if (!compareSets(updatedPizzaTypes, pizzaTypes)) {
			pizzaTypes.clear()
			updatedPizzaTypes.forEach((type) => togglePizzaTypes(type))
		}

		if (!compareSets(updatedPizzaSizes, pizzaSizes)) {
			pizzaSizes.clear()
			updatedPizzaSizes.forEach((size) => togglePizzaSizes(size))
		}

		if (!compareSets(updatedIngredients, ingredients)) {
			ingredients.clear()
			updatedIngredients.forEach((ingredient) => toggleIngredients(ingredient))
		}

		if (updatedSort !== sort) {
			setSort(updatedSort)
		}

		setPrices({
			priceFrom: Number(searchParams.get('priceFrom')) || DEFAULT_MIN_PRICE,
			priceTo: Number(searchParams.get('priceTo')) || DEFAULT_MAX_PRICE,
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams])

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
			onSortChange,
		],
	)
}
