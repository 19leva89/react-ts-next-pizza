import { PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/lib'
import { Title } from '@/components/shared'
import { Separator } from '@/components/ui'

interface Props {
	title?: string
	endAdornment?: ReactNode
	className?: string
	contentClassName?: string
}

export const WhiteBlock = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}: PropsWithChildren<Props>) => {
	return (
		<div className={cn('rounded-3xl bg-white', className)}>
			{title && (
				<>
					<div className='flex items-center justify-between p-5 px-7'>
						<Title text={title} size='sm' className='font-bold' />

						{endAdornment}
					</div>

					<Separator />
				</>
			)}

			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	)
}
