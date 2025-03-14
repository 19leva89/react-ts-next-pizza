import { Metadata } from 'next'
import { PropsWithChildren, Suspense } from 'react'

import { Container, Header } from '@/components/shared'

export const metadata: Metadata = {
	title: 'Оформлення',
	description: 'Generated by create next app',
}

export default function CheckoutLayout({ children }: PropsWithChildren) {
	return (
		<main className="min-h-screen bg-[#F4F1EE]">
			<Container>
				<Suspense>
					<Header hasSearch={false} hasCart={false} className="border-b-gray-200" />
				</Suspense>

				{children}
			</Container>
		</main>
	)
}
