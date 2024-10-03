import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma/db'
import { OrderStatus } from '@prisma/client'

import { sendEmail } from '@/lib'
import { stripe } from '@/lib/stripe'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderSuccessTemplate } from '@/components/shared/email-temapltes'

export async function POST(req: NextRequest) {
	/* Get the request body as text and the Stripe-Signature header */
	const body = await req.text()
	const signature = headers().get('Stripe-Signature') as string

	/* If there is no signature, return an error */
	if (!signature) {
		return new NextResponse('Missing Stripe signature', { status: 400 })
	}

	let event: Stripe.Event

	try {
		/* Verify the authenticity of the webhook and create an event */
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
	} catch (error) {
		console.error(`Webhook signature verification failed:`, error)
		return new NextResponse('Webhook error', { status: 400 })
	}

	/* Get the Stripe Checkout session object */
	const session = event.data.object as Stripe.Checkout.Session

	/* Handle the event when the session is completed */
	if (event.type === 'checkout.session.completed') {
		/* Receive paymentIntent and payment status */
		const paymentIntentId = session.payment_intent as string
		const isSucceeded = session.payment_status === 'paid'

		/* Get orderId from session metadata */
		const orderId = session.metadata?.order_id

		if (!orderId) {
			console.error('Order ID not found in session metadata')
			return new NextResponse('Order ID not found', { status: 400 })
		}

		/* Search for an order in the database by orderId */
		const order = await prisma.order.findFirst({
			where: {
				id: Number(orderId),
			},
		})

		if (!order) {
			console.error('Order ID not found in session metadata')
			return new NextResponse('Order ID not found', { status: 400 })
		}

		try {
			/* Updating the order: saving the paymentId and order status */
			await prisma.order.update({
				where: {
					id: order.id,
				},
				data: {
					paymentId: paymentIntentId,
					status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
				},
			})

			/* Decoding the products from the order */
			const items = JSON.parse(order?.items as string) as CartItemDTO[]

			/* Send an email */
			if (isSucceeded) {
				await sendEmail(
					order.email,
					'Next Pizza / Ваш заказ успешно оформлен 🎉',
					OrderSuccessTemplate({ orderId: order.id, items }),
				)
			} else {
				//TODO: Letter about unsuccessful payment
			}
		} catch (error) {
			console.error('Error updating order:', error)
			return new NextResponse('Error updating order', { status: 500 })
		}
	}

	return new NextResponse(null, { status: 200 })
}
