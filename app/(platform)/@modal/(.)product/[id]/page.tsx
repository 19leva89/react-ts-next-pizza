import { notFound } from 'next/navigation'

import { prisma } from '@/prisma/db'
import { ChooseProductModal } from '@/components/shared/modals'

export default async function ProductModalPage({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredients: true,
			items: true,
		},
	})

	if (!product) {
		return notFound()
	}

	const ingredients = await prisma.ingredient.findMany()

	if (!ingredients) {
		return notFound()
	}

	return <ChooseProductModal product={product} ingredients={ingredients} />
}
