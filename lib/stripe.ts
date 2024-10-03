import Stripe from 'stripe'

interface Props {
	token: string
	email: string
	amount: number
	orderId: number
	description: string
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
	apiVersion: '2024-09-30.acacia',
	typescript: true,
})

export async function createPayment(details: Props) {
	const data = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		client_reference_id: details.token,
		line_items: [
			{
				price_data: {
					currency: 'UAH',
					product_data: {
						name: details.description,
					},
					unit_amount: Math.round(details.amount * 100),
				},
				quantity: 1,
			},
		],
		mode: 'payment',
		success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/?paid`,
		cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
		customer_email: details.email,
		metadata: {
			order_id: details.orderId.toString(),
		},
	})

	return data
}
