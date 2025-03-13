'use client'

import Link from 'next/link'
import { shallow } from 'zustand/shallow'

import { cn } from '@/lib'
import { Category } from '@prisma/client'
import { useCategoryStore } from '@/store'

interface Props {
	items: Category[]
	className?: string
}

export const Categories = ({ items, className }: Props) => {
	const categoryActiveId = useCategoryStore((state) => state.activeId, shallow)

	return (
		<div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
			{items.map(({ id, name, slug }) => (
				<Link
					key={id}
					className={cn(
						'flex items-center font-bold h-11 rounded-2xl px-5 border transition-colors',
						categoryActiveId === id
							? 'bg-white shadow-md shadow-gray-200 text-primary border-primary'
							: 'border-transparent',
					)}
					href={`/#${slug}`}
				>
					{name}
				</Link>
			))}
		</div>
	)
}
