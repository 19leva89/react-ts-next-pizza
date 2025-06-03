import { Suspense } from 'react'

import {
	Container,
	Filters,
	ProductsGroupList,
	ScrollToTop,
	SortPopup,
	Stories,
	Title,
	TopBar,
} from '@/components/shared'
import { GetSearchParams, sortProducts } from '@/lib/sort-products'

type Props = {
	searchParams: Promise<GetSearchParams>
}

const HomePage = async ({ searchParams }: Props) => {
	const params = await searchParams
	const categories = await sortProducts(params)

	const ingredientsIdArr = params.ingredients?.split(',').map(Number) || []

	const filteredCategories = categories
		.map((category) => ({
			...category,
			products: category.products.filter((product) =>
				ingredientsIdArr.every((ingredientId) =>
					product.ingredients.some((ingredient) => ingredient.id === ingredientId),
				),
			),
		}))
		.filter((category) => category.products.length > 0)

	return (
		<>
			<Container className='mt-10 flex justify-between gap-10 rounded-2xl'>
				<Title text='Усі товари' size='lg' className='font-extrabold' />

				<div className='flex items-center'>
					<SortPopup />
				</div>
			</Container>

			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Stories />

			<Container className='mt-10 pb-14'>
				<div className='flex gap-20'>
					{/* Filter */}
					<div className='w-[250px]'>
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Product list */}
					<div className='flex-1'>
						<div className='flex flex-col gap-16'>
							{filteredCategories.map((category) => (
								<ProductsGroupList
									key={category.id}
									title={category.name}
									slug={category.slug}
									categoryId={category.id}
									items={category.products}
								/>
							))}
						</div>
					</div>
				</div>

				<ScrollToTop className='size-12 bg-[#ffe4d5] font-bold' />
			</Container>
		</>
	)
}

export default HomePage
