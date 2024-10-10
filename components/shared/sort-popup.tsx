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
	const filters = useFilters()
	const [isOpen, setIsOpen] = useState(false)

	const sortOptions: Record<string, string> = {
		cheap: 'Спочатку недорогі',
		expensive: 'Спочатку дорогі',
		novelty: 'Новинки',
		rating: 'За рейтингом',
	}

	const updateSort = (sort: string) => {
		filters.setSort(sort)
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

					<b className="text-primary">{sortOptions[filters.sort]}</b>
				</div>
			</PopoverTrigger>

			<PopoverContent className="w-[240px]">
				<ul>
					{Object.entries(sortOptions).map(([key, value]) => (
						<li
							key={key}
							onClick={() => updateSort(key)}
							className={cn('hover:bg-secondary hover:text-primary mt-1 p-2 px-4 cursor-pointer rounded-md', {
								'bg-secondary text-primary': filters.sort === key,
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
