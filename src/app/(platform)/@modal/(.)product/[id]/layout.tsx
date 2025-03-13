import { PropsWithChildren } from 'react'

import { prisma } from '@/lib/prisma'

interface Props {
	params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: Props) => {
	const product = await prisma.product.findUnique({
		where: { id: Number((await params).id) },
	})

	return {
		title: product?.name || 'Товар',
	}
}

const ModalProductIdLayout = async ({ children }: PropsWithChildren) => {
	return <>{children}</>
}

export default ModalProductIdLayout
