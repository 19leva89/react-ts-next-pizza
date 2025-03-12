import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { ChooseProductModal } from '@/components/shared/modals'

interface Props {
	params: Promise<{ id: string }>
}

const ProductModalPage = async ({ params }: Props) => {
	const product = await prisma.product.findFirst({
		where: {
			id: Number((await params).id),
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

export default ProductModalPage
