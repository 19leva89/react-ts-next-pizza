import { ReactNode } from 'react'

import { prisma } from '@/prisma/db'

export const generateMetadata = async ({ params: { id } }: { params: { id: string } }) => {
	const product = await prisma.product.findUnique({
		where: { id: Number(id) },
	})

	return {
		title: product?.name || 'Товар',
	}
}

const ModalProductIdLayout = async ({ children }: { children: ReactNode }) => {
	return <>{children}</>
}

export default ModalProductIdLayout
