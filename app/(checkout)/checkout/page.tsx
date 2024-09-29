// 'use client'

// import toast from 'react-hot-toast'
// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { FormProvider, useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'

// import {
// 	CheckoutSidebar,
// 	Container,
// 	Title,
// 	CheckoutAddressForm,
// 	CheckoutCart,
// 	CheckoutPersonalForm,
// } from '@/components/shared'
// import { CheckoutFormValues, checkoutFormSchema } from '@/constants'
// import { useCart } from '@/hooks'
// import { createOrder } from '@/app/actions'
// import { Api } from '@/services/api-client'

// export default function CheckoutPage() {
// 	const [submitting, setSubmitting] = useState(false)
// 	const { data: session } = useSession()
// 	const { totalAmount, updateItemQuantity, items, removeCartItem, loading } = useCart()

// 	const form = useForm<CheckoutFormValues>({
// 		resolver: zodResolver(checkoutFormSchema),
// 		defaultValues: {
// 			email: '',
// 			firstName: '',
// 			lastName: '',
// 			phone: '',
// 			address: '',
// 			comment: '',
// 		},
// 	})

// 	useEffect(() => {
// 		async function fetchUserInfo() {
// 			const data = await Api.auth.getMe()
// 			const [firstName, lastName] = data.fullName.split(' ')

// 			form.setValue('firstName', firstName)
// 			form.setValue('lastName', lastName)
// 			form.setValue('email', data.email)
// 		}

// 		if (session) {
// 			fetchUserInfo()
// 		}
// 	}, [session])

// 	const onSubmit = async (data: CheckoutFormValues) => {
// 		try {
// 			setSubmitting(true)

// 			const url = await createOrder(data)

// 			toast.error('Замовлення успішно оформлено! 📝 Перехід на оплату... ', {
// 				icon: '✅',
// 			})

// 			if (url) {
// 				location.href = url
// 			}
// 		} catch (err) {
// 			console.log(err)
// 			setSubmitting(false)
// 			toast.error('Не вдалося створити замовлення', {
// 				icon: '❌',
// 			})
// 		}
// 	}

// 	const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
// 		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
// 		updateItemQuantity(id, newQuantity)
// 	}

// 	return (
// 		<Container className="mt-10">
// 			<Title text="Оформлення замовлення" className="font-extrabold mb-8 text-[36px]" />

// 			<FormProvider {...form}>
// 				<form onSubmit={form.handleSubmit(onSubmit)}>
// 					<div className="flex gap-10">
// 						{/* Left side */}
// 						<div className="flex flex-col gap-10 flex-1 mb-20">
// 							<CheckoutCart
// 								onClickCountButton={onClickCountButton}
// 								removeCartItem={removeCartItem}
// 								items={items}
// 								loading={loading}
// 							/>

// 							<CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />

// 							<CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
// 						</div>

// 						{/* Right side */}
// 						<div className="w-[450px]">
// 							<CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
// 						</div>
// 					</div>
// 				</form>
// 			</FormProvider>
// 		</Container>
// 	)
// }
