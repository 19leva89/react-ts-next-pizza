'use client'

import { FC } from 'react'
import toast from 'react-hot-toast'

import { useCartStore } from '@/store'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'

interface Props {
	product: ProductWithRelations
	onSubmit?: VoidFunction
}

export const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit }) => {
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + ' додано до кошику')

			_onSubmit?.()
		} catch (err) {
			toast.error('Неможливо додати товар до кошика')
			console.error(err)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				name={product.name}
				items={product.items}
				imageUrl={product.imageUrl}
				ingredients={product.ingredients}
				loading={loading}
				onSubmit={onSubmit}
			/>
		)
	}

	return (
		<ChooseProductForm
			name={product.name}
			price={firstItem.price}
			imageUrl={product.imageUrl}
			loading={loading}
			onSubmit={onSubmit}
		/>
	)
}
