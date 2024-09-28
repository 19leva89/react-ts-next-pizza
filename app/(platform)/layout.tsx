import { Suspense } from 'react'

import { Header } from '@/components/shared'

export default function PlatformLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode
	modal: React.ReactNode
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
