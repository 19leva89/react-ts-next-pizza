import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { OrderStatus } from '@prisma/client'

import { sendEmail } from '@/lib'
import { stripe } from '@/lib/stripe'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderSuccessTemplate } from '@/components/shared/email-templates'

export async function POST(req: NextRequest) {
	/* Get the request body as text and the Stripe-Signature header */
	const body = await req.text()
	const signature = (await headers()).get('Stripe-Signature') as string

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

	/* Handle the event when the session is completed */
	if (event.type === 'checkout.session.completed') {
		/* Get the Stripe Checkout session object */
		const session = event.data.object as Stripe.Checkout.Session

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
					'Next Pizza / Ваше замовлення успішно оформлено 🎉',
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

	/* Handle the event when the payment intent is canceled */
	if (event.type === 'payment_intent.canceled') {
		/* Get the payment intent object */
		const paymentIntent = event.data.object as Stripe.PaymentIntent

		/* Get orderId from payment intent metadata */
		const orderId = paymentIntent.metadata?.order_id

		if (!orderId) {
			console.error('Order ID not found in payment intent metadata')
			return new NextResponse('Order ID not found', { status: 400 })
		}

		/* Search for an order in the database by orderId */
		const order = await prisma.order.findFirst({
			where: {
				id: Number(orderId),
			},
		})

		if (!order) {
			console.error('Order not found')
			return new NextResponse('Order not found', { status: 400 })
		}

		try {
			/* Updating the order: set status to CANCELLED */
			await prisma.order.update({
				where: {
					id: order.id,
				},
				data: {
					status: OrderStatus.CANCELLED,
				},
			})

			//TODO: Optional email about cancelled payment
		} catch (error) {
			console.error('Error updating order to cancelled:', error)
			return new NextResponse('Error updating order', { status: 500 })
		}
	}

	return new NextResponse(null, { status: 200 })
}
