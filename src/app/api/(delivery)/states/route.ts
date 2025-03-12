import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
	try {
		const states = await prisma.state.findMany({
			select: {
				id: true,
				name: true,
			},
		})

		return NextResponse.json(states)
	} catch (error) {
		console.log('[DELIVERY_STATE_GET] Server error', error)
		return NextResponse.json({ error: 'Помилка при отриманні областей' }, { status: 500 })
	}
}
