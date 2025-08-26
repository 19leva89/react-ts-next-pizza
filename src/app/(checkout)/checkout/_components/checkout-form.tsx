'use client'

import { toast } from 'sonner'
import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import {
	CheckoutAddressForm,
	CheckoutCart,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
	Title,
} from '@/components/shared'
import { useCart } from '@/hooks'
import { createOrder } from '@/app/actions'
import { checkoutFormSchema, CheckoutFormValues } from '@/constants'

export const CheckoutForm = ({ session }: { session: Session | null }) => {
	const [submitting, setSubmitting] = useState(false)

	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()

	const form = useForm<CheckoutFormValues>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			state: '',
			city: '',
			address: '',
			comment: '',
		},
	})

	useEffect(() => {
		async function fetchUserInfo() {
			try {
				if (!session?.user?.name) {
					form.setValue('firstName', '')
					form.setValue('lastName', '')
					form.setValue('email', session?.user?.email || '')

					return
				}

				const [firstName = '', lastName = ''] = session?.user?.name.split(' ')

				form.setValue('firstName', firstName)
				form.setValue('lastName', lastName || '')
				form.setValue('email', session?.user?.email || '')
			} catch (error) {
				console.error('Failed to fetch user info:', error)
			}
		}

		if (session) {
			fetchUserInfo()
		}
	}, [form, session])

	const onSubmit = async (data: CheckoutFormValues) => {
		try {
			// console.log('Submitted data:', data)

			setSubmitting(true)

			const url = await createOrder(data)

			toast.success('Замовлення успішно оформлене! 📝 Перехід на оплату... ')

			if (url) {
				location.href = url
			}
		} catch (err) {
			console.log(err)
			setSubmitting(false)
			toast.error('Не вдалося створити замовлення')
		}
	}

	const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Container className='mt-10'>
			<Title text='Оформлення замовлення' className='mb-8 text-[36px] font-extrabold' />

			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						{/* Left side */}
						<div className='mb-20 flex flex-1 flex-col gap-10'>
							<CheckoutCart
								items={items}
								loading={loading}
								removeCartItem={removeCartItem}
								onClickCountButton={onClickCountButton}
							/>

							<CheckoutPersonalForm className={loading ? 'pointer-events-none opacity-40' : ''} />

							<CheckoutAddressForm className={loading ? 'pointer-events-none opacity-40' : ''} />
						</div>

						{/* Right side */}
						<div className='w-[450px]'>
							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
