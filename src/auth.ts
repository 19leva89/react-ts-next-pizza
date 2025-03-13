import NextAuth from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { prisma } from '@/lib/prisma'
import authConfig from '@/auth.config'

export const { auth, handlers, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma) as Adapter,

	secret: process.env.NEXTAUTH_SECRET,

	session: {
		strategy: 'jwt',
		// maxAge: 30 * 60, // 30 minutes
		// updateAge: 10 * 60, // 10 minutes
	},

	callbacks: {
		async signIn({ user, account, profile }) {
			try {
				if (account?.provider === 'credentials') return true

				if (!user.email || !account) return false

				// Find existing account
				const existingAccount = await prisma.account.findFirst({
					where: {
						provider: account.provider,
						providerAccountId: account.providerAccountId,
					},
					include: { user: true },
				})

				// If account exists, return
				if (existingAccount) return true

				// Find user by email
				const existingUser = await prisma.user.findUnique({
					where: { email: user.email },
					include: { accounts: true },
				})

				// If user exists, but has no account - create
				if (existingUser) {
					// Checking if the user has an account
					const hasAccount = existingUser.accounts.some((a) => a.provider === account.provider)

					if (!hasAccount) {
						await prisma.account.create({
							data: {
								userId: existingUser.id,
								provider: account.provider,
								providerAccountId: account.providerAccountId,
								type: 'oauth',
								...(account as any),
							},
						})
					}
					return true
				}

				// Create new user
				const newUser = await prisma.user.create({
					data: {
						email: user.email,
						fullName: user.name || profile?.name || `User#${Math.random().toString(36).slice(2, 7)}`,
						verified: new Date(),
						accounts: {
							create: {
								provider: account.provider,
								providerAccountId: account.providerAccountId,
								type: 'oauth',
								...(account as any),
							},
						},
					},
				})

				return true
			} catch (error) {
				console.error('Error [SIGNIN]', error)
				return false
			}
		},

		async jwt({ token }) {
			if (!token.email) {
				return token
			}

			const findUser = await prisma.user.findUnique({
				where: { email: token.email },
				select: { id: true, email: true, fullName: true, image: true, role: true },
			})

			if (findUser) {
				token.id = findUser.id
				token.email = findUser.email
				token.name = findUser.fullName
				token.image = findUser.image
				token.role = findUser.role
			}

			return token
		},

		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string
				session.user.email = token.email as string
				session.user.role = token.role as string
			}

			return session
		},
	},

	...authConfig,
})
