import { Suspense } from 'react'

import { findPizzas, GetSearchParams } from '@/lib/find-pizzas'
import { Container, Filters, ProductsGroupList, Stories, Title, TopBar } from '@/components/shared'

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
	const categories = await findPizzas(searchParams)

	const ingredientsIdArr = searchParams.ingredients?.split(',').map(Number) || []

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
			<Container className="mt-10">
				<Title text="Усі товари" size="lg" className="font-extrabold" />
			</Container>

			<TopBar categories={categories.filter((category) => category.products.length > 0)} />

			<Stories />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					{/* Filter */}
					<div className="w-[250px]">
						<Suspense>
							<Filters />
						</Suspense>
					</div>

					{/* Product list */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
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
			</Container>
		</>
	)
}
