import { FC } from 'react'

import { cn } from '@/lib'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice: FC<Props> = ({ value, className }) => {
	return <h2 className={cn('font-bold', className)}>{value} грн</h2>
}
