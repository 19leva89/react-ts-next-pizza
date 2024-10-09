/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
import { hashSync } from 'bcrypt'
import { prisma } from './../prisma/db'
import { categories, ingredients, products, storyItems, stories } from './constants'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

async function up() {
	const data = JSON.parse(fs.readFileSync('./prisma/ua_locations_10_11_2021.json', 'utf8'))

	const states = []
	const districts = []
	const communities = []
	const cities = []
	const villages = []

	for (const item of data) {
		switch (item.type) {
			case 'STATE':
				states.push(item)
				break
			case 'DISTRICT':
				districts.push(item)
				break
			case 'COMMUNITY':
				communities.push(item)
				break
			case 'CITY':
				cities.push(item)
				break
			case 'VILLAGE':
				villages.push(item)
				break
		}
	}

	// Создание записей для областей
	for (const state of states) {
		const createdState = await prisma.state.create({
			data: {
				name: state.name.uk,
			},
		})

		// Создание записей для районов, связанных с областями
		const relatedDistricts = districts.filter((district) => district.parent_id === state.id)
		for (const district of relatedDistricts) {
			const createdDistrict = await prisma.district.create({
				data: {
					name: district.name.uk,
					stateId: createdState.id, // Связь с областью
				},
			})

			// Создание записей для громад, связанных с районами
			const relatedCommunities = communities.filter((community) => community.parent_id === district.id)
			for (const community of relatedCommunities) {
				const createdCommunity = await prisma.community.create({
					data: {
						name: community.name.uk,
						districtId: createdDistrict.id, // Связь с районом
					},
				})

				// Создание записей для городов, связанных с громадами
				const relatedCities = cities.filter((city) => city.parent_id === community.id)
				await prisma.city.createMany({
					data: relatedCities.map((city) => ({
						name: city.name.uk,
						communityId: createdCommunity.id, // Связь с громадой
					})),
				})

				// Создание записей для сел, связанных с громадами
				const relatedVillages = villages.filter((village) => village.parent_id === community.id)
				await prisma.village.createMany({
					data: relatedVillages.map((village) => ({
						name: village.name.uk,
						communityId: createdCommunity.id, // Связь с громадой
					})),
				})
			}
		}
	}

	await prisma.user.createMany({
		data: [
			{
				fullName: 'User',
				email: 'user@gmail.com',
				password: hashSync('IntelPentiumv2', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@gmail.com',
				password: hashSync('IntelPentiumv2', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	})

	await prisma.category.createMany({
		data: categories,
	})

	await prisma.ingredient.createMany({
		data: ingredients,
	})

	await prisma.product.createMany({
		data: products,
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Бефстроганів',
			imageUrl: '/assets/img/pizzas/beef-stroganoff',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[1], ingredients[6], ingredients[11], ingredients[2], ingredients[13]],
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: `М'ясна з аджикою 🌶🌶`,
			imageUrl: '/assets/img/pizzas/meat-with-adjika',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[19], ingredients[10], ingredients[5], ingredients[9], ingredients[2]],
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Креветки із солодким чилі',
			imageUrl: '/assets/img/pizzas/sweet-chili-shrimp',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[20], ingredients[14], ingredients[16], ingredients[2]],
			},
		},
	})

	const pizza4 = await prisma.product.create({
		data: {
			name: 'Сирна 🌱👶',
			imageUrl: '/assets/img/pizzas/cheese',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[2], ingredients[3]],
			},
		},
	})

	const pizza5 = await prisma.product.create({
		data: {
			name: 'Пепероні фреш',
			imageUrl: '/assets/img/pizzas/pepperoni-fresh',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[9], ingredients[2], ingredients[12]],
			},
		},
	})

	const pizza6 = await prisma.product.create({
		data: {
			name: 'Подвійне курча 👶',
			imageUrl: '/assets/img/pizzas/double-chicken',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[2]],
			},
		},
	})

	const pizza7 = await prisma.product.create({
		data: {
			name: 'Шинка та сир',
			imageUrl: '/assets/img/pizzas/ham-and-cheese',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[8], ingredients[2]],
			},
		},
	})

	const pizza8 = await prisma.product.create({
		data: {
			name: 'Чорізо фреш',
			imageUrl: '/assets/img/pizzas/chorizo-fresh',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[10], ingredients[16], ingredients[2]],
			},
		},
	})

	const pizza9 = await prisma.product.create({
		data: {
			name: 'Жюльєн',
			imageUrl: '/assets/img/pizzas/julien',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[5],
					ingredients[6],
					ingredients[13],
					ingredients[2],
					ingredients[3],
					ingredients[21],
				],
			},
		},
	})

	const pizza10 = await prisma.product.create({
		data: {
			name: 'Песто',
			imageUrl: '/assets/img/pizzas/pesto',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[17], ingredients[12], ingredients[2]],
			},
		},
	})

	const pizza11 = await prisma.product.create({
		data: {
			name: 'Карбонара',
			imageUrl: '/assets/img/pizzas/carbonara',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[7],
					ingredients[3],
					ingredients[2],
					ingredients[12],
					ingredients[14],
					ingredients[15],
					ingredients[21],
				],
			},
		},
	})

	const pizza12 = await prisma.product.create({
		data: {
			name: `М'ясна`,
			imageUrl: '/assets/img/pizzas/meat',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[8], ingredients[9], ingredients[10], ingredients[2]],
			},
		},
	})

	const pizza13 = await prisma.product.create({
		data: {
			name: 'Арріва',
			imageUrl: '/assets/img/pizzas/arriva',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[5],
					ingredients[10],
					ingredients[16],
					ingredients[13],
					ingredients[12],
					ingredients[2],
					ingredients[21],
				],
			},
		},
	})

	const pizza14 = await prisma.product.create({
		data: {
			name: 'Бургер-піца',
			imageUrl: '/assets/img/pizzas/burger-pizza',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[8],
					ingredients[11],
					ingredients[12],
					ingredients[13],
					ingredients[2],
					ingredients[21],
				],
			},
		},
	})

	const pizza15 = await prisma.product.create({
		data: {
			name: 'Сирне курча',
			imageUrl: '/assets/img/pizzas/cheese-chicken',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[2], ingredients[3], ingredients[12], ingredients[21]],
			},
		},
	})

	const pizza16 = await prisma.product.create({
		data: {
			name: 'Next',
			imageUrl: '/assets/img/pizzas/next',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[7],
					ingredients[18],
					ingredients[9],
					ingredients[2],
					ingredients[12],
					ingredients[8],
					ingredients[18],
					ingredients[13],
					ingredients[21],
				],
			},
		},
	})

	const pizza17 = await prisma.product.create({
		data: {
			name: 'Пепероні',
			imageUrl: '/assets/img/pizzas/pepperoni',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[9], ingredients[2]],
			},
		},
	})

	const pizza18 = await prisma.product.create({
		data: {
			name: 'Чотири сезони',
			imageUrl: '/assets/img/pizzas/four-seasons',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[2],
					ingredients[8],
					ingredients[9],
					ingredients[17],
					ingredients[12],
					ingredients[8],
					ingredients[15],
				],
			},
		},
	})

	const pizza19 = await prisma.product.create({
		data: {
			name: 'Гавайська',
			imageUrl: '/assets/img/pizzas/hawaiian',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[14], ingredients[2]],
			},
		},
	})

	const pizza20 = await prisma.product.create({
		data: {
			name: 'Шинка та гриби',
			imageUrl: '/assets/img/pizzas/ham-and-mushrooms',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[8], ingredients[6], ingredients[2]],
			},
		},
	})

	const pizza21 = await prisma.product.create({
		data: {
			name: 'Курча барбекю',
			imageUrl: '/assets/img/pizzas/chicken-bbq',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[7], ingredients[13], ingredients[2]],
			},
		},
	})

	const pizza22 = await prisma.product.create({
		data: {
			name: 'Курча ранч',
			imageUrl: '/assets/img/pizzas/chicken-ranch',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[5], ingredients[8], ingredients[2], ingredients[12], ingredients[21]],
			},
		},
	})

	const pizza23 = await prisma.product.create({
		data: {
			name: 'Маргарита 🌱',
			imageUrl: '/assets/img/pizzas/margarita',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[2], ingredients[12], ingredients[15]],
			},
		},
	})

	const pizza24 = await prisma.product.create({
		data: {
			name: 'Діабло 🌶🌶',
			imageUrl: '/assets/img/pizzas/diablo',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[10],
					ingredients[4],
					ingredients[18],
					ingredients[12],
					ingredients[16],
					ingredients[13],
					ingredients[2],
				],
			},
		},
	})

	const pizza25 = await prisma.product.create({
		data: {
			name: 'Ковбаски барбекю',
			imageUrl: '/assets/img/pizzas/sausages-bbq',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[10], ingredients[12], ingredients[13], ingredients[2]],
			},
		},
	})

	const pizza26 = await prisma.product.create({
		data: {
			name: 'Овочі та гриби 🌱',
			imageUrl: '/assets/img/pizzas/vegetables-and-mushrooms',
			categoryId: 1,
			ingredients: {
				connect: [
					ingredients[6],
					ingredients[12],
					ingredients[16],
					ingredients[13],
					ingredients[17],
					ingredients[2],
					ingredients[15],
				],
			},
		},
	})

	const pizza27 = await prisma.product.create({
		data: {
			name: `М'ясний мікс із баварськими ковбасками`,
			imageUrl: '/assets/img/pizzas/meat-mix-with-bavarian-sausages',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[19], ingredients[9], ingredients[10], ingredients[7], ingredients[2]],
			},
		},
	})

	const pizza28 = await prisma.product.create({
		data: {
			name: 'Подвійна пепероні',
			imageUrl: '/assets/img/pizzas/double-pepperoni',
			categoryId: 1,
			ingredients: {
				connect: [ingredients[10], ingredients[2]],
			},
		},
	})

	await prisma.productItem.createMany({
		data: [
			// Бефстроганів
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// М'ясна з аджикою 🌶🌶
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Креветки із солодким чилі
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Сирна 🌱👶
			{ productId: pizza4.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza4.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza4.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza4.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza4.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Пепероні фреш
			{ productId: pizza5.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza5.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza5.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza5.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza5.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Подвійне курча 👶
			{ productId: pizza6.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza6.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza6.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza6.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza6.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Шинка та сир
			{ productId: pizza7.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza7.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza7.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza7.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza7.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Чорізо фреш
			{ productId: pizza8.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza8.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza8.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza8.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza8.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Жюльєн
			{ productId: pizza9.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza9.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza9.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza9.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza9.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Песто
			{ productId: pizza10.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza10.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza10.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza10.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza10.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Карбонара
			{ productId: pizza11.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza11.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza11.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza11.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza11.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// М'ясна
			{ productId: pizza12.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza12.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza12.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza12.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza12.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Арріва
			{ productId: pizza13.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza13.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza13.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza13.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza13.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Бургер-піца
			{ productId: pizza14.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza14.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza14.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza14.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza14.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Сирне курча
			{ productId: pizza15.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza15.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza15.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza15.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza15.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Next
			{ productId: pizza16.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza16.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza16.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza16.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza16.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Пепероні
			{ productId: pizza17.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza17.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza17.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza17.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza17.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Чотири сезони
			{ productId: pizza18.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza18.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza18.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza18.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza18.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Гавайська
			{ productId: pizza19.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza19.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza19.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza19.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza19.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Шинка та гриби
			{ productId: pizza20.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza20.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza20.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza20.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza20.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Курча барбекю
			{ productId: pizza21.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza21.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza21.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza21.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza21.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Курча ранч
			{ productId: pizza22.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza22.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza22.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza22.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza22.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Маргарита 🌱
			{ productId: pizza23.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza23.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza23.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza23.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza23.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Діабло 🌶🌶
			{ productId: pizza24.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza24.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza24.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza24.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza24.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Ковбаски барбекю
			{ productId: pizza25.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza25.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza25.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza25.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza25.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Овочі та гриби 🌱
			{ productId: pizza26.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza26.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza26.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza26.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza26.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// М'ясний мікс із баварськими ковбасками
			{ productId: pizza27.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza27.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza27.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza27.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza27.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Подвійна пепероні
			{ productId: pizza28.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza28.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza28.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza28.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza28.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Остальные продукты
			{ productId: 1, price: randomNumber(100, 180) },
			{ productId: 2, price: randomNumber(100, 180) },
			{ productId: 3, price: randomNumber(100, 180) },
			{ productId: 4, price: randomNumber(100, 180) },
			{ productId: 5, price: randomNumber(100, 180) },
			{ productId: 6, price: randomNumber(100, 180) },
			{ productId: 7, price: randomNumber(100, 180) },
			{ productId: 8, price: randomNumber(100, 180) },
			{ productId: 9, price: randomNumber(100, 180) },
			{ productId: 10, price: randomNumber(100, 180) },
			{ productId: 11, price: randomNumber(100, 180) },
			{ productId: 12, price: randomNumber(100, 180) },
			{ productId: 13, price: randomNumber(100, 180) },
			{ productId: 14, price: randomNumber(100, 180) },
			{ productId: 15, price: randomNumber(100, 180) },
			{ productId: 16, price: randomNumber(100, 180) },
			{ productId: 17, price: randomNumber(100, 180) },
			{ productId: 18, price: randomNumber(100, 180) },
			{ productId: 19, price: randomNumber(100, 180) },
			{ productId: 20, price: randomNumber(100, 180) },
			{ productId: 21, price: randomNumber(100, 180) },
			{ productId: 22, price: randomNumber(100, 180) },
			{ productId: 23, price: randomNumber(100, 180) },
			{ productId: 24, price: randomNumber(100, 180) },
			{ productId: 25, price: randomNumber(100, 180) },
			{ productId: 26, price: randomNumber(100, 180) },
			{ productId: 27, price: randomNumber(100, 180) },
			{ productId: 28, price: randomNumber(100, 180) },
			{ productId: 29, price: randomNumber(100, 180) },
			{ productId: 30, price: randomNumber(100, 180) },
			{ productId: 31, price: randomNumber(100, 180) },
			{ productId: 32, price: randomNumber(100, 180) },
			{ productId: 33, price: randomNumber(100, 180) },
			{ productId: 34, price: randomNumber(100, 180) },
			{ productId: 35, price: randomNumber(100, 180) },
			{ productId: 36, price: randomNumber(100, 180) },
			{ productId: 37, price: randomNumber(100, 180) },
			{ productId: 38, price: randomNumber(100, 180) },
			{ productId: 39, price: randomNumber(100, 180) },
			{ productId: 40, price: randomNumber(100, 180) },
			{ productId: 41, price: randomNumber(100, 180) },
			{ productId: 42, price: randomNumber(100, 180) },
			{ productId: 43, price: randomNumber(100, 180) },
			{ productId: 44, price: randomNumber(100, 180) },
			{ productId: 45, price: randomNumber(100, 180) },
			{ productId: 46, price: randomNumber(100, 180) },
			{ productId: 47, price: randomNumber(100, 180) },
			{ productId: 48, price: randomNumber(100, 180) },
			{ productId: 49, price: randomNumber(100, 180) },
			{ productId: 50, price: randomNumber(100, 180) },
			{ productId: 51, price: randomNumber(100, 180) },
			{ productId: 52, price: randomNumber(100, 180) },
			{ productId: 53, price: randomNumber(100, 180) },
			{ productId: 54, price: randomNumber(100, 180) },
			{ productId: 55, price: randomNumber(100, 180) },
			{ productId: 56, price: randomNumber(100, 180) },
			{ productId: 57, price: randomNumber(100, 180) },
			{ productId: 58, price: randomNumber(100, 180) },
			{ productId: 59, price: randomNumber(100, 180) },
			{ productId: 60, price: randomNumber(100, 180) },
			{ productId: 61, price: randomNumber(100, 180) },
			{ productId: 62, price: randomNumber(100, 180) },
			{ productId: 63, price: randomNumber(100, 180) },
			{ productId: 64, price: randomNumber(100, 180) },
			{ productId: 65, price: randomNumber(100, 180) },
			{ productId: 66, price: randomNumber(100, 180) },
			{ productId: 67, price: randomNumber(100, 180) },
			{ productId: 68, price: randomNumber(100, 180) },
			{ productId: 69, price: randomNumber(100, 180) },
			{ productId: 70, price: randomNumber(100, 180) },
			{ productId: 71, price: randomNumber(100, 180) },
			{ productId: 72, price: randomNumber(100, 180) },
			{ productId: 73, price: randomNumber(100, 180) },
			{ productId: 74, price: randomNumber(100, 180) },
			{ productId: 75, price: randomNumber(100, 180) },
			{ productId: 76, price: randomNumber(100, 180) },
			{ productId: 77, price: randomNumber(100, 180) },
			{ productId: 78, price: randomNumber(100, 180) },
			{ productId: 79, price: randomNumber(100, 180) },
			{ productId: 80, price: randomNumber(100, 180) },
			{ productId: 81, price: randomNumber(100, 180) },
			{ productId: 82, price: randomNumber(100, 180) },
			{ productId: 83, price: randomNumber(100, 180) },
			{ productId: 84, price: randomNumber(100, 180) },
			{ productId: 85, price: randomNumber(100, 180) },
			{ productId: 86, price: randomNumber(100, 180) },
			{ productId: 87, price: randomNumber(100, 180) },
			{ productId: 88, price: randomNumber(100, 180) },
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				token: '11111',
				totalAmount: 0,
			},
			{
				userId: 2,
				token: '22222',
				totalAmount: 0,
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productItemId: 1,
			cartId: 1,
			userId: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})

	await prisma.story.createMany({
		data: stories,
	})

	await prisma.storyItem.createMany({
		data: storyItems,
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Order" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "State" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "District" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Community" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "City" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Village" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "VerificationCode" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
