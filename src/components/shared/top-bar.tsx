'use client'

import { Category } from '@prisma/client'

import { cn } from '@/lib'
import { Container, Categories } from '@/components/shared'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar = ({ categories, className }: Props) => {
	return (
		<div className={cn('sticky top-0 z-10 bg-white py-5 shadow-lg shadow-black/5', className)}>
			<Container className='flex items-center justify-between'>
				<Categories items={categories} />
			</Container>
		</div>
	)
}
