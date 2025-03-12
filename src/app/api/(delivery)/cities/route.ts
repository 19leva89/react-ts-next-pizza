import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url)
	const stateId = searchParams.get('stateId')

	if (!stateId) {
		return NextResponse.json({ error: 'stateId не предоставлен' }, { status: 400 })
	}

	try {
		const cities = await prisma.city.findMany({
			where: {
				community: {
					district: {
						stateId: Number(stateId),
					},
				},
			},
			select: {
				id: true,
				name: true,
			},
		})

		return NextResponse.json(cities)
	} catch (error) {
		console.log('[DELIVERY_CITY_GET] Server error', error)
		return NextResponse.json({ error: 'Помилка при отриманні міст' }, { status: 500 })
	}
}
