'use client'

import { FC } from 'react'
import { Ingredient, ProductItem } from '@prisma/client'

import { usePizzaOptions } from '@/hooks'
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants'
import { calcTotalPizzaPrice, cn, getPizzaDetails } from '@/lib'

import { Button } from '@/components/ui'
import { GroupVariants, IngredientItem, PizzaImage, Title } from '@/components/shared'

interface Props {
	name: string
	items: ProductItem[]
	imageUrl: string
	ingredients: Ingredient[]
	loading?: boolean
	onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
}

/**
 * PIZZA selection form
 */
export const ChoosePizzaForm: FC<Props> = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}) => {
	const {
		size,
		type,
		selectedIngredientIds,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items)

	const { details, additionalIngredients } = getPizzaDetails(type, size, ingredients, selectedIngredientIds)

	const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredientIds)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredientIds))
		}
	}

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage imageUrl={imageUrl} size={size} />

			<div className="w-[490px] h-[800px] bg-[#f7f6f5] p-7">
				<Title text={name} size="md" className="font-extrabold mb-1" />

				<p className="text-gray-400">{details}</p>

				<p className="text-gray-400">{additionalIngredients}</p>

				<div className="flex flex-col gap-4 mt-5">
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={(value) => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={(value) => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
					<div className="grid grid-cols-3 gap-3">
						{ingredients.map((item) => (
							<IngredientItem
								key={item.id}
								name={item.name}
								price={item.price}
								imageUrl={item.imageUrl}
								onClick={() => addIngredient(item.id)}
								active={selectedIngredientIds.has(item.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className="h-[55px] px-10 text-base rounded-[18px] w-full mt-5"
				>
					Додати до кошику за {totalPrice} грн
				</Button>
			</div>
		</div>
	)
}
