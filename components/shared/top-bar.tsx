'use client'

import { FC } from 'react'
import { Category } from '@prisma/client'

import { cn } from '@/lib/utils'
import { Container, Categories, SortPopup } from '@/components/shared'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar: FC<Props> = ({ className }) => {
	return (
		<div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
			<Container className="flex items-center justify-between ">
				<Categories />

				<div className="flex items-center">
					<SortPopup />
				</div>
			</Container>
		</div>
	)
}
