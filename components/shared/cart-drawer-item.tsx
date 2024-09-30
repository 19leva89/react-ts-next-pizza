import { FC } from 'react'
import Image from 'next/image'
import { Trash2Icon } from 'lucide-react'

import { cn } from '@/lib'
import { CartItemInfo, CountButton } from '@/components/shared'

export interface CartItemProps {
	id: number
	name: string
	imageUrl: string
	details: string
	price: number
	quantity: number
	disabled?: boolean
}
interface Props extends CartItemProps {
	className?: string
	onClickRemove?: () => void
	onClickCountButton?: (type: 'plus' | 'minus') => void
}

export const CartDrawerItem: FC<Props> = ({
	imageUrl,
	name,
	price,
	quantity,
	details,
	disabled,
	onClickRemove,
	onClickCountButton,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex bg-white p-5 gap-6',
				{
					'opacity-50 pointer-events-none': disabled,
				},
				className,
			)}
		>
			<Image
				className={cn('h-[60px] w-[60px]', className)}
				src={imageUrl}
				width={60}
				height={60}
				alt="cart details"
			/>

			<div className="flex-1">
				<CartItemInfo name={name} details={details} />

				<hr className="my-3" />

				<div className="flex items-center justify-between">
					<CountButton onClick={onClickCountButton} value={quantity} />

					<div className="flex items-center gap-3">
						<h2 className={cn('font-bold', className)}>{price} грн</h2>

						<Trash2Icon
							size={16}
							onClick={onClickRemove}
							className="text-gray-400 cursor-pointer hover:text-gray-600"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
