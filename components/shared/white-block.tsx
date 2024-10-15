import { FC, PropsWithChildren, ReactNode } from 'react'

import { cn } from '@/lib'
import { Title } from '@/components/shared'
import { Separator } from '@/components/ui'

interface Props {
	title?: string
	endAdornment?: ReactNode
	className?: string
	contentClassName?: string
}

export const WhiteBlock: FC<PropsWithChildren<Props>> = ({
	title,
	endAdornment,
	className,
	contentClassName,
	children,
}) => {
	return (
		<div className={cn('bg-white rounded-3xl', className)}>
			{title && (
				<>
					<div className="flex items-center justify-between p-5 px-7">
						<Title text={title} size="sm" className="font-bold" />

						{endAdornment}
					</div>

					<Separator />
				</>
			)}

			<div className={cn('px-5 py-4', contentClassName)}>{children}</div>
		</div>
	)
}
