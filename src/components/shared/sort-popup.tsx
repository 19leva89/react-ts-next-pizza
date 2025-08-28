'use client'

import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

import { cn } from '@/lib'
import { SortOption, sortOptions } from '@/constants'
import { useFilters, useQueryFilters } from '@/hooks'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'

interface Props {
	className?: string
}

export const SortPopup = ({ className }: Props) => {
	const filters = useFilters()

	const [isOpen, setIsOpen] = useState<boolean>(false)

	useQueryFilters(filters)

	const handleSortChange = (value: SortOption) => {
		if (filters.sort !== value) {
			filters.setSort(value)
		}
		setIsOpen(false)
	}

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div className={cn('inline-flex h-13 cursor-pointer items-center gap-1 rounded-2xl px-5', className)}>
					<ArrowUpDown size={16} />

					<b>Сортування:</b>

					<b className='text-primary'>{sortOptions.find((option) => option.value === filters.sort)?.name}</b>
				</div>
			</PopoverTrigger>

			<PopoverContent className='w-60'>
				<ul>
					{sortOptions.map(({ value, name }) => (
						<li
							key={value}
							onClick={() => handleSortChange(value as SortOption)}
							className={cn('mt-1 cursor-pointer rounded-md p-2 px-4 hover:bg-secondary hover:text-primary', {
								'bg-secondary text-primary': filters.sort === value,
							})}
						>
							{name}
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	)
}
