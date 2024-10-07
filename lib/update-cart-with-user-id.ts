import { prisma } from '@/prisma/db'

export async function updateCartWithUserId(token: string, userId: number) {
	try {
		// Find the existing cart using the token
		const cart = await prisma.cart.findUnique({
			where: { token },
		})

		if (!cart) {
			console.error(`Cart not found for token: ${token}`)
			return // Optionally handle this case as needed
		}

		// Check if the cart already has a userId
		if (cart.userId) {
			return // Cart already has a userId, no need to update
		}

		// Update the cart with the userId
		await prisma.cart.update({
			where: { id: cart.id },
			data: { userId }, // Set the userId
		})
	} catch (error) {
		console.error('[UPDATE_CART_WITH_USER_ID] Error updating cart:', error)
		throw error // Optionally re-throw or handle the error as needed
	}
}
