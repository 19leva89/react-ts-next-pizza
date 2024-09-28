'use client'

import { FC } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store'

interface Props {
	className?: string
}

const cats = [
	{ id: 1, name: 'Піци' },
	{ id: 2, name: 'Комбо' },
	{ id: 3, name: 'Закуски' },
	{ id: 4, name: 'Коктейлі' },
	{ id: 5, name: 'Кава' },
	{ id: 6, name: 'Напої' },
	{ id: 7, name: 'Десерти' },
	{ id: 8, name: 'Десерти' },
]

export const Categories: FC<Props> = ({ className }) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId)

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
			{cats.map(({ id, name }, index) => (
				<Link
					key={index}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5',
						categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary',
					)}
					href={`/#${name}`}
				>
					{name}
				</Link>
			))}
		</div>
	)
}
