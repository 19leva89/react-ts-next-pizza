import { PropsWithChildren, ReactNode, Suspense } from 'react'

import { Header } from '@/components/shared'

type Props = PropsWithChildren<{
	modal: ReactNode
}>

export default function PlatformLayout({ children, modal }: Props) {
	return (
		<main className='min-h-screen'>
			<Suspense>
				<Header />
			</Suspense>

			{children}
			{modal}
		</main>
	)
}
