import { NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'

export async function GET() {
	const usedIngredients = await prisma.ingredient.findMany({
		where: {
			products: {
				some: {},
			},
		},
	})

	return NextResponse.json(usedIngredients)
}
