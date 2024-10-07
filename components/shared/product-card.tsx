import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'

import { Ingredient } from '@prisma/client'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { Title } from '@/components/shared'

interface Props {
	id: number
	name: string
	description?: string
	price: number
	imageUrl: string
	ingredients: Ingredient[]
	className?: string
}

export const ProductCard: FC<Props> = ({
	id,
	name,
	description,
	price,
	imageUrl,
	ingredients,
	className,
}) => {
	return (
		<div className={cn('bg-gray-50 p-2 rounded-lg', className)}>
			<Link href={`/product/${id}`} className="flex flex-col h-full">
				<div className="flex-grow">
					<div className="flex justify-center p-2 rounded-lg overflow-hidden group">
						<Image
							src={imageUrl}
							alt={name}
							width={250}
							height={250}
							className="transform transition-transform duration-300 ease-in-out group-hover:translate-y-1"
						/>
					</div>

					<Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

					<p className="text-sm text-gray-400">
						{ingredients.map((ingredient) => ingredient.name).join(', ')}
						{description}
					</p>
				</div>

				<div className="flex flex-wrap justify-between items-center content-center mt-4">
					<span className="text-[20px] whitespace-nowrap">
						від <b>{price} грн</b>
					</span>

					<Button variant="outline" className="text-base font-bold bg-[#ffe4d5]">
						<Plus size={20} className="mr-1" />
						Додати
					</Button>
				</div>
			</Link>
		</div>
	)
}
