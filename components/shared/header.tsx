'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User } from 'lucide-react'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { CartButton, Container, SearchInput } from '@/components/shared'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header: FC<Props> = ({ hasSearch = true, hasCart = true, className }) => {
	return (
		<header className={(cn('border-b'), className)}>
			<Container className="flex items-center justify-between py-8">
				{/* Left part */}
				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" width={35} height={35} alt="logo" />

						<div>
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">смачніше вже нікуди</p>
						</div>
					</div>
				</Link>

				{/* Search part */}
				{hasSearch && (
					<div className="mx-10 flex-1">
						<SearchInput />
					</div>
				)}

				{/* Right part */}
				<div className="flex items-center gap-3">
					<Button variant="outline" className="flex items-center gap-1">
						<User size={16} />
						Увійти
					</Button>

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
