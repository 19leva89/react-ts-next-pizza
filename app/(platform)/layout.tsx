import { ReactNode, Suspense } from 'react'

import { Header } from '@/components/shared'

export default function PlatformLayout({
	children,
	modal,
}: Readonly<{
	children: ReactNode
	modal: ReactNode
}>) {
	return (
		<main className="min-h-screen">
			<Suspense>
				<Header />
			</Suspense>

			{children}
			{modal}
		</main>
	)
}
