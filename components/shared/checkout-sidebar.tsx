import React, { FC } from 'react'
import { ArrowRight, Package, TicketPercent, Truck } from 'lucide-react'

import { cn } from '@/lib'
import { Button, Skeleton } from '@/components/ui'
import { CheckoutItemDetails, WhiteBlock } from '@/components/shared'

const DISCOUNT = 15
const DELIVERY_PRICE = 250

interface Props {
	totalAmount: number
	loading?: boolean
	className?: string
}

export const CheckoutSidebar: FC<Props> = ({ totalAmount, loading, className }) => {
	const discountPrice = (totalAmount * DISCOUNT) / 100
	const totalPrice = totalAmount + DELIVERY_PRICE - discountPrice

	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className="flex flex-col gap-1">
				<span className="text-xl">Разом:</span>
				{loading ? (
					<Skeleton className="h-11 w-48" />
				) : (
					<span className="h-11 text-[34px] font-extrabold">{totalPrice} грн</span>
				)}
			</div>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Package size={18} className="mr-2 text-gray-400" />
						Вартість товарів:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${totalAmount} грн`}
			/>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<Truck size={18} className="mr-2 text-gray-400" />
						Доставка:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${DELIVERY_PRICE} грн`}
			/>

			<CheckoutItemDetails
				title={
					<div className="flex items-center">
						<TicketPercent size={18} className="mr-2 text-gray-400" />
						Знижка:
					</div>
				}
				value={loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${discountPrice} грн`}
			/>

			<Button loading={loading} type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
				Перейти до оплати
				<ArrowRight className="w-5 ml-2" />
			</Button>
		</WhiteBlock>
	)
}
