'use client'

import { useIntersection } from 'react-use'
import { FC, useEffect, useRef } from 'react'

import { ProductWithRelations } from '@/@types/prisma'

import { cn } from '@/lib'
import { useCategoryStore } from '@/store'
import { ProductCard, Title } from '@/components/shared'

interface Props {
	title: string
	items: ProductWithRelations[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductsGroupList: FC<Props> = ({ title, items, categoryId, className, listClassName }) => {
	const intersectionRef = useRef(null)
	const setCategoryActiveId = useCategoryStore((state) => state.setActiveId)

	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryActiveId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, setCategoryActiveId])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div ref={intersectionRef} className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((product) => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.items[0].price}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
					/>
				))}
			</div>
		</div>
	)
}
