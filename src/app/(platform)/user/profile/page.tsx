import { redirect } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/get-user-session'
import { ProfileForm } from './_components/profile-form'

const ProfilePage = async () => {
	const session = await getUserSession()

	if (!session) {
		return redirect('/not-auth')
	}

	const user = await prisma.user.findFirst({ where: { id: session?.id } })

	if (!user) {
		return redirect('/not-auth')
	}

	return <ProfileForm data={user} />
}

export default ProfilePage
