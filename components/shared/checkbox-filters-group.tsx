'use client'

import { useSet } from 'react-use'
import { FC, useEffect, useState } from 'react'

import { Input } from '@/components/ui'
import { CheckboxFilter, FilterChecboxProps } from '@/components/shared'

interface Props {
	title: string
	items: FilterChecboxProps[]
	defaultItems?: FilterChecboxProps[]
	limit?: number
	searchInputPlaceholder?: string
	className?: string
	onChange?: (values: string[]) => void
	defaultValue?: string[]
}

export const CheckboxFiltersGroup: FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Пошук...',
	className,
	onChange,
	defaultValue,
}) => {
	const [showAll, setShowAll] = useState(false)
	const [selected, { add, toggle }] = useSet<string>(new Set([]))

	const onCheckedChange = (value: string) => {
		toggle(value)
	}

	useEffect(() => {
		if (defaultValue) {
			defaultValue.forEach(add)
		}
	}, [defaultValue?.length])

	useEffect(() => {
		onChange?.(Array.from(selected))
	}, [selected])

	return (
		<div className={className}>
			<p className="font-bold mb-3">{title}</p>

			{showAll && (
				<div className="mb-5">
					<Input placeholder={searchInputPlaceholder} className="bg-gray-50 border-none" />
				</div>
			)}

			<div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
				{(showAll ? items : defaultItems || items).map((item, index) => (
					<CheckboxFilter
						key={index}
						text={item.text}
						value={item.value}
						checked={selected.has(item.value)}
						onCheckedChange={() => onCheckedChange(item.value)}
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
