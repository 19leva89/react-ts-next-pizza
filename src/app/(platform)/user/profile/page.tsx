import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './_components/profile-form'

const ProfilePage = async () => {
	const session = await auth()

	if (!session) {
		return redirect('/not-auth')
	}

	const user = await prisma.user.findFirst({ where: { id: session.user.id } })

	if (!user) {
		return redirect('/not-auth')
	}

	return <ProfileForm data={user} />
}

export default ProfilePage
