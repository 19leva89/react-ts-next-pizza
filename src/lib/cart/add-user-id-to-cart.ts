'use server'

import { prisma } from '@/lib/prisma'

export async function addUserIdToCart(token: string, userId: number) {
	try {
		// Find the existing cart using the token
		const cart = await prisma.cart.findUnique({
			where: { token },
		})

		if (!cart) {
			// console.error(`Cart not found for token: ${token}`)
			return // Optionally handle this case as needed
		}

		// Check if the cart already has a userId
		if (cart.userId) {
			// console.log(`Cart already has a userId, no need to update: ${cart.userId}`)
			return // Cart already has a userId, no need to update
		}

		// Update the cart with the userId
		await prisma.cart.update({
			where: { id: cart.id },
			data: { userId }, // Set the userId
		})

		// console.log(`userId successfully added to cart, token: ${token}`)
	} catch (error) {
		console.error('[ADD_USER_ID_TO_CART] Error updating cart:', error)
		throw error // Optionally re-throw or handle the error as needed
	}
}
