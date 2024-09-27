'use client'

import { FC, useEffect, useRef } from 'react'
import { useIntersection } from 'react-use'

import { cn } from '@/lib/utils'

import { useCategoryStore } from '@/store/category'
import { ProductCard, Title } from '@/components/shared'
// import { CategoryProducts } from '@/@types/prisma'

interface Props {
	title: string
	items: any[]
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
						imageUrl={product.imageUrl}
						price={product.items[0].price}
					/>
				))}
			</div>
		</div>
	)
}
