'use server'

import { prisma } from '@/lib/prisma'

export async function removeUserIdFromCart(token: string) {
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
		if (!cart.userId) {
			// console.log(`Cart already hasn't a userId, no need to remove`)
			return // userId is already missing, no need to update
		}

		// Update cart by deleting userId
		await prisma.cart.update({
			where: { id: cart.id },
			data: { userId: null }, // Delete userId
		})

		// console.log(`userId successfully removed from cart, token: ${token}`)
	} catch (error) {
		console.error('[REMOVE_USER_ID_FROM_CART] Error updating cart:', error)
		throw error // Optionally re-throw or handle the error as needed
	}
}
