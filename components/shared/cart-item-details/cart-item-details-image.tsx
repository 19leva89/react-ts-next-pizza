import { FC } from 'react'
import Image from 'next/image'

import { cn } from '@/lib'

interface Props {
	src: string
	className?: string
}

export const CartItemDetailsImage: FC<Props> = ({ src, className }) => {
	//TODO: Написать Alt
	return <Image className={cn('w-[60px] h-[60px]', className)} src={src} width={60} height={60} alt="" />
}
