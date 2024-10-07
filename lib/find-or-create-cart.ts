'use server'

import { prisma } from '@/prisma/db'

export const findOrCreateCart = async (userId: number, token: string) => {
	let userCart = await prisma.cart.findFirst({
		where: {
			OR: [
				{
					userId: userId ?? undefined,
				},
				{
					token,
				},
			],
		},
	})

	if (!userCart) {
		userCart = await prisma.cart.create({
			data: {
				userId: userId || null,
				token,
			},
		})
	}

	return userCart
}
