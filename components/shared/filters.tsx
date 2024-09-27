'use client'

import { FC } from 'react'

import { Input } from '@/components/ui'
import { useFilterIngredients } from '@/hooks/useFilterIngredients'
import { CheckboxFiltersGroup, CheckboxFilter, Title, RangeSlider } from '@/components/shared'

interface Props {
	className?: string
}

export const Filters: FC<Props> = ({ className }) => {
	const { ingredients, loading, onAddId, selectedIds } = useFilterIngredients()

	const items = ingredients.map((item) => ({
		value: String(item.id),
		text: item.name,
	}))

	return (
		<div className={className}>
			<Title text="Фільтрування" size="sm" className="mb-5 font-bold" />

			{/* Top checkboxes */}
			<div className="flex flex-col gap-4">
				<CheckboxFilter name="top" text="Можна збирати" value="1" />
				<CheckboxFilter name="top2" text="Новинки" value="2" />
			</div>

			{/* Price filter */}
			<div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
				<p className="font-bold mb-3">Ціна від і до:</p>

				<div className="flex gap-3 mb-5">
					<Input type="number" placeholder="0" min={0} max={1000} defaultValue={0} />

					<Input type="number" min={100} max={1000} placeholder="1000" />
				</div>

				<RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
			</div>

			{/* Ingredient filter */}
			<CheckboxFiltersGroup
				className="mt-5"
				title="Інгредієнти"
				name="ingredients"
				limit={6}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				onClickCheckbox={onAddId}
				selectedIds={selectedIds}
			/>
		</div>
	)
}
