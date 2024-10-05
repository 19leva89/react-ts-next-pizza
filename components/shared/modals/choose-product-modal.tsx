'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

import { ProductWithRelations } from '@/@types/prisma'

import { cn } from '@/lib'
import { ProductForm } from '@/components/shared'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[550px] bg-white overflow-hidden', className)}
				aria-describedby={undefined}
			>
				<DialogTitle>
					<ProductForm product={product} onSubmit={() => router.back()} />
				</DialogTitle>
			</DialogContent>
		</Dialog>
	)
}
