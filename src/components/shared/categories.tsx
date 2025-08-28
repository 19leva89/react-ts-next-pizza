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
		<div className={cn('inline-flex gap-1 rounded-2xl bg-gray-50 p-1', className)}>
			{items.map(({ id, name, slug }) => (
				<Link
					key={id}
					href={`/#${slug}`}
					className={cn(
						'flex h-11 items-center rounded-2xl border px-5 font-bold transition-colors',
						categoryActiveId === id
							? 'border-primary bg-white text-primary shadow-md shadow-gray-200'
							: 'border-transparent',
					)}
				>
					{name}
				</Link>
			))}
		</div>
	)
}
