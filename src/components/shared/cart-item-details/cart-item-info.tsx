import { cn } from '@/lib'

interface Props {
	name: string
	details: string
	className?: string
}

export const CartItemInfo = ({ name, details, className }: Props) => {
	return (
		<div>
			<div className={cn('flex items-center justify-between', className)}>
				<h2 className='flex-1 text-lg leading-6 font-bold'>{name}</h2>
			</div>

			{details && (
				<p className='w-full text-xs text-gray-400' dangerouslySetInnerHTML={{ __html: details }}></p>
			)}
		</div>
	)
}
