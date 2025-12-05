'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { SearchIcon, XIcon } from 'lucide-react'
import { useClickAway, useDebounce } from 'react-use'

import { cn } from '@/lib'
import { Button } from '@/components/ui'
import { Api } from '@/services/api-client'
import { Product } from '@/generated/prisma/client'

interface Props {
	className?: string
}

export const SearchInput = ({ className }: Props) => {
	const ref = useRef<HTMLDivElement | null>(null)

	const [focused, setFocused] = useState<boolean>(false)
	const [products, setProducts] = useState<Product[]>([])
	const [searchQuery, setSearchQuery] = useState<string>('')

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery)

				setProducts(response)
			} catch (error) {
				console.log(error)
			}
		},
		500,
		[searchQuery],
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{focused && <div className='fixed top-0 right-0 bottom-0 left-0 z-30 bg-black/50' />}

			<div ref={ref} className={cn('relative z-30 flex h-11 flex-1 justify-between rounded-2xl', className)}>
				<SearchIcon className='absolute top-1/2 left-3 h-5 translate-y-[-50%] text-gray-400' />

				<input
					type='text'
					placeholder='Знайти товар...'
					className='w-full rounded-2xl bg-gray-100 pl-11 outline-none'
					value={searchQuery}
					onFocus={() => setFocused(true)}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>

				{products.length > 0 && (
					<div
						className={cn(
							'invisible absolute top-14 z-30 w-full rounded-2xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
							focused && 'visible top-12 opacity-100',
						)}
					>
						{products.map((product) => {
							const bdImagePath = product.imageUrl
							const imageUrl = `${bdImagePath}.avif`

							return (
								<Link
									key={product.id}
									href={`/product/${product.id}`}
									onClick={onClickItem}
									className='flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10'
								>
									<Image className='rounded-sm' src={imageUrl} alt={product.name} width={32} height={32} />

									<span>{product.name}</span>
								</Link>
							)
						})}
					</div>
				)}

				{products.length === 0 && searchQuery && (
					<div
						className={cn(
							'invisible absolute top-14 z-30 w-full rounded-2xl bg-white py-2 opacity-0 shadow-md transition-all duration-200',
							focused && 'visible top-12 opacity-100',
						)}
					>
						<p className='w-full px-3 py-2 text-gray-400 hover:bg-primary/10'>
							Нічого не знайдено, спробуйте змінити запит
						</p>
					</div>
				)}

				{focused && searchQuery && (
					<Button
						size='icon'
						variant='ghost'
						onClick={() => setSearchQuery('')}
						className='absolute top-1/2 right-3 h-5 translate-y-[-50%] text-gray-400'
					>
						<XIcon />
					</Button>
				)}
			</div>
		</>
	)
}
