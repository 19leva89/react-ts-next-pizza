'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

import { Ingredient } from '@prisma/client'
import { ProductWithRelations } from '@/@types/prisma'

import { cn } from '@/lib'
import { ProductForm } from '@/components/shared'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui'

interface Props {
	product: ProductWithRelations
	ingredients: Ingredient[]
	className?: string
}

export const ChooseProductModal: FC<Props> = ({ product, ingredients, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}
				aria-describedby={undefined}
			>
				<DialogTitle>
					<ProductForm product={product} ingredients={ingredients} onSubmit={() => router.back()} />
				</DialogTitle>
			</DialogContent>
		</Dialog>
	)
}
