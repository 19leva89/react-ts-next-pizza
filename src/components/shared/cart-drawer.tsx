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
	const [redirecting, setRedirecting] = useState(false)
	const { items, totalAmount, removeCartItem, updateItemQuantity } = useCart()

	const onClickCountButton = (id: string, quantity: number, type: 'plus' | 'minus') => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1

		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]" aria-describedby={undefined}>
				<div className={cn('flex flex-col h-full', !totalAmount && 'justify-center')}>
					<SheetHeader>
						<SheetTitle>
							{totalAmount > 0 ? (
								<>
									<span>У кошику </span>

									<span className="font-bold">
										{items.length} {getProductPluralize(items.length)}
									</span>
								</>
							) : (
								<div className="text-center font-bold my-2">Кошик порожній</div>
							)}
						</SheetTitle>

						{totalAmount > 0 && (
							<SheetDescription className="sr-only">Список товарів в кошику</SheetDescription>
						)}
					</SheetHeader>

					{totalAmount > 0 ? (
						<>
							<div className="mt-5 overflow-auto flex-1">
								{items.map((item) => {
									const bdImagePath = item.imageUrl
									const imageUrl = `${bdImagePath}.avif`

									return (
										<div key={item.id} className="mb-2">
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

							<SheetFooter className="bg-white p-8">
								<div className="w-full">
									<div className="flex mb-4">
										<span className="flex flex-1 text-lg text-neutral-500">
											Разом
											<div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
										</span>

										<span className="font-bold text-lg">{totalAmount} грн</span>
									</div>

									<Link href="/checkout">
										<Button
											type="submit"
											loading={redirecting}
											onClick={() => setRedirecting(true)}
											className="w-full h-12 text-base transition-colors ease-in-out duration-300"
										>
											Оформити замовлення
											<ArrowRight className="w-5 ml-2" />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					) : (
						<div className="flex flex-col items-center justify-center w-72 mx-auto">
							<Image src="/assets/img/empty-box.png" alt="empty cart" width={120} height={120} />

							<p className="text-center text-neutral-500 mb-5">Але це ніколи не пізно виправити :)</p>

							<SheetClose asChild>
								<Button className="w-56 h-12 text-base transition-colors ease-in-out duration-300" size="lg">
									<ArrowLeft className="w-5 mr-2" />
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
