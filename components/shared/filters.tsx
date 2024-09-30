'use client'

import { FC } from 'react'

import { Input } from '@/components/ui'
import { useIngredients, useFilters, useQueryFilters } from '@/hooks'
import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared'

interface Props {
	className?: string
}

export const Filters: FC<Props> = ({ className }) => {
	const filters = useFilters()
	const { ingredients, loading } = useIngredients()

	const items = ingredients.map((item) => ({
		value: String(item.id),
		text: item.name,
	}))

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	useQueryFilters(filters)

	return (
		<div className={className}>
			<Title text="Фільтрування" size="sm" className="mb-5 font-bold" />

			{/* Type filter */}
			<CheckboxFiltersGroup
				title="Тип тіста"
				name="pizzaTypes"
				className="mb-5"
				items={[
					{ text: 'Тонке', value: '1' },
					{ text: 'Традиційне', value: '2' },
				]}
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
			/>

			{/* Size filter */}
			<CheckboxFiltersGroup
				title="Розміри"
				name="pizzaSizes"
				className="mb-5"
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
				onClickCheckbox={filters.setPizzaSizes}
				selected={filters.pizzaSizes}
			/>

			{/* Price filter */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Ціна від і до:</p>

				<div className="flex gap-3 mb-5">
					<Input
						type="number"
						placeholder="0"
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}
					/>

					<Input
						type="number"
						min={100}
						max={1000}
						placeholder="1000"
						value={String(filters.prices.priceTo)}
						onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>

				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			{/* Ingredient filter */}
			<CheckboxFiltersGroup
				title="Інгредієнти"
				name="ingredients"
				className="mt-5"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selected={filters.ingredients}
			/>
		</div>
	)
}
