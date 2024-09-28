import { ProductItem } from '@prisma/client'

import { Variant } from '@/components/shared'
import { PizzaType, pizzaSizes } from '@/constants'

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type)

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some((pizza) => Number(pizza.pizzaSize) === Number(item.value)),
	}))
}
