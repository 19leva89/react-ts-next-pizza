import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

import { getUserSession } from '@/lib/get-user-session'
import { CreateCartItemValues } from '@/services/dto/cart.dto'
import { addUserIdToCart } from '@/lib/cart/add-user-id-to-cart'
import { findOrCreateCart } from '@/lib/cart/find-or-create-cart'
import { removeUserIdFromCart } from '@/lib/cart/remove-user-id-from-cart'
import { updateCartTotalAmount } from '@/lib/cart/update-cart-total-amount'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value
		const currentUser = await getUserSession()
		const userId = currentUser?.id

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: { token },
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		})

		if (userId) {
			await addUserIdToCart(token, userId)
		} else {
			await removeUserIdFromCart(token)
		}

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json({ message: 'Не вдалося отримати кошик' }, { status: 500 })
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value
		const currentUser = await getUserSession()
		const userId = currentUser?.id
		const data = (await req.json()) as CreateCartItemValues

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)

		const findCartItem = await prisma.cartItem.findMany({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				// Checking the availability of ingredients
				ingredients:
					data.ingredients && data.ingredients.length > 0
						? { every: { id: { in: data.ingredients } } }
						: { none: {} }, // if no ingredients
			},
			include: {
				ingredients: true,
			},
		})

		// Check the uniqueness of the set of ingredients
		const exactMatchCartItem = findCartItem.find((cartItem) => {
			const ingredientIds = cartItem.ingredients.map((ingredient) => ingredient.id)
			// Check that the amount of ingredients matches and the sets are identical
			return (
				ingredientIds.length === (data.ingredients?.length || 0) &&
				ingredientIds.every((id) => data.ingredients?.includes(id))
			)
		})

		// If a product with the exact set of ingredients is found, we increase the quantity
		if (exactMatchCartItem) {
			await prisma.cartItem.update({
				where: {
					id: exactMatchCartItem.id,
				},
				data: {
					quantity: exactMatchCartItem.quantity + 1,
				},
			})
		} else {
			// Otherwise, create a new product in the cart
			await prisma.cartItem.create({
				data: {
					userId: userId || null,
					cartId: userCart.id,
					productItemId: data.productItemId,
					ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
				},
			})
		}

		if (userId) {
			await addUserIdToCart(token, userId)
		} else {
			await removeUserIdFromCart(token)
		}

		const updatedUserCart = await updateCartTotalAmount(token)

		const resp = NextResponse.json(updatedUserCart)
		resp.cookies.set('cartToken', token)
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json({ message: 'Не вдалося створити кошик' }, { status: 500 })
	}
}
