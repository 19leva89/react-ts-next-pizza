import { prisma } from '@/prisma/db'

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
	const product = await prisma.product.findUnique({
		where: { id: Number(id) },
	})

	return {
		title: product?.name || 'Product',
	}
}

const ProductIdLayout = async ({ children }: { children: React.ReactNode }) => {
	return <>{children}</>
}

export default ProductIdLayout
