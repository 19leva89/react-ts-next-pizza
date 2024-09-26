import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Plus } from 'lucide-react'
// import { Ingredient } from '@prisma/client'

import { Button } from '@/components/ui'
import { Title } from '@/components/shared'

interface Props {
	id: number
	name: string
	price: number
	imageUrl: string
	// ingredients: Ingredient[]
	className?: string
}

export const ProductCard: FC<Props> = ({ id, name, price, imageUrl, ingredients, className }) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
					<Image className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
				</div>

				<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

				<p className="text-sm text-gray-400">
					Курча, моцарелла, сири чеддер та пармезан, сирний соус, томати, соус альфредо, часник
					{/* {ingredients.map((ingredient) => ingredient.name).join(', ')} */}
				</p>

				<div className="flex justify-between items-center mt-4">
					<span className="text-[20px]">
						від <b>{price} грн</b>
					</span>

					<Button variant="secondary" className="text-base font-bold">
						<Plus size={20} className="mr-1" />
						Додати
					</Button>
				</div>
			</Link>
		</div>
	)
}
