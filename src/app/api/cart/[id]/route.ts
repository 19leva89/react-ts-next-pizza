import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { updateCartTotalAmount } from '@/lib/cart/update-cart-total-amount'

interface Props {
	params: Promise<{ id: string }>
}

export async function PATCH(req: NextRequest, { params }: Props) {
	try {
		const id = (await params).id
		const data = (await req.json()) as { quantity: number }
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: { id },
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.update({
			where: { id },
			data: {
				quantity: data.quantity,
			},
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_PATCH] Server error', error)
		return NextResponse.json({ message: 'Не вдалося оновити кошик' }, { status: 500 })
	}
}

export async function DELETE(req: NextRequest, { params }: Props) {
	try {
		const id = (await params).id
		const token = req.cookies.get('cartToken')?.value

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' })
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: { id },
		})

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' })
		}

		await prisma.cartItem.delete({
			where: { id },
		})

		const updatedUserCart = await updateCartTotalAmount(token)

		return NextResponse.json(updatedUserCart)
	} catch (error) {
		console.log('[CART_DELETE] Server error', error)
		return NextResponse.json({ message: 'Не вдалося видалити кошик' }, { status: 500 })
	}
}
