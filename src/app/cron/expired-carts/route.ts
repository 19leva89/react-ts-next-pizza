import { NextRequest, NextResponse } from 'next/server'

import { deleteExpiredCarts } from '@/lib/cart/delete-expired-carts'

export const maxDuration = 60

export async function GET(req: NextRequest) {
	try {
		// Checking authorization for cron requests
		const authHeader = req.headers.get('authorization')

		if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
			return new NextResponse('Unauthorized', {
				status: 401,
			})
		}

		await deleteExpiredCarts()

		return NextResponse.json({ success: true })
	} catch (error) {
		console.error('Failed to delete expired carts:', error)

		return NextResponse.json({ error: 'Failed to delete expired carts' }, { status: 500 })
	}
}
