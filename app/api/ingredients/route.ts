import { NextResponse } from 'next/server'

import { prisma } from '@/lib/db'

export async function GET() {
	const ingredients = await prisma.ingredient.findMany()

	return NextResponse.json(ingredients)
}
