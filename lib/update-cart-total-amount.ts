'use server'

import { prisma } from '@/prisma/db'
import { calcCartItemTotalPrice } from '@/lib'

export const updateCartTotalAmount = async (userId: number, token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				{
					userId,
				},
				{
					token,
				},
			],
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})

	if (!userCart) {
		return
	}

	const totalAmount = userCart.items.reduce((acc, item) => {
		return acc + calcCartItemTotalPrice(item)
	}, 0)

	return await prisma.cart.update({
		where: {
			id: userCart.id,
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							product: true,
						},
					},
					ingredients: true,
				},
			},
		},
	})
}
