'use client'

import { useRouter } from 'next/navigation'

import { cn } from '@/lib'
import { ProductForm } from '@/components/shared'
import { Ingredient } from '@/generated/prisma/client'
import { ProductWithRelations } from '@/config/prisma-types'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui'

interface Props {
	product: ProductWithRelations
	ingredients: Ingredient[]
	className?: string
}

export const ChooseProductModal = ({ product, ingredients, className }: Props) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('min-h-[550px] w-265 max-w-265 overflow-hidden bg-white p-0 sm:max-w-265', className)}
				aria-describedby={undefined}
			>
				<DialogTitle>
					<ProductForm product={product} ingredients={ingredients} onSubmit={() => router.back()} />
				</DialogTitle>

				<DialogDescription className='hidden' />
			</DialogContent>
		</Dialog>
	)
}
