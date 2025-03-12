'use client'

import { PropsWithChildren } from 'react'
import NextTopLoader from 'nextjs-toploader'
import { SessionProvider } from 'next-auth/react'

import { Toaster } from '@/components/ui'

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>

			<Toaster position="bottom-right" expand={false} richColors />

			<NextTopLoader showSpinner={false} />
		</>
	)
}
