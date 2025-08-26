import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './_components/profile-form'

const ProfilePage = async () => {
	const session = await auth()

	if (!session) {
		redirect('/auth/not-auth')
	}

	const user = await prisma.user.findFirst({
		where: { id: session?.user.id },
		select: {
			name: true,
			email: true,
		},
	})

	if (!user) {
		redirect('/auth/not-auth')
	}

	return <ProfileForm data={user} />
}

export default ProfilePage
