import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get('query') || ''

	if (!query.trim()) {
		return NextResponse.json([])
	}

	// Variants of search
	const searchPatterns = [
		query.toLowerCase(),
		query.toUpperCase(),
		query.charAt(0).toUpperCase() + query.slice(1).toLowerCase(),
	]

	const products = await prisma.product.findMany({
		where: {
			OR: searchPatterns.map((pattern) => ({
				name: { contains: pattern },
			})),
		},
		select: {
			id: true,
			name: true,
			imageUrl: true,
		},
		take: 5,
	})

	return NextResponse.json(products)
}
