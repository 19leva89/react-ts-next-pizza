import { Container, Filters, ProductsGroupList, Title, TopBar } from '@/components/shared'

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="Усі піци" size="lg" className="font-extrabold" />
			</Container>

			<TopBar />

			<Container className="mt-10 pb-14">
				<div className="flex gap-[80px]">
					{/* Filter */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Product list */}
					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title={'Піци'}
								items={[
									{ id: 1, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 2, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 3, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 4, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 5, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 6, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
								]}
								categoryId={1}
							/>

							<ProductsGroupList
								title={'Комбо'}
								items={[
									{ id: 1, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 2, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 3, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 4, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 5, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
									{ id: 6, name: 'Чотири сезони', imageUrl: '', price: 10, items: [{ price: 500 }] },
								]}
								categoryId={2}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	)
}
