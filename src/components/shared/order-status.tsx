import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui'
import { OrderStatus as IOrderStatus } from '@prisma/client'

interface Props {
	variant: IOrderStatus
	text?: string
	className?: string
}

export const OrderStatus = ({ className, variant, text }: Props) => {
	const textStatusMap: Record<IOrderStatus, string> = {
		SUCCEEDED: 'Сплачено',
		CANCELLED: 'Скасовано',
		PENDING: 'В обробці',
	}

	return (
		<Badge
			className={cn(
				{
					'bg-green-100 text-green-700 hover:bg-green-100': variant === IOrderStatus.SUCCEEDED,
					'bg-red-100 text-red-700 hover:bg-red-100': variant === IOrderStatus.CANCELLED,
					'bg-yellow-100 text-yellow-700 hover:bg-yellow-100': variant === IOrderStatus.PENDING,
				},
				'text-sm font-normal',
				className,
			)}
		>
			{textStatusMap[variant] || text}
		</Badge>
	)
}
