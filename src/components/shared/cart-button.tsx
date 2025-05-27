'use client'

import { shallow } from 'zustand/shallow'
import { ArrowRight, ShoppingCart } from 'lucide-react'

import { cn } from '@/lib'
import { useCartStore } from '@/store'
import { Button } from '@/components/ui'
import { CartDrawer } from '@/components/shared'

interface Props {
	className?: string
}

export const CartButton = ({ className }: Props) => {
	const [items, totalAmount, loading] = useCartStore(
		(state) => [state.items, state.totalAmount, state.loading],
		shallow,
	)

	return (
		<CartDrawer>
			<Button loading={loading} className={cn('group relative', { 'w-[105px]': loading }, className)}>
				<b>{totalAmount} грн</b>

				<span className="h-full w-px mx-3 bg-white/30" />

				<div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
					<ShoppingCart size={16} className="relative" strokeWidth={2} />

					<b>{items.length}</b>
				</div>

				<ArrowRight
					size={20}
					className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
				/>
			</Button>
		</CartDrawer>
	)
}
