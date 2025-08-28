'use client'

import Link from 'next/link'
import Image from 'next/image'
import { PropsWithChildren, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { useCart } from '@/hooks'
import { cn, getCartItemDetails } from '@/lib'
import { PizzaSize, PizzaType } from '@/constants'

import {
	Button,
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui'
import { getProductPluralize } from '@/lib'
import { CartDrawerItem } from '@/components/shared'

export const CartDrawer = ({ children }: PropsWithChildren) => {
	const [redirecting, setRedirecting] = useState<boolean>(false)

	const { items, totalAmount, removeCartItem, updateItemQuantity } = useCart()

	const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1

		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between bg-[#F4F1EE] pb-0' aria-describedby={undefined}>
				<div className={cn('flex h-full flex-col', !totalAmount && 'justify-center')}>
					<SheetHeader>
						<SheetTitle>
							{totalAmount > 0 ? (
								<>
									<span>У кошику </span>

									<span className='font-bold'>
										{items.length} {getProductPluralize(items.length)}
									</span>
								</>
							) : (
								<div className='my-2 text-center font-bold'>Кошик порожній</div>
							)}
						</SheetTitle>

						{totalAmount > 0 && (
							<SheetDescription className='sr-only'>Список товарів в кошику</SheetDescription>
						)}
					</SheetHeader>

					{totalAmount > 0 ? (
						<>
							<div className='mt-5 flex-1 overflow-auto'>
								{items.map((item) => {
									const bdImagePath = item.imageUrl
									const imageUrl = `${bdImagePath}.avif`

									return (
										<div key={item.id} className='mb-2'>
											<CartDrawerItem
												id={item.id}
												name={item.name}
												imageUrl={imageUrl}
												details={getCartItemDetails(
													item.ingredients,
													item.pizzaType as PizzaType,
													item.pizzaSize as PizzaSize,
													item.weight as number,
												)}
												price={item.price}
												quantity={item.quantity}
												disabled={item.disabled}
												onClickRemove={() => removeCartItem(item.id)}
												onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
											/>
										</div>
									)
								})}
							</div>

							<SheetFooter className='bg-white p-8'>
								<div className='w-full'>
									<div className='mb-4 flex'>
										<span className='flex flex-1 text-lg text-neutral-500'>
											Разом
											<div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200' />
										</span>

										<span className='text-lg font-bold'>{totalAmount} грн</span>
									</div>

									<Link href='/checkout'>
										<Button
											type='submit'
											loading={redirecting}
											onClick={() => setRedirecting(true)}
											className='h-12 w-full text-base transition-colors duration-300 ease-in-out'
										>
											Оформити замовлення
											<ArrowRight className='ml-2 w-5' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					) : (
						<div className='mx-auto flex w-72 flex-col items-center justify-center'>
							<Image src='/assets/img/empty-box.png' alt='empty cart' width={120} height={120} />

							<p className='mb-5 text-center text-neutral-500'>Але це ніколи не пізно виправити :)</p>

							<SheetClose asChild>
								<Button size='lg' className='h-12 w-56 text-base transition-colors duration-300 ease-in-out'>
									<ArrowLeft className='mr-2 w-5' />
									Повернутись назад
								</Button>
							</SheetClose>
						</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
