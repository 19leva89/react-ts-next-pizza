'use client'

import { ChangeEvent, useState } from 'react'

import { Input, Skeleton } from '@/components/ui'
import { CheckboxFilter } from '@/components/shared'
import { FilterCheckboxProps } from '@/components/shared/checkbox-filter'

interface Props {
	title: string
	name: string
	items: FilterCheckboxProps[]
	defaultItems?: FilterCheckboxProps[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	defaultValue?: string[]
	selected?: Set<string>
	onClickCheckbox?: (id: string) => void
	className?: string
}

export const CheckboxFiltersGroup = ({
	title,
	name,
	items,
	defaultItems,
	limit = 5,
	loading,
	searchInputPlaceholder = 'Пошук...',
	selected,
	onClickCheckbox,
	className,
}: Props) => {
	const [search, setSearch] = useState<string>('')
	const [showAll, setShowAll] = useState<boolean>(false)

	const list = showAll
		? items.filter((item) => item.text.toLowerCase().includes(search.toLowerCase()))
		: (defaultItems || items).slice(0, limit)

	const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	if (loading) {
		return (
			<div className={className}>
				<p className='mb-3 font-bold'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => <Skeleton key={index} className='mb-4 h-6 rounded-[8px]' />)}

				<Skeleton className='mb-4 h-6 w-28 rounded-[8px]' />
			</div>
		)
	}

	return (
		<div className={className}>
			<p className='mb-3 font-bold'>{title}</p>

			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onSearchChange}
						placeholder={searchInputPlaceholder}
						className='border-none bg-gray-50'
					/>
				</div>
			)}

			<div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
				{list.map((item) => (
					<CheckboxFilter
						key={item.value}
						value={item.value}
						text={item.text}
						name={name}
						checked={selected?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						endAdornment={item.endAdornment}
					/>
				))}
			</div>

			{items.length > limit && (
				<div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='mt-3 cursor-pointer text-primary transition-colors duration-300 ease-in-out hover:text-foreground'
					>
						{showAll ? 'Приховати' : '+ Показати все'}
					</button>
				</div>
			)}
		</div>
	)
}
