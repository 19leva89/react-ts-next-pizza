'use server'

import { hashSync } from 'bcryptjs'
import { cookies } from 'next/headers'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { sendEmail } from '@/lib'
import { createPayment } from '@/lib/stripe'
import { DISCOUNT } from '@/constants/discount'
import { CheckoutFormValues } from '@/constants'
import { DELIVERY_PRICE } from '@/constants/delivery'
import { getUserSession } from '@/lib/get-user-session'
import { PayOrderTemplate, VerificationUserTemplate } from '@/components/shared/email-templates'

export async function createOrder(data: CheckoutFormValues) {
	try {
		const cookieStore = cookies()
		const token = (await cookieStore).get('cartToken')?.value

		if (!token) {
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
				token,
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

		const discount = (userCart?.totalAmount * DISCOUNT) / 100
		const totalPrice = userCart.totalAmount - discount + DELIVERY_PRICE

		/* Create an order */
		const order = await prisma.order.create({
			data: {
				token,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				state: data.state,
				city: data.city,
				address: data.address,
				comment: data.comment,
				items: JSON.stringify(userCart.items),
				discount: discount,
				deliveryPrice: DELIVERY_PRICE,
				totalAmount: totalPrice,
				userId: userCart.user?.id || null,
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
			token,
			email: data.email,
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

		if (!paymentUrl) {
			throw new Error('Payment url not found')
		}

		/* Send an email */
		await sendEmail(
			data.email,
			'Next Pizza / Оплата замовлення #' + order.id,
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: paymentUrl,
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

		const existingUser = await prisma.user.findFirst({
			where: {
				id: Number(currentUser.id),
			},
		})

		if (!existingUser) {
			throw new Error('Користувача не знайдено')
		}

		// Validation of email uniqueness
		if (body.email && body.email !== existingUser.email) {
			const emailExists = await prisma.user.findUnique({
				where: {
					email: body.email as string,
				},
			})
			if (emailExists) {
				throw new Error('Email вже використовується')
			}
		}

		const updatedData: Prisma.UserUpdateInput = {
			fullName: body.fullName,
			email: body.email ? body.email : existingUser.email, // Conditional assignment
			password: body.password ? hashSync(body.password as string, 10) : existingUser.password,
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: Number(currentUser.id),
			},
			data: updatedData,
		})

		return updatedUser
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
