'use client'

import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { cn } from '@/lib'
import { ProfileButton } from '@/components/shared'
import { AuthModal } from '@/components/shared/modals'
import { CartButton, Container, SearchInput } from '@/components/shared'

interface Props {
	hasSearch?: boolean
	hasCart?: boolean
	className?: string
}

export const Header = ({ hasSearch = true, hasCart = true, className }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const [openAuthModal, setOpenAuthModal] = useState(false)

	useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'Замовлення успішно сплачено! Інформація надіслана на пошту'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Пошта успішно підтверджена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<header className={(cn('border-b'), className)}>
			<Container className='flex items-center justify-between py-8'>
				{/* Left part */}
				<Link href='/'>
					<div className='flex items-center gap-4'>
						<Image src='/logo.png' width={35} height={35} alt='logo' />

						<div>
							<h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
							<p className='text-sm leading-3 text-gray-400'>смачніше вже нікуди</p>
						</div>
					</div>
				</Link>

				{/* Search part */}
				{hasSearch && (
					<div className='mx-10 flex-1'>
						<SearchInput />
					</div>
				)}

				{/* Right part */}
				<div className='flex items-center gap-3'>
					<AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />

					<ProfileButton onClickLogin={() => setOpenAuthModal(true)} />

					{hasCart && <CartButton />}
				</div>
			</Container>
		</header>
	)
}
