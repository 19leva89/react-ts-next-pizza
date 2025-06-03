'use client'

import { cn } from '@/lib'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	value?: Variant['value']
	onClick?: (value: Variant['value']) => void
	className?: string
}

export const GroupVariants = ({ items, value, onClick, className }: Props) => {
	return (
		<div className={cn(className, 'flex justify-between rounded-3xl bg-[#F3F3F7] p-1 select-none')}>
			{items.map((item) => (
				<button
					key={item.name}
					onClick={() => !item.disabled && onClick?.(item.value)}
					className={cn(
						'flex h-[30px] flex-1 cursor-pointer items-center justify-center rounded-3xl px-5 text-sm transition-all duration-400',
						{
							'bg-white shadow': item.value === value,
							'cursor-not-allowed text-gray-500 opacity-50': item.disabled,
						},
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
