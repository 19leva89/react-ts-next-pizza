import { NextResponse } from 'next/server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		const user = await auth()

		if (!user) {
			return NextResponse.json({ message: 'Ви не авторизовані' }, { status: 401 })
		}

		const data = await prisma.user.findUnique({
			where: {
				id: user.user.id,
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		})

		return NextResponse.json(data)
	} catch (error) {
		console.log(error)
		return NextResponse.json({ message: '[USER_GET] Server error' }, { status: 500 })
	}
}
