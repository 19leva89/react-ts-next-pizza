import { prisma } from '@/prisma/db'

export async function deleteExpiredCarts() {
	const oneWeekAgo = new Date()
	oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

	try {
		await prisma.cart.deleteMany({
			where: {
				createdAt: {
					lt: oneWeekAgo, // Condition: baskets created more than a week ago
				},
			},
		})
		console.log('Expired carts deleted successfully')
	} catch (error) {
		console.error('Error deleting expired carts:', error)
	}
}
