import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { Container, ProductForm } from '@/components/shared'

interface Props {
	params: Promise<{ id: string }>
}

const ProductPage = async ({ params }: Props) => {
	const product = await prisma.product.findFirst({
		where: { id: Number((await params).id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true,
						},
					},
				},
			},
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

	return (
		<Container className="flex flex-col my-10">
			<ProductForm product={product} ingredients={ingredients} />
		</Container>
	)
}

export default ProductPage
