import React from 'react'

import { CartStateItem } from '@/lib'
import { useCartStore } from '@/store'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

type ReturnProps = {
	items: CartStateItem[]
	totalAmount: number
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValues) => void
}

export const useCart = (): ReturnProps => {
	const cartState = useCartStore((state) => state)

	React.useEffect(() => {
		cartState.fetchCartItems()
	}, [cartState])

	return cartState
}
