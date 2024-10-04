'use client'

import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import { FC, PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<SessionProvider>{children}</SessionProvider>

			<Toaster />

			<NextTopLoader showSpinner={false} />
		</>
	)
}
