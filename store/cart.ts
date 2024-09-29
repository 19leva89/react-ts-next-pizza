import { create } from 'zustand'

import { Api } from '@/services/api-client'
import { CartStateItem, getCartDetails } from '@/lib'
import { CreateCartItemValues } from '@/services/dto/cart.dto'

export interface CartState {
	items: CartStateItem[]
	totalAmount: number
	loading: boolean
	error: boolean

	/* Getting items from the cart */
	fetchCartItems: () => Promise<void>

	/* Request to update the quantity of goods */
	updateItemQuantity: (id: number, quantity: number) => Promise<void>

	/* Request to add product to cart */
	addCartItem: (values: CreateCartItemValues) => Promise<void>

	/* Request to remove item from cart */
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	totalAmount: 0,
	loading: true,
	error: false,

	fetchCartItems: async () => {
		console.log('Fetching cart items...')

		try {
			set({ loading: true, error: false })
			const data = await Api.cart.getCart()
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
			console.log('Finished fetching cart items.')
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		console.log('updateItemQuantity...')

		try {
			set({ loading: true, error: false })
			const data = await Api.cart.updateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
			console.log('Finished updateItemQuantity.')
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set((state) => ({
				loading: true,
				error: false,
				items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
			}))
			const data = await Api.cart.removeCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set((state) => ({
				loading: false,
				items: state.items.map((item) => ({ ...item, disabled: false })),
			}))
		}
	},

	addCartItem: async (values: CreateCartItemValues) => {
		console.log('addCartItem...')

		try {
			set({ loading: true, error: false })
			const data = await Api.cart.addCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
			console.log('Finished addCartItem.')
		}
	},
}))
