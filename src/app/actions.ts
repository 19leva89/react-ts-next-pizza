'use server'

import axios from 'axios'
import { compare } from 'bcryptjs'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { sendEmail } from '@/lib'
import { auth, signIn } from '@/auth'
import { createPayment } from '@/lib/stripe'
import { DISCOUNT } from '@/constants/discount'
import { CheckoutFormValues } from '@/constants'
import { saltAndHashPassword } from '@/lib/salt'
import { DELIVERY_PRICE } from '@/constants/delivery'
import { PayOrderTemplate, VerificationUserTemplate } from '@/components/shared/email-templates'

const handleError = (error: unknown, context: string) => {
	if (error instanceof Prisma.PrismaClientKnownRequestError) {
		console.error(`💾 Prisma error [${context}]:`, error.code, error.message)
	} else if (axios.isAxiosError(error)) {
		console.error(`🌐 API error [${context}]:`, error.response?.status, error.message)
	} else if (error instanceof Error) {
		console.error(`🚨 Unexpected error [${context}]:`, error.message)
	} else {
		console.error(`❌ Unknown error [${context}]`, error)
	}

	throw error
}

export const registerUser = async (body: Prisma.UserCreateInput) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email: body.email,
			},
		})

		if (user) {
			if (!user.emailVerified) throw new Error('Email не підтверджено')

			throw new Error('Користувач вже існує')
		}

		const createdUser = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: await saltAndHashPassword(body.password as string),
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
	} catch (error) {
		handleError(error, 'CREATE_USER')
	}
}

export const loginUser = async (provider: string) => {
	await signIn(provider, { redirectTo: '/' })

	revalidatePath('/')
}

export const loginUserWithCreds = async (body: Prisma.UserCreateInput) => {
	const user = await prisma.user.findUnique({
		where: { email: body.email },
		include: { accounts: true },
	})

	if (!user) throw new Error('Невірний пароль або email')
	if (user.accounts.length > 0)
		throw new Error(
			'Цей email пов’язаний з логіном із соціальної мережі. Будь ласка, використовуйте GitHub або Google',
		)

	const isPasswordValid = await compare(body.password as string, user.password ?? '')

	if (!isPasswordValid) throw new Error('Невірний пароль або email')
	if (!user.emailVerified) throw new Error('Email не підтверджено')

	const data = {
		email: body.email,
		password: body.password,
		redirect: false,
	}

	const result = await signIn('credentials', data)

	if (result?.error) throw new Error(result.error)

	revalidatePath('/')
}

export const updateUserInfo = async (body: Prisma.UserUpdateInput) => {
	try {
		const session = await auth()

		if (!session) throw new Error('Користувача не знайдено')

		const existingUser = await prisma.user.findFirst({
			where: { id: session?.user.id },
			include: { accounts: true },
		})

		if (!existingUser) throw new Error('Користувача не знайдено')

		// Checking if the user has OAuth accounts
		const hasOAuthAccounts = existingUser.accounts.length > 0

		// If the user logged in via OAuth, prohibit changing the email and password
		if (hasOAuthAccounts) {
			if (body.email && body.email !== existingUser.email)
				throw new Error('Email не можна змінити для користувачів OAuth')

			if (body.password) throw new Error('Пароль не можна змінити для користувачів OAuth')
		}

		// Validation for email uniqueness
		if (body.email && body.email !== existingUser.email && !hasOAuthAccounts) {
			const emailExists = await prisma.user.findUnique({
				where: {
					email: body.email as string,
				},
			})

			if (emailExists) throw new Error('Email вже використовується')
		}

		const updatedData: Prisma.UserUpdateInput = {
			name: body.name,
		}

		// If the user is not OAuth, allow email and password updates
		if (!hasOAuthAccounts) {
			updatedData.email = body.email ? body.email : existingUser.email
			updatedData.password = body.password
				? await saltAndHashPassword(body.password as string)
				: existingUser.password
		}

		const updatedUser = await prisma.user.update({
			where: {
				id: session?.user.id,
			},
			data: updatedData,
		})

		return updatedUser
	} catch (error) {
		handleError(error, 'UPDATE_USER')
	}
}

export const createOrder = async (data: CheckoutFormValues) => {
	try {
		const cookieStore = cookies()
		const token = (await cookieStore).get('cartToken')?.value

		if (!token) throw new Error('Кошик не знайдено')

		// Find a basket by token
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

		// If the cart is not found, return an error
		if (!userCart) throw new Error('Cart not found')

		// If the cart is empty, return an error
		if (userCart?.totalAmount === 0) throw new Error('Cart is empty')

		const discount = (userCart?.totalAmount * DISCOUNT) / 100
		const totalPrice = userCart.totalAmount - discount + DELIVERY_PRICE

		// Create an order
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

		// Clear the cart
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

		// Creating a payment link
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

		// Send an email
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
	} catch (error) {
		handleError(error, 'CREATE_ORDER')
	}
}
