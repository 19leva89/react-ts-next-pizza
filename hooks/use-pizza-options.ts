import { useSet } from 'react-use'
import { useEffect, useState } from 'react'
import { ProductItem } from '@prisma/client'

import { getAvailablePizzaSizes } from '@/lib'
import { PizzaSize, PizzaType } from '@/constants'
import { Variant } from '@/components/shared/group-variants'

interface ReturnProps {
	size: PizzaSize
	type: PizzaType
	selectedIngredientIds: Set<number>
	availableSizes: Variant[]
	currentItemId?: number
	setSize: (size: PizzaSize) => void
	setType: (size: PizzaType) => void
	addIngredient: (id: number) => void
}

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
	const [size, setSize] = useState<PizzaSize>(20)
	const [type, setType] = useState<PizzaType>(1)
	const [selectedIngredientIds, { toggle: addIngredient }] = useSet(new Set<number>([]))

	const availableSizes = getAvailablePizzaSizes(type, items)

	const currentItemId = items.find((item) => item.pizzaType === type && item.pizzaSize === size)?.id

	useEffect(() => {
		const isSizeAvailable = availableSizes?.find((item) => Number(item.value) === size && !item.disabled)
		const firstAvailableSize = availableSizes?.find((item) => !item.disabled)

		if (!isSizeAvailable && firstAvailableSize) {
			setSize(Number(firstAvailableSize.value) as PizzaSize)
		}
	}, [availableSizes, size, type])

	return {
		size,
		type,
		selectedIngredientIds,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	}
}
