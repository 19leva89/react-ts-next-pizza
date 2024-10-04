import { FC } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { CircleUser, User } from 'lucide-react'

import { Button } from '@/components/ui'

interface Props {
	onClickLogin?: () => void
	className?: string
}

export const ProfileButton: FC<Props> = ({ className, onClickLogin }) => {
	const { data: session } = useSession()

	return (
		<div className={className}>
			{!session ? (
				<Button onClick={onClickLogin} variant="outline" className="flex items-center gap-1">
					<User size={16} />
					Увійти
				</Button>
			) : (
				<Link href="/profile">
					<Button variant="outline" className="flex items-center gap-2">
						<CircleUser size={18} />
						Профіль
					</Button>
				</Link>
			)}
		</div>
	)
}
