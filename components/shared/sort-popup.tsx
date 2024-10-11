'use client'

import { FC, useState } from 'react'
import { ArrowUpDown } from 'lucide-react'

import { cn } from '@/lib'
import { useFilters, useQueryFilters } from '@/hooks'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui'

interface Props {
	className?: string
}

export const SortPopup: FC<Props> = ({ className }) => {
	type SortOptions = 'cheap' | 'expensive' | 'novelty' | 'rating'

	const filters = useFilters()
	const [isOpen, setIsOpen] = useState(false)

	const sortOptions: Record<SortOptions, string> = {
		cheap: 'Спочатку недорогі',
		expensive: 'Спочатку дорогі',
		novelty: 'Новинки',
		rating: 'За рейтингом',
	}

	const updateSort = (name: string, newSort: SortOptions) => {
		filters.setSort(name, newSort)
		setIsOpen(false)
	}

	useQueryFilters(filters)

	return (
		<Popover open={isOpen} onOpenChange={setIsOpen}>
			<PopoverTrigger asChild>
				<div
					className={cn('inline-flex items-center gap-1 px-5 h-[52px] cursor-pointer rounded-2xl', className)}
				>
					<ArrowUpDown size={16} />

					<b>Сортування:</b>

					<b className="text-primary">
						<b className="text-primary">{sortOptions[filters.sort as SortOptions]}</b>
					</b>
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-[240px]">
				<ul>
					{(Object.entries(sortOptions) as [SortOptions, string][]).map(([key, value]) => (
						<li
							key={key}
							onClick={() => updateSort('sort', key as SortOptions)}
							className={cn('hover:bg-secondary hover:text-primary mt-1 p-2 px-4 cursor-pointer rounded-md', {
								'bg-secondary text-primary': filters.sort.toString() === String(key),
							})}
						>
							{value}
						</li>
					))}
				</ul>
			</PopoverContent>
		</Popover>
	)
}
