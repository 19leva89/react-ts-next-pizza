import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { OrderItem } from './_components/order-item'
import { Container, InfoBlock, Title } from '@/components/shared'

const OrdersPage = async () => {
	const session = await auth()

	const orders = await prisma.order.findMany({
		where: {
			userId: session?.user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	})

	return (
		<Container>
			{orders.length > 0 ? (
				<>
					<Title text="Мої замовлення" size="md" className="font-bold mb-8" />

					<div className="flex flex-col gap-3 flex-1 mb-20 w-full">
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
				</>
			) : (
				<InfoBlock
					title="У вас наразі немає замовлень"
					text="Але це ніколи не пізно виправити!"
					imageUrl="/assets/img/empty-box.png"
				/>
			)}
		</Container>
	)
}

export default OrdersPage
