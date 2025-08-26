'use client'

import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { BadgePercent, Bell, Heart, LogOut, Mail, MapPin, PackageOpen, User } from 'lucide-react'

import { cn } from '@/lib'
import { Button, Separator } from '@/components/ui'

export const Sidebar = () => {
	const pathname = usePathname()

	const navigationItems = [
		{ href: '/user/profile', icon: User, label: 'Особисті дані' },
		{ href: '/user/orders', icon: PackageOpen, label: 'Замовлення' },
		{ href: '/user/delivery', icon: MapPin, label: 'Адреси доставки' },
		{ href: '/user/discount', icon: BadgePercent, label: 'Дисконт' },
		{ href: '/user/wishlist', icon: Heart, label: 'Закладки' },
		{ href: '/user/subscribes', icon: Mail, label: 'Розсилка' },
		{ href: '/user/notice', icon: Bell, label: 'Повідомлення' },
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
				<LogOut />
				Вийти
			</Button>
		</div>
	)
}
