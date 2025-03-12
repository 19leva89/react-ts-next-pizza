'use client'

import { toast } from 'sonner'

import { Ingredient } from '@prisma/client'
import { ProductWithRelations } from '@/config/prisma-types'

import { useCartStore } from '@/store'
import { ChoosePizzaForm, ChooseProductForm } from '@/components/shared'

interface Props {
	product: ProductWithRelations
	ingredients: Ingredient[]
	onSubmit?: VoidFunction
}

export const ProductForm = ({ product, ingredients, onSubmit }: Props) => {
	const [addCartItem, loading] = useCartStore((state) => [state.addCartItem, state.loading])

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const bdImagePath = product.imageUrl
	const imageUrl = `${bdImagePath}.avif`

	const handleAddToCart = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(product.name + ' додано до кошику')

			onSubmit?.()
		} catch (err) {
			toast.error('Неможливо додати ' + product.name + ' до кошика')
			console.error(err)
		}
	}

	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				name={product.name}
				items={product.items}
				imageUrl={imageUrl}
				ingredients={ingredients}
				loading={loading}
				onSubmit={handleAddToCart}
			/>
		)
	}

	return (
		<ChooseProductForm
			name={product.name}
			description={product.description || ''}
			price={firstItem.price}
			weight={product.items[0].weight || 0}
			imageUrl={imageUrl}
			loading={loading}
			onSubmit={handleAddToCart}
		/>
	)
}
