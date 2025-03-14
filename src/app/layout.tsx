import type { Metadata } from 'next'
import { PropsWithChildren } from 'react'

import { siteConfig } from '@/config/site'
import { Providers } from '@/components/shared/providers'

import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s | ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: '/logo.png',
			href: '/logo.png',
		},
	],
}

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en">
			<body className={nunito.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
