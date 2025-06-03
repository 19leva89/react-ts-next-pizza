'use client'

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
export const ChoosePizzaForm = ({
	name,
	items,
	imageUrl,
	ingredients,
	loading,
	onSubmit,
	className,
}: Props) => {
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

			<div className='flex h-200 w-[490px] flex-col justify-between bg-[#f7f6f5] p-7'>
				<div className='flex flex-col justify-start'>
					<Title text={name} size='md' className='mb-1 font-extrabold' />

					<p className='text-sm text-gray-400'>{details}</p>

					<p className='text-sm text-gray-400'>{additionalIngredients}</p>

					<div className='mt-2 flex flex-col gap-1'>
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

					<div className='scrollbar mt-1 h-105 overflow-auto rounded-md bg-gray-50 p-5'>
						<div className='grid grid-cols-3 gap-3'>
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
					className='mt-5 h-[55px] w-full rounded-[18px] px-10 text-base transition-colors duration-300 ease-in-out'
				>
					Додати до кошику за {totalPrice} грн
				</Button>
			</div>
		</div>
	)
}
