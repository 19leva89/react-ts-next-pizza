import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { prisma } from '@/prisma/db'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
	const body = await req.text()
	const signature = headers().get('Stripe-Signature') as string

	if (!signature) {
		return new NextResponse('Missing Stripe signature', { status: 400 })
	}

	let event: Stripe.Event

	try {
		event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
	} catch (error) {
		console.error(`Webhook signature verification failed:`, error)
		return new NextResponse('Webhook error', { status: 400 })
	}

	const session = event.data.object as Stripe.Checkout.Session

	if (event.type === 'checkout.session.completed') {
		const paymentIntentId = session.payment_intent as string
		const orderId = session.metadata?.order_id

		if (!orderId) {
			console.error('Order ID not found in session metadata')
			return new NextResponse('Order ID not found', { status: 400 })
		}

		try {
			await prisma.order.update({
				where: { id: parseInt(orderId) },
				data: {
					paymentId: paymentIntentId,
					status: 'SUCCEEDED',
				},
			})
		} catch (error) {
			console.error('Error updating order:', error)
			return new NextResponse('Error updating order', { status: 500 })
		}
	}

	return new NextResponse(null, { status: 200 })
}
