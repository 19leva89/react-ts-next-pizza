'use client'

import { ChevronUp } from 'lucide-react'
import { useEffect, useState } from 'react'

import { cn } from '@/lib'
import { Button } from '@/components/ui'

type Props = {
	className?: string
}

export const ScrollToTop = ({ className }: Props) => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const scrolled = window.scrollY
			const screenHeight = window.innerHeight

			if (scrolled > screenHeight) {
				setVisible(true)
			} else {
				setVisible(false)
			}
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		})
	}

	return (
		<>
			{visible && (
				<Button
					type="button"
					variant="outline"
					className={cn(
						'fixed bottom-11 left-11 rounded-full p-0 transition-colors ease-in-out duration-300',
						className,
					)}
					onClick={scrollToTop}
				>
					<ChevronUp width={28} height={28} />
				</Button>
			)}
		</>
	)
}
