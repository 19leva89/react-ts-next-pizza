// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultUser } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import type { UserRole } from '../src/generated/prisma/enums'

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string
			role: UserRole
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		role: UserRole
	}
}

declare module 'next-auth/jwt' {
	interface JWT extends DefaultJWT {
		id: string
		role: UserRole
	}
}
