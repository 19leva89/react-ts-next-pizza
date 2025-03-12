import { cn } from '@/lib'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice = ({ value, className }: Props) => {
	return <h2 className={cn('font-bold', className)}>{value} грн</h2>
}
