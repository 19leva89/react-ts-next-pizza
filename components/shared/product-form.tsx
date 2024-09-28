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
	// console.log('ProductForm rendered', { product })

	// const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])
	// console.log('Loading state:', loading)

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	// const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
	// 	try {
	// 		const itemId = productItemId ?? firstItem.id

	// 		await addCartItem({
	// 			productItemId: itemId,
	// 			ingredients,
	// 		})

	// 		toast.success(product.name + ' додано до кошику')

	// 		_onSubmit?.()
	// 	} catch (err) {
	// 		toast.error('Неможливо додати товар до кошика')
	// 		console.error(err)
	// 	}
	// }

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={() => {}}
				loading={false}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			onSubmit={() => {}}
			price={firstItem.price}
			loading={false}
		/>
	)
}
