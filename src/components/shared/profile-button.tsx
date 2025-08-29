import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CircleUserIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
	onClickLogin?: () => void
	className?: string
}

export const ProfileButton = ({ className, onClickLogin }: Props) => {
	const { data: session } = useSession()

	return (
		<div className={className}>
			{!session ? (
				<Button
					variant='outline'
					onClick={onClickLogin}
					className='flex items-center gap-1 transition-colors duration-300 ease-in-out'
				>
					<UserIcon size={16} />
					Увійти
				</Button>
			) : (
				<Link href='/user/orders'>
					<Button
						variant='outline'
						className='flex items-center gap-2 transition-colors duration-300 ease-in-out'
					>
						<CircleUserIcon size={18} />
						Профіль
					</Button>
				</Link>
			)}
		</div>
	)
}
