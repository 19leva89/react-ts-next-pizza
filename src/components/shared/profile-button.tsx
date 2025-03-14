import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CircleUser, User } from 'lucide-react'

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
					variant="outline"
					onClick={onClickLogin}
					className="flex items-center gap-1 transition-colors ease-in-out duration-300"
				>
					<User size={16} />
					Увійти
				</Button>
			) : (
				<Link href="/user/profile">
					<Button
						variant="outline"
						className="flex items-center gap-2 transition-colors ease-in-out duration-300"
					>
						<CircleUser size={18} />
						Профіль
					</Button>
				</Link>
			)}
		</div>
	)
}
