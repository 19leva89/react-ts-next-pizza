import { PizzaType, pizzaSizes } from '@/constants'
import { ProductItem } from '@/generated/prisma/client'
import { Variant } from '@/components/shared/group-variants'

/**
 * Retrieves the available pizza sizes for a specified pizza type from a list of product items.
 *
 * @param type - The type of pizza for which to retrieve available sizes.
 * @param items - An array of ProductItem objects containing pizza information.
 *
 * @returns An array of Variant objects representing the available pizza sizes,
 *          with each object containing the size name, value, and a disabled flag
 *          indicating whether the size is available for the specified pizza type.
 */

export const getAvailablePizzaSizes = (type: PizzaType, items: ProductItem[]): Variant[] => {
	const filteredPizzasByType = items.filter((item) => item.pizzaType === type)

	return pizzaSizes.map((item) => ({
		name: item.name,
		value: item.value,
		disabled: !filteredPizzasByType.some((pizza) => Number(pizza.pizzaSize) === Number(item.value)),
	}))
}
