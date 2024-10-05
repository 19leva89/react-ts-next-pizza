import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/db'

export async function GET() {
	const stories = await prisma.story.findMany({
		include: {
			items: true,
		},
	})

	return NextResponse.json(stories)
}
