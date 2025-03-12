/* eslint-disable @next/next/no-img-element */

import { CartItemDTO } from '@/services/dto/cart.dto'

interface Props {
	orderId: number
	totalAmount: number
	paymentUrl: string
	items: CartItemDTO[]
}

export const PayOrderTemplate = ({ orderId, totalAmount, paymentUrl, items }: Props) => (
	<div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
		<h1 style={{ textAlign: 'center', color: '#ff5e00' }}>Замовлення #{orderId}</h1>

		<p style={{ fontSize: '16px' }}>
			Оплатіть замовлення на суму <b>{totalAmount} грн</b>. Перейдіть{' '}
			<a href={paymentUrl} style={{ color: '#174ab8', textDecoration: 'none' }}>
				за цим посиланням
			</a>{' '}
			для оплати замовлення.
		</p>

		<hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />

		<p style={{ fontSize: '18px', marginBottom: '10px' }}>Список товарів:</p>
		<ul style={{ padding: 0, listStyleType: 'none' }}>
			{items.map((item) => {
				const bdImagePath = item.productItem.product.imageUrl
				const imageUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/image?url=${encodeURIComponent(bdImagePath + '.png')}&width=60&height=60`

				return (
					<li key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
						<img
							src={imageUrl}
							alt={item.productItem.product.name}
							style={{
								width: '60px',
								height: '60px',
								objectFit: 'cover',
								borderRadius: '5px',
								marginRight: '10px',
								backgroundColor: 'transparent',
							}}
						/>

						<div style={{ fontSize: '16px' }}>
							<p style={{ margin: 0 }}>
								<b>{item.productItem.product.name}</b>
							</p>
							<p style={{ margin: 0 }}>
								{item.productItem.price} грн x {item.quantity} шт. ={' '}
								<b>{item.productItem.price * item.quantity} грн</b>
							</p>
						</div>
					</li>
				)
			})}
		</ul>

		<hr style={{ border: '1px solid #ccc', margin: '20px 0' }} />

		<p style={{ fontSize: '14px', textAlign: 'center', color: '#999' }}>Дякуємо за Ваше замовлення!</p>
	</div>
)
