import Image from 'next/image'

import { cn } from '@/lib'

interface Props {
	src: string
	name: string
	className?: string
}

export const CartItemDetailsImage = ({ src, name, className }: Props) => {
	return <Image className={cn('size-15', className)} src={src} width={60} height={60} alt={name} />
}
