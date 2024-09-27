'use client'

import { useSet } from 'react-use'
import { ChangeEvent, FC, useEffect, useState } from 'react'

import { Input, Skeleton } from '@/components/ui'
import { CheckboxFilter, FilterChecboxProps } from '@/components/shared'

interface Props {
	title: string
	items: FilterChecboxProps[]
	defaultItems: FilterChecboxProps[]
	name?: string
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	className?: string
	onClickCheckbox?: (id: string) => void
	defaultValue?: string[]
	selectedIds?: Set<string>
}

export const CheckboxFiltersGroup: FC<Props> = ({
	title,
	items,
	defaultItems,
	name,
	limit = 5,
	loading,
	searchInputPlaceholder = 'Пошук...',
	className,
	onClickCheckbox,
	defaultValue,
	selectedIds,
}) => {
	const [search, setSearch] = useState('')
	const [showAll, setShowAll] = useState(false)

	const list = showAll
		? items.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
		: defaultItems.slice(0, limit)

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className="font-bold mb-3">{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}

				<Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
			</div>
		)
	}

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input
						onChange={onSearchChange}
						placeholder={searchInputPlaceholder}
						className="bg-gray-50 border-none"
					/>
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{list.map((item, index) => (
					<CheckboxFilter
						key={index}
						value={item.value}
						text={item.text}
						name={name}
						checked={selectedIds?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						endAdornment={item.endAdornment}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
						{showAll ? 'Приховати' : '+ Показати все'}
					</button>
				</div>
			)}
		</div>
	)
}
