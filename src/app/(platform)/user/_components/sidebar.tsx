'use client'

import {
	BadgePercentIcon,
	BellIcon,
	HeartIcon,
	LogOutIcon,
	MailIcon,
	MapPinIcon,
	PackageOpenIcon,
	UserIcon,
} from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib'
import { Button, Separator } from '@/components/ui'

export const Sidebar = () => {
	const pathname = usePathname()

	const navigationItems = [
		{ href: '/user/profile', icon: UserIcon, label: 'Особисті дані' },
		{ href: '/user/orders', icon: PackageOpenIcon, label: 'Замовлення' },
		{ href: '/user/delivery', icon: MapPinIcon, label: 'Адреси доставки' },
		{ href: '/user/discount', icon: BadgePercentIcon, label: 'Дисконт' },
		{ href: '/user/wishlist', icon: HeartIcon, label: 'Закладки' },
		{ href: '/user/subscribes', icon: MailIcon, label: 'Розсилка' },
		{ href: '/user/notice', icon: BellIcon, label: 'Повідомлення' },
	]

	const onClickSignOut = () => {
		signOut({
			callbackUrl: '/',
		})
	}

	return (
		<div className='flex flex-col gap-5'>
			{navigationItems.map(({ href, icon: Icon, label }) => (
				<Link key={href} href={href}>
					<Button
						type='button'
						variant='secondary'
						className={cn(
							'flex w-full justify-start gap-3 border text-base transition-colors duration-300 ease-in-out hover:border-primary',
							pathname === href && 'border-primary',
						)}
					>
						<Icon />
						{label}
					</Button>
				</Link>
			))}

			<Separator />

			<Button
				type='button'
				variant='ghost'
				onClick={onClickSignOut}
				className='flex w-full justify-start gap-3 border-transparent text-base transition-colors duration-300 ease-in-out'
			>
				<LogOutIcon />
				Вийти
			</Button>
		</div>
	)
}
