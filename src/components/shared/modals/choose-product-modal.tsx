'use client'

import { useRouter } from 'next/navigation'

import { Ingredient } from '@prisma/client'
import { ProductWithRelations } from '@/config/prisma-types'

import { cn } from '@/lib'
import { ProductForm } from '@/components/shared'
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
				className={cn('p-0 sm:max-w-265 w-265 max-w-265 min-h-[550px] bg-white overflow-hidden', className)}
				aria-describedby={undefined}
			>
				<DialogTitle>
					<ProductForm product={product} ingredients={ingredients} onSubmit={() => router.back()} />
				</DialogTitle>

				<DialogDescription className="hidden" />
			</DialogContent>
		</Dialog>
	)
}
