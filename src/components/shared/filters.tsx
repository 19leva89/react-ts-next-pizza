'use client'

import { SearchXIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Input, Separator } from '@/components/ui'
import { DEFAULT_MAX_PRICE, DEFAULT_MIN_PRICE } from '@/constants/filter'
import { Title, RangeSlider, CheckboxFiltersGroup } from '@/components/shared'
import { useFilters, useQueryFilters, useDebouncedCallback, useUsedIngredients } from '@/hooks'

interface Props {
	className?: string
}

export const Filters = ({ className }: Props) => {
	const filters = useFilters()

	const { usedIngredients, loading } = useUsedIngredients()

	// Add local state for price inputs
	const [localPriceFrom, setLocalPriceFrom] = useState<number>(filters.prices.priceFrom)
	const [localPriceTo, setLocalPriceTo] = useState<number>(filters.prices.priceTo)

	useEffect(() => {
		setLocalPriceFrom(filters.prices.priceFrom)
		setLocalPriceTo(filters.prices.priceTo)
	}, [filters.prices.priceFrom, filters.prices.priceTo])

	const debouncePriceInput = useDebouncedCallback((name: 'priceFrom' | 'priceTo', value: number) => {
		filters.setPrices(name, value)
	}, 500)

	const debounceRangeSlider = useDebouncedCallback((prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}, 500)

	const resetFilters = () => {
		filters.reset()
	}

	useQueryFilters(filters)

	const items = usedIngredients.map((item) => ({
		value: String(item.id),
		text: item.name,
	}))

	return (
		<div className={className}>
			<Title text='Фільтрування' size='sm' className='mb-5 font-bold' />

			{/* Type filter */}
			<CheckboxFiltersGroup
				title='Тип тіста'
				name='pizzaTypes'
				className='mb-5'
				items={[
					{ text: 'Традиційне', value: '1' },
					{ text: 'Тонке', value: '2' },
				]}
				onClickCheckbox={filters.setPizzaTypes}
				selected={filters.pizzaTypes}
			/>

			{/* Size filter */}
			<CheckboxFiltersGroup
				title='Розміри'
				name='pizzaSizes'
				className='mb-5'
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
				onClickCheckbox={filters.setPizzaSizes}
				selected={filters.pizzaSizes}
			/>

			<Separator />

			{/* Price filter */}
			<div className='py-6 pb-7'>
				<p className='mb-3 font-bold'>Ціна від і до:</p>

				<div className='mb-5 flex gap-3'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={DEFAULT_MAX_PRICE}
						value={localPriceFrom}
						onChange={(e) => {
							const value = Number(e.target.value)

							setLocalPriceFrom(value)
							debouncePriceInput('priceFrom', value)
						}}
					/>

					<Input
						type='number'
						min={100}
						max={DEFAULT_MAX_PRICE}
						placeholder={String(DEFAULT_MAX_PRICE)}
						value={localPriceTo}
						onChange={(e) => {
							const value = Number(e.target.value)

							setLocalPriceTo(value)
							debouncePriceInput('priceTo', value)
						}}
					/>
				</div>

				<RangeSlider
					min={DEFAULT_MIN_PRICE}
					max={DEFAULT_MAX_PRICE}
					step={10}
					value={[localPriceFrom, localPriceTo]}
					onValueChange={debounceRangeSlider}
				/>
			</div>

			<Separator />

			{/* Ingredient filter */}
			<CheckboxFiltersGroup
				title='Інгредієнти'
				name='ingredients'
				className='mt-5'
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selected={filters.ingredients}
			/>

			{/* Reset button */}
			<div className='mt-5 flex cursor-pointer items-center gap-2 hover:text-primary' onClick={resetFilters}>
				Скинути всі фільтри <SearchXIcon className='hover:stroke-primary' />
			</div>
		</div>
	)
}
