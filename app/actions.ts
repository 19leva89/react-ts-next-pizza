'use server'

import { hashSync } from 'bcrypt'
import { cookies } from 'next/headers'

import { prisma } from '@/prisma/db'
import { Prisma } from '@prisma/client'

import { sendEmail } from '@/lib'
import { createPayment } from '@/lib/stripe'
import { CheckoutFormValues } from '@/constants'
import { getUserSession } from '@/lib/get-user-session'
import { PayOrderTemplate } from '@/components/shared/email-temapltes'
import { VerificationUserTemplate } from '@/components/shared/email-temapltes/verification-user'

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}

		/* Find a basket by token */
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productItem: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})

		/* If the cart is not found, return an error */
		if (!userCart) {
			throw new Error('Cart not found')
		}

		/* If the cart is empty, return an error */
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}

		/* Create an order */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				region: data.region,
				city: data.city,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				items: JSON.stringify(userCart.items),
			},
		})

		/* Clear the cart */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})

		/* Creating a payment link */
		const paymentData = await createPayment({
			amount: order.totalAmount,
			orderId: order.id,
			description: 'Оплата замовлення #' + order.id,
		})

		if (!paymentData) {
			throw new Error('Payment data not found')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentUrl = paymentData.url

		/* Send an email */
		await sendEmail(
			data.email,
			'Next Pizza / Оплата замовлення #' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: paymentData.url ?? '',
				items: userCart.items,
			}),
		)

		return paymentUrl
	} catch (err) {
		console.log('[CreateOrder] Server error', err)
	}
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
	try {
		const currentUser = await getUserSession()

		if (!currentUser) {
			throw new Error('Користувача не знайдено')
		}

		const findUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: {
				fullName: body.fullName,
				email: body.email,
				password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
			},
		})
	} catch (err) {
		console.log('Error [UPDATE_USER]', err)
		throw err
	}
}

export async function registerUser(body: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			if (!user.verified) {
				throw new Error('Пошта не підтверджена')
			}

			throw new Error('Користувач вже існує')
		}

		const createdUser = await prisma.user.create({
			data: {
				fullName: body.fullName,
				email: body.email,
				password: hashSync(body.password, 10),
			},
		})

		const code = Math.floor(100000 + Math.random() * 900000).toString()

		await prisma.verificationCode.create({
			data: {
				code,
				userId: createdUser.id,
			},
		})

		await sendEmail(
			createdUser.email,
			'Next Pizza / 📝 Підтвердження реєстрації',
			VerificationUserTemplate({
				code,
			}),
		)
	} catch (err) {
		console.log('Error [CREATE_USER]', err)
		throw err
	}
}
