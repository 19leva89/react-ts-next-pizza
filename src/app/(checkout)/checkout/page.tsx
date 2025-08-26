import { auth } from '@/auth'
import { CheckoutForm } from './_components/checkout-form'

const CheckoutPage = async () => {
	const session = await auth()

	return <CheckoutForm session={session} />
}

export default CheckoutPage
