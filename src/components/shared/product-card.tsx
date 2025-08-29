import Link from 'next/link'
import Image from 'next/image'
import { PlusIcon } from 'lucide-react'

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

export const ProductCard = ({ id, name, description, price, imageUrl, ingredients, className }: Props) => {
	return (
		<div className={cn('rounded-lg bg-gray-50 p-2', className)}>
			<Link href={`/product/${id}`} className='flex h-full flex-col'>
				<div className='flex-grow'>
					<div className='group flex justify-center overflow-hidden rounded-lg p-2'>
						<Image
							src={imageUrl}
							alt={name}
							width={250}
							height={250}
							className='transform transition-transform duration-300 ease-in-out group-hover:translate-y-1'
						/>
					</div>

					<Title text={name} size='sm' className='mt-3 mb-1 font-bold' />

					<p className='text-sm text-gray-400'>
						{ingredients.map((ingredient) => ingredient.name).join(', ')}
						{description}
					</p>
				</div>

				<div className='mt-4 flex flex-wrap content-center items-center justify-between'>
					<span className='text-[20px] whitespace-nowrap'>
						від <b>{price} грн</b>
					</span>

					<Button
						variant='outline'
						className='bg-[#ffe4d5] text-base font-bold transition-colors duration-300 ease-in-out'
					>
						<PlusIcon size={20} className='mr-1' />
						Додати
					</Button>
				</div>
			</Link>
		</div>
	)
}
