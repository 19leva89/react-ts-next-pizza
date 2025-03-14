export const mapPizzaSize = {
	20: 'Маленька',
	30: 'Середня',
	40: 'Велика',
} as const

export const mapPizzaType = {
	1: 'Традиційна',
	2: 'Тонка',
} as const

export const mapSortOption = {
	cheap: 'Спочатку недорогі',
	expensive: 'Спочатку дорогі',
	novelty: 'Новинки',
	rating: 'За рейтингом',
} as const

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}))

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}))

export const sortOptions = Object.entries(mapSortOption).map(([value, name]) => ({
	name,
	value,
}))

export type PizzaSize = keyof typeof mapPizzaSize
export type PizzaType = keyof typeof mapPizzaType
export type SortOption = keyof typeof mapSortOption
