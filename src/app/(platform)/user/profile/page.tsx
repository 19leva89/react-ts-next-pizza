import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './_components/profile-form'

const ProfilePage = async () => {
	const session = await auth()

	const user = await prisma.user.findFirst({ where: { id: session?.user.id } })

	return <ProfileForm data={user!} />
}

export default ProfilePage
