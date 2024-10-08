import { useEffect } from 'react'

import { useCartStore } from '@/store'
import { CartStateItem } from '@/lib/cart/get-cart-details'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

type ReturnProps = {
	items: CartStateItem[]
	totalAmount: number
	loading: boolean
	addCartItem: (values: CreateCartItemValues) => void
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state) => state)

	useEffect(() => {
		cartState.fetchCartItems()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return cartState
}
