import cron from 'node-cron'

import { deleteExpiredCarts } from '@/lib/cart/delete-expired-carts'

// Run a task every night at midnight to delete old recycle bins
cron.schedule('0 4 * * *', async () => {
	console.log('Running scheduled task: Deleting expired carts at 4 AM')

	try {
		await deleteExpiredCarts()
		console.log('Expired carts deleted successfully')
	} catch (error) {
		console.error('Error deleting expired carts:', error)
	}
})
