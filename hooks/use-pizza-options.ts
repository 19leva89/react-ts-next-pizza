import { useSet } from 'react-use'
import { useEffect, useState } from 'react'
import { ProductItem } from '@prisma/client'

import { Variant } from '@/components/shared'
import { getAvailablePizzaSizes } from '@/lib'
import { PizzaSize, PizzaType } from '@/constants'

interface ReturnProps {
	size: PizzaSize
	type: PizzaType
	selectedIngredients: Set<number>
	availableSizes: Variant[]
	currentItemId?: number
	setSize: (size: PizzaSize) => void
	setType: (size: PizzaType) => void
	addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20)
	const [type, setType] = useState<PizzaType>(1)
	const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]))

	const availableSizes = getAvailablePizzaSizes(type, items)

	const currentItemId = items.find((item) => item.pizzaType === type && item.pizzaSize === size)?.id

	useEffect(() => {
		const isAvailableSize = availableSizes?.find((item) => Number(item.value) === size && !item.disabled)
		const availableSize = availableSizes?.find((item) => !item.disabled)

		if (!isAvailableSize && availableSize) {
			setSize(Number(availableSize.value) as PizzaSize)
		}
	}, [availableSizes, size, type])

	return {
		size,
		type,
		selectedIngredients,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	}
}
