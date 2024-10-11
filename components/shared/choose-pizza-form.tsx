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
		weight,
		selectedIngredientIds,
		availableSizes,
		currentItemId,
		setSize,
		setType,
		addIngredient,
	} = usePizzaOptions(items)

	const { details, additionalIngredients } = getPizzaDetails(
		type,
		size,
		weight,
		ingredients,
		selectedIngredientIds,
	)

	const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredientIds)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredientIds))
		}
	}

	return (
		<div className={cn(className, 'flex flex-1')}>
			<PizzaImage name={name} size={size} imageUrl={imageUrl} />

			<div className="flex flex-col justify-between w-[490px] h-[800px] bg-[#f7f6f5] p-7">
				<div className="flex flex-col justify-start">
					<Title text={name} size="md" className="font-extrabold mb-1" />

					<p className="text-gray-400 text-sm">{details}</p>

					<p className="text-gray-400 text-sm">{additionalIngredients}</p>

					<div className="flex flex-col gap-1 mt-2">
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

					<div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-1">
						<div className="grid grid-cols-3 gap-3">
							{ingredients.map((item) => {
								const bdImagePath = item.imageUrl
								const imageUrl = `${bdImagePath}.png`

								return (
									<IngredientItem
										key={item.id}
										name={item.name}
										price={item.price}
										imageUrl={imageUrl}
										onClick={() => addIngredient(item.id)}
										active={selectedIngredientIds.has(item.id)}
									/>
								)
							})}
						</div>
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
