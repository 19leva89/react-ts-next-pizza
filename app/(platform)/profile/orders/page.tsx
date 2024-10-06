import { notFound, redirect } from 'next/navigation'

import { prisma } from '@/prisma/db'
import { getUserSession } from '@/lib/get-user-session'
import { Container, OrderItem, Title } from '@/components/shared'

export default async function OrdersPage() {
	const session = await getUserSession()

	if (!session) {
		return redirect('/not-auth')
	}

	const orders = await prisma.order.findMany({
		where: {
			userId: Number(session?.id),
		},
	})

	if (!orders) {
		return notFound()
	}

	return (
		<Container className="my-5">
			<Title text="Мої замовлення" size="xl" className="font-extrabold mb-8" />

			<div className="flex flex-col gap-10 flex-1 mb-20 w-[70%]">
				{orders.map((order) => (
					<OrderItem
						key={order.id}
						id={order.id}
						items={order.items ? JSON.parse(order.items as string) : []}
						createdAt={order.createdAt.toLocaleDateString('uk-UA', {
							day: 'numeric',
							month: 'long',
							year: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
							second: 'numeric',
						})}
						totalAmount={order.totalAmount}
						status={order.status}
					/>
				))}
			</div>
		</Container>
	)
}
