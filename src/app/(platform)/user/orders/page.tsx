import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { OrderItem } from './_components/order-item'
import { Container, InfoBlock, Title } from '@/components/shared'

const OrdersPage = async () => {
	const session = await auth()

	if (!session) {
		redirect('auth/not-auth')
	}

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
					<Title text='Мої замовлення' size='md' className='mb-8 font-bold' />

					<div className='mb-20 flex w-full flex-1 flex-col gap-3'>
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
					type='empty'
					title='У вас наразі немає замовлень'
					text='Але це ніколи не пізно виправити!'
					imageUrl='/assets/img/empty-box.png'
				/>
			)}
		</Container>
	)
}

export default OrdersPage
