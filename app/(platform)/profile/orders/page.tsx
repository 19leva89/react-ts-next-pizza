import Image from 'next/image'
import { redirect } from 'next/navigation'

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
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<Container className="my-5">
			<Title text="Мої замовлення" size="xl" className="font-extrabold mb-8" />

			{orders.length > 0 ? (
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
			) : (
				<div className="flex flex-col items-center justify-center gap-3 mx-auto">
					<Image src="/assets/img/empty-box.png" alt="empty orders" width={120} height={120} />

					<p className="text-center text-xl mt-6">У вас наразі немає замовлень</p>

					<p className="text-center text-lg">Але це ніколи не пізно виправити!</p>
				</div>
			)}
		</Container>
	)
}
