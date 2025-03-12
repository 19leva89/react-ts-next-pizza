'use client'

import { useIntersection } from 'react-use'
import { RefObject, useEffect, useRef } from 'react'

import { ProductWithRelations } from '@/config/prisma-types'

import { cn } from '@/lib'
import { useCategoryStore } from '@/store'
import { ProductCard, Title } from '@/components/shared'

interface Props {
	title: string
	slug: string
	items: ProductWithRelations[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductsGroupList = ({ title, slug, items, categoryId, className, listClassName }: Props) => {
	const intersectionRef = useRef<HTMLDivElement>(null) as RefObject<HTMLElement>
	const setCategoryActiveId = useCategoryStore((state) => state.setActiveId)

	const intersection = useIntersection(intersectionRef, {
		threshold: 0.1,
	})

	useEffect(() => {
		if (intersection?.isIntersecting) {
			setCategoryActiveId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting, setCategoryActiveId, slug])

	return (
		<div className={className} id={slug} ref={intersectionRef as RefObject<HTMLDivElement>}>
			<Title text={title} size="lg" className="font-extrabold mb-5" />

			<div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8', listClassName)}>
				{items.map((product) => {
					const bdImagePath = product.imageUrl
					const imageUrl = `${bdImagePath}.avif`

					return (
						<ProductCard
							key={product.id}
							id={product.id}
							name={product.name}
							description={product.description || ''}
							price={product.items[0].price}
							imageUrl={imageUrl}
							ingredients={product.ingredients}
						/>
					)
				})}
			</div>
		</div>
	)
}
