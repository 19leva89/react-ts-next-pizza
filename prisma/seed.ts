import fs from 'fs'
import { hashSync } from 'bcryptjs'
import { prisma } from '../src/lib/prisma'
import { categories, ingredients, products, storyItems, stories } from './constants'

async function up() {
	const data = JSON.parse(fs.readFileSync('./prisma/ua_locations_10_11_2021.json', 'utf8'))

	const states = [] // Области
	const districts = [] // Районы
	const communities = [] // Громады
	const cities = [] // Города
	const villages = [] // Села

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
				name: 'User',
				email: 'user@gmail.com',
				password: hashSync('IntelPentiumv2', 10),
				emailVerified: new Date(),
				role: 'USER',
			},
			{
				name: 'Admin',
				email: 'admin@gmail.com',
				password: hashSync('IntelPentiumv2', 10),
				emailVerified: new Date(),
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
			{ productId: pizza1.id, price: 183, pizzaType: 1, pizzaSize: 20, weight: 410 },
			{ productId: pizza1.id, price: 273, pizzaType: 1, pizzaSize: 30, weight: 570 },
			{ productId: pizza1.id, price: 333, pizzaType: 1, pizzaSize: 40, weight: 770 },
			{ productId: pizza1.id, price: 273, pizzaType: 2, pizzaSize: 30, weight: 420 },
			{ productId: pizza1.id, price: 333, pizzaType: 2, pizzaSize: 40, weight: 680 },

			// М'ясна з аджикою 🌶🌶
			{ productId: pizza2.id, price: 183, pizzaType: 1, pizzaSize: 20, weight: 420 },
			{ productId: pizza2.id, price: 273, pizzaType: 1, pizzaSize: 30, weight: 610 },
			{ productId: pizza2.id, price: 333, pizzaType: 1, pizzaSize: 40, weight: 840 },
			{ productId: pizza2.id, price: 273, pizzaType: 2, pizzaSize: 30, weight: 520 },
			{ productId: pizza2.id, price: 333, pizzaType: 2, pizzaSize: 40, weight: 720 },

			// Креветки із солодким чилі
			{ productId: pizza3.id, price: 196, pizzaType: 1, pizzaSize: 20, weight: 390 },
			{ productId: pizza3.id, price: 299, pizzaType: 1, pizzaSize: 30, weight: 630 },
			{ productId: pizza3.id, price: 333, pizzaType: 1, pizzaSize: 40, weight: 800 },
			{ productId: pizza3.id, price: 299, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza3.id, price: 333, pizzaType: 2, pizzaSize: 40, weight: 710 },

			// Сирна 🌱👶
			{ productId: pizza4.id, price: 99, pizzaType: 1, pizzaSize: 20, weight: 310 },
			{ productId: pizza4.id, price: 196, pizzaType: 1, pizzaSize: 30, weight: 470 },
			{ productId: pizza4.id, price: 239, pizzaType: 1, pizzaSize: 40, weight: 640 },
			{ productId: pizza4.id, price: 196, pizzaType: 2, pizzaSize: 30, weight: 360 },
			{ productId: pizza4.id, price: 239, pizzaType: 2, pizzaSize: 40, weight: 530 },

			// Пепероні фреш
			{ productId: pizza5.id, price: 116, pizzaType: 1, pizzaSize: 20, weight: 380 },
			{ productId: pizza5.id, price: 203, pizzaType: 1, pizzaSize: 30, weight: 590 },
			{ productId: pizza5.id, price: 243, pizzaType: 1, pizzaSize: 40, weight: 790 },
			{ productId: pizza5.id, price: 203, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza5.id, price: 243, pizzaType: 2, pizzaSize: 40, weight: 670 },

			// Подвійне курча 👶
			{ productId: pizza6.id, price: 159, pizzaType: 1, pizzaSize: 20, weight: 360 },
			{ productId: pizza6.id, price: 236, pizzaType: 1, pizzaSize: 30, weight: 520 },
			{ productId: pizza6.id, price: 276, pizzaType: 1, pizzaSize: 40, weight: 730 },
			{ productId: pizza6.id, price: 236, pizzaType: 2, pizzaSize: 30, weight: 430 },
			{ productId: pizza6.id, price: 276, pizzaType: 2, pizzaSize: 40, weight: 610 },

			// Шинка та сир
			{ productId: pizza7.id, price: 153, pizzaType: 1, pizzaSize: 20, weight: 320 },
			{ productId: pizza7.id, price: 226, pizzaType: 1, pizzaSize: 30, weight: 480 },
			{ productId: pizza7.id, price: 269, pizzaType: 1, pizzaSize: 40, weight: 630 },
			{ productId: pizza7.id, price: 226, pizzaType: 2, pizzaSize: 30, weight: 370 },
			{ productId: pizza7.id, price: 269, pizzaType: 2, pizzaSize: 40, weight: 550 },

			// Чорізо фреш
			{ productId: pizza8.id, price: 99, pizzaType: 1, pizzaSize: 20, weight: 330 },
			{ productId: pizza8.id, price: 193, pizzaType: 1, pizzaSize: 30, weight: 470 },
			{ productId: pizza8.id, price: 243, pizzaType: 1, pizzaSize: 40, weight: 630 },
			{ productId: pizza8.id, price: 193, pizzaType: 2, pizzaSize: 30, weight: 380 },
			{ productId: pizza8.id, price: 243, pizzaType: 2, pizzaSize: 40, weight: 500 },

			// Жюльєн
			{ productId: pizza9.id, price: 199, pizzaType: 1, pizzaSize: 20, weight: 430 },
			{ productId: pizza9.id, price: 296, pizzaType: 1, pizzaSize: 30, weight: 630 },
			{ productId: pizza9.id, price: 343, pizzaType: 1, pizzaSize: 40, weight: 820 },
			{ productId: pizza9.id, price: 296, pizzaType: 2, pizzaSize: 30, weight: 510 },
			{ productId: pizza9.id, price: 343, pizzaType: 2, pizzaSize: 40, weight: 730 },

			// Песто
			{ productId: pizza10.id, price: 209, pizzaType: 1, pizzaSize: 20, weight: 400 },
			{ productId: pizza10.id, price: 293, pizzaType: 1, pizzaSize: 30, weight: 610 },
			{ productId: pizza10.id, price: 349, pizzaType: 1, pizzaSize: 40, weight: 810 },
			{ productId: pizza10.id, price: 293, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza10.id, price: 349, pizzaType: 2, pizzaSize: 40, weight: 740 },

			// Карбонара
			{ productId: pizza11.id, price: 213, pizzaType: 1, pizzaSize: 20, weight: 410 },
			{ productId: pizza11.id, price: 323, pizzaType: 1, pizzaSize: 30, weight: 590 },
			{ productId: pizza11.id, price: 359, pizzaType: 1, pizzaSize: 40, weight: 800 },
			{ productId: pizza11.id, price: 323, pizzaType: 2, pizzaSize: 30, weight: 520 },
			{ productId: pizza11.id, price: 359, pizzaType: 2, pizzaSize: 40, weight: 710 },

			// М'ясна
			{ productId: pizza12.id, price: 199, pizzaType: 1, pizzaSize: 20, weight: 390 },
			{ productId: pizza12.id, price: 296, pizzaType: 1, pizzaSize: 30, weight: 590 },
			{ productId: pizza12.id, price: 349, pizzaType: 1, pizzaSize: 40, weight: 820 },
			{ productId: pizza12.id, price: 296, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza12.id, price: 349, pizzaType: 2, pizzaSize: 40, weight: 700 },

			// Арріва
			{ productId: pizza13.id, price: 206, pizzaType: 1, pizzaSize: 20, weight: 370 },
			{ productId: pizza13.id, price: 303, pizzaType: 1, pizzaSize: 30, weight: 570 },
			{ productId: pizza13.id, price: 369, pizzaType: 1, pizzaSize: 40, weight: 760 },
			{ productId: pizza13.id, price: 303, pizzaType: 2, pizzaSize: 30, weight: 460 },
			{ productId: pizza13.id, price: 369, pizzaType: 2, pizzaSize: 40, weight: 650 },

			// Бургер-піца
			{ productId: pizza14.id, price: 119, pizzaType: 1, pizzaSize: 20, weight: 420 },
			{ productId: pizza14.id, price: 263, pizzaType: 1, pizzaSize: 30, weight: 630 },
			{ productId: pizza14.id, price: 329, pizzaType: 1, pizzaSize: 40, weight: 890 },
			{ productId: pizza14.id, price: 263, pizzaType: 2, pizzaSize: 30, weight: 540 },
			{ productId: pizza14.id, price: 329, pizzaType: 2, pizzaSize: 40, weight: 780 },

			// Сирне курча
			{ productId: pizza15.id, price: 203, pizzaType: 1, pizzaSize: 20, weight: 410 },
			{ productId: pizza15.id, price: 296, pizzaType: 1, pizzaSize: 30, weight: 620 },
			{ productId: pizza15.id, price: 346, pizzaType: 1, pizzaSize: 40, weight: 860 },
			{ productId: pizza15.id, price: 296, pizzaType: 2, pizzaSize: 30, weight: 510 },
			{ productId: pizza15.id, price: 346, pizzaType: 2, pizzaSize: 40, weight: 760 },

			// Next
			{ productId: pizza16.id, price: 256, pizzaType: 1, pizzaSize: 20, weight: 440 },
			{ productId: pizza16.id, price: 373, pizzaType: 1, pizzaSize: 30, weight: 720 },
			{ productId: pizza16.id, price: 423, pizzaType: 1, pizzaSize: 40, weight: 970 },
			{ productId: pizza16.id, price: 373, pizzaType: 2, pizzaSize: 30, weight: 620 },
			{ productId: pizza16.id, price: 423, pizzaType: 2, pizzaSize: 40, weight: 870 },

			// Пепероні
			{ productId: pizza17.id, price: 173, pizzaType: 1, pizzaSize: 20, weight: 340 },
			{ productId: pizza17.id, price: 263, pizzaType: 1, pizzaSize: 30, weight: 550 },
			{ productId: pizza17.id, price: 309, pizzaType: 1, pizzaSize: 40, weight: 760 },
			{ productId: pizza17.id, price: 263, pizzaType: 2, pizzaSize: 30, weight: 450 },
			{ productId: pizza17.id, price: 309, pizzaType: 2, pizzaSize: 40, weight: 630 },

			// Чотири сезони
			{ productId: pizza18.id, price: 169, pizzaType: 1, pizzaSize: 20, weight: 380 },
			{ productId: pizza18.id, price: 263, pizzaType: 1, pizzaSize: 30, weight: 610 },
			{ productId: pizza18.id, price: 323, pizzaType: 1, pizzaSize: 40, weight: 840 },
			{ productId: pizza18.id, price: 263, pizzaType: 2, pizzaSize: 30, weight: 510 },
			{ productId: pizza18.id, price: 323, pizzaType: 2, pizzaSize: 40, weight: 730 },

			// Гавайська
			{ productId: pizza19.id, price: 173, pizzaType: 1, pizzaSize: 20, weight: 390 },
			{ productId: pizza19.id, price: 263, pizzaType: 1, pizzaSize: 30, weight: 590 },
			{ productId: pizza19.id, price: 309, pizzaType: 1, pizzaSize: 40, weight: 810 },
			{ productId: pizza19.id, price: 263, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza19.id, price: 309, pizzaType: 2, pizzaSize: 40, weight: 680 },

			// Шинка та гриби
			{ productId: pizza20.id, price: 166, pizzaType: 1, pizzaSize: 20, weight: 370 },
			{ productId: pizza20.id, price: 253, pizzaType: 1, pizzaSize: 30, weight: 580 },
			{ productId: pizza20.id, price: 316, pizzaType: 1, pizzaSize: 40, weight: 740 },
			{ productId: pizza20.id, price: 253, pizzaType: 2, pizzaSize: 30, weight: 450 },
			{ productId: pizza20.id, price: 316, pizzaType: 2, pizzaSize: 40, weight: 660 },

			// Курча барбекю
			{ productId: pizza21.id, price: 219, pizzaType: 1, pizzaSize: 20, weight: 420 },
			{ productId: pizza21.id, price: 329, pizzaType: 1, pizzaSize: 30, weight: 640 },
			{ productId: pizza21.id, price: 369, pizzaType: 1, pizzaSize: 40, weight: 900 },
			{ productId: pizza21.id, price: 329, pizzaType: 2, pizzaSize: 30, weight: 540 },
			{ productId: pizza21.id, price: 369, pizzaType: 2, pizzaSize: 40, weight: 780 },

			// Курча ранч
			{ productId: pizza22.id, price: 233, pizzaType: 1, pizzaSize: 20, weight: 390 },
			{ productId: pizza22.id, price: 336, pizzaType: 1, pizzaSize: 30, weight: 610 },
			{ productId: pizza22.id, price: 393, pizzaType: 1, pizzaSize: 40, weight: 880 },
			{ productId: pizza22.id, price: 336, pizzaType: 2, pizzaSize: 30, weight: 530 },
			{ productId: pizza22.id, price: 393, pizzaType: 2, pizzaSize: 40, weight: 740 },

			// Маргарита 🌱
			{ productId: pizza23.id, price: 169, pizzaType: 1, pizzaSize: 20, weight: 400 },
			{ productId: pizza23.id, price: 253, pizzaType: 1, pizzaSize: 30, weight: 590 },
			{ productId: pizza23.id, price: 309, pizzaType: 1, pizzaSize: 40, weight: 830 },
			{ productId: pizza23.id, price: 253, pizzaType: 2, pizzaSize: 30, weight: 500 },
			{ productId: pizza23.id, price: 309, pizzaType: 2, pizzaSize: 40, weight: 710 },

			// Діабло 🌶🌶
			{ productId: pizza24.id, price: 219, pizzaType: 1, pizzaSize: 20, weight: 420 },
			{ productId: pizza24.id, price: 329, pizzaType: 1, pizzaSize: 30, weight: 680 },
			{ productId: pizza24.id, price: 386, pizzaType: 1, pizzaSize: 40, weight: 940 },
			{ productId: pizza24.id, price: 329, pizzaType: 2, pizzaSize: 30, weight: 560 },
			{ productId: pizza24.id, price: 386, pizzaType: 2, pizzaSize: 40, weight: 800 },

			// Ковбаски барбекю
			{ productId: pizza25.id, price: 176, pizzaType: 1, pizzaSize: 20, weight: 370 },
			{ productId: pizza25.id, price: 266, pizzaType: 1, pizzaSize: 30, weight: 570 },
			{ productId: pizza25.id, price: 336, pizzaType: 1, pizzaSize: 40, weight: 760 },
			{ productId: pizza25.id, price: 266, pizzaType: 2, pizzaSize: 30, weight: 480 },
			{ productId: pizza25.id, price: 336, pizzaType: 2, pizzaSize: 40, weight: 670 },

			// Овочі та гриби 🌱
			{ productId: pizza26.id, price: 193, pizzaType: 1, pizzaSize: 20, weight: 420 },
			{ productId: pizza26.id, price: 296, pizzaType: 1, pizzaSize: 30, weight: 610 },
			{ productId: pizza26.id, price: 343, pizzaType: 1, pizzaSize: 40, weight: 870 },
			{ productId: pizza26.id, price: 296, pizzaType: 2, pizzaSize: 30, weight: 530 },
			{ productId: pizza26.id, price: 343, pizzaType: 2, pizzaSize: 40, weight: 740 },

			// М'ясний мікс із баварськими ковбасками
			{ productId: pizza27.id, price: 193, pizzaType: 1, pizzaSize: 20, weight: 370 },
			{ productId: pizza27.id, price: 289, pizzaType: 1, pizzaSize: 30, weight: 580 },
			{ productId: pizza27.id, price: 351, pizzaType: 1, pizzaSize: 40, weight: 790 },
			{ productId: pizza27.id, price: 289, pizzaType: 2, pizzaSize: 30, weight: 460 },
			{ productId: pizza27.id, price: 351, pizzaType: 2, pizzaSize: 40, weight: 670 },

			// Подвійна пепероні
			{ productId: pizza28.id, price: 196, pizzaType: 1, pizzaSize: 20, weight: 390 },
			{ productId: pizza28.id, price: 303, pizzaType: 1, pizzaSize: 30, weight: 620 },
			{ productId: pizza28.id, price: 343, pizzaType: 1, pizzaSize: 40, weight: 770 },
			{ productId: pizza28.id, price: 303, pizzaType: 2, pizzaSize: 30, weight: 490 },
			{ productId: pizza28.id, price: 343, pizzaType: 2, pizzaSize: 40, weight: 660 },

			// Омлет з шинкою і грибами
			{ productId: 1, price: 67, weight: 110 },

			// Омлет з пепероні
			{ productId: 2, price: 67, weight: 110 },

			// Омлет із беконом
			{ productId: 3, price: 67, weight: 130 },

			// Омлет сирний
			{ productId: 4, price: 69, weight: 100 },

			// Додстер із шинкою
			{ productId: 5, price: 73, weight: 160 },

			// Сирники зі згущеним молоком
			{ productId: 6, price: 55, weight: 140 },

			// Сирники з малиновим варенням 👶
			{ productId: 7, price: 53, weight: 150 },

			// Сирники
			{ productId: 8, price: 48, weight: 130 },

			// Кава Американо
			{ productId: 9, price: 36, weight: 380 },

			// Кава Капучіно
			{ productId: 10, price: 56, weight: 250 },

			// Кава Латте
			{ productId: 11, price: 58, weight: 330 },

			// Комбо Сніданок на двох
			{ productId: 12, price: 183 },

			// Паста з креветками
			{ productId: 13, price: 123, weight: 300 },

			// Денвіч шинка та сир
			{ productId: 14, price: 93, weight: 210 },

			// Денвіч чоризо барбекю
			{ productId: 15, price: 93, weight: 210 },

			// Паста Карбонара
			{ productId: 16, price: 123, weight: 350 },

			// Паста М'ясна
			{ productId: 17, price: 123, weight: 330 },

			// Паста Песто
			{ productId: 18, price: 123, weight: 330 },

			// Супермясной Додстер
			{ productId: 19, price: 89, weight: 160 },

			// Додстер із шинкою
			{ productId: 20, price: 73, weight: 160 },

			// Додстер
			{ productId: 21, price: 73, weight: 210 },

			// Острый Додстер 🌶🌶
			{ productId: 22, price: 86, weight: 190 },

			// Грибний Стартер 🌱
			{ productId: 23, price: 73, weight: 160 },

			// Сирний Стартер 🌱
			{ productId: 24, price: 76, weight: 150 },

			// Курячі нагетси
			{ productId: 25, price: 49, weight: 110 },

			// Картопля з печі з соусом 🌱👶
			{ productId: 26, price: 60, weight: 100 },

			// Картопля з печі 🌱👶
			{ productId: 27, price: 46, weight: 80 },

			// Курячі шматочки 👶
			{ productId: 28, price: 89, weight: 120 },

			// Курячі крила барбекю
			{ productId: 29, price: 89, weight: 140 },

			// Ланчбокс з курячими крилами
			{ productId: 30, price: 128, weight: 210 },

			// Ланчбокс із курячими шматочками
			{ productId: 31, price: 135, weight: 200 },

			// Салат Цезар
			{ productId: 32, price: 101, weight: 170 },

			// Молочний коктейль Ожина-малина
			{ productId: 33, price: 73, weight: 300 },

			// Молочний коктейль Піна Колада
			{ productId: 34, price: 73, weight: 300 },

			// Молочний коктейль із печивом Oreo
			{ productId: 35, price: 80, weight: 300 },

			// Класичний молочний коктейль
			{ productId: 36, price: 68, weight: 300 },

			// Полуничний молочний коктейль
			{ productId: 37, price: 80, weight: 300 },

			// Шоколадний молочний коктейль
			{ productId: 38, price: 76, weight: 300 },

			// Какао
			{ productId: 39, price: 46, weight: 240 },

			// Rich Tea Чорний з лимоном
			{ productId: 40, price: 49, weight: 500 },

			// Rich Tea Зелений
			{ productId: 41, price: 49, weight: 500 },

			// Rich Tea Зелений з манго
			{ productId: 42, price: 49, weight: 500 },

			// Rich сік Апельсиновий
			{ productId: 43, price: 86, weight: 1000 },

			// Rich сік Яблучний
			{ productId: 44, price: 86, weight: 1000 },

			// Rich нектар Вишневий
			{ productId: 45, price: 86, weight: 1000 },

			// Кава Карамельна капучино
			{ productId: 46, price: 56, weight: 230 },

			// Кава Кокосовий латте
			{ productId: 47, price: 56, weight: 300 },

			// Кава Горіховий латте
			{ productId: 48, price: 56, weight: 300 },

			// Айс капучіно
			{ productId: 49, price: 80, weight: 280 },

			// Кава Американо
			{ productId: 50, price: 36, weight: 280 },

			// Кава Капучіно
			{ productId: 51, price: 56, weight: 250 },

			// Кава Латте
			{ productId: 52, price: 58, weight: 330 },

			// Чікен бокс
			{ productId: 53, price: 86 },

			// Комбо Сніданок на двох
			{ productId: 54, price: 183 },

			// 3 піци 25 см
			{ productId: 55, price: 283 },

			// 2 піци
			{ productId: 56, price: 386 },

			// 3 піци
			{ productId: 57, price: 433 },

			// 4 Закуски
			{ productId: 58, price: 229 },

			// 2 фірмові закуски
			{ productId: 59, price: 109 },

			// 2 десерти
			{ productId: 60, price: 65 },

			// 2 кави: Латте або Капучіно
			{ productId: 61, price: 106 },

			// 2 соуси
			{ productId: 62, price: 25 },

			// Чізкейк Нью-Йорк з кокосом
			{ productId: 63, price: 56, weight: 100 },

			// Бони
			{ productId: 64, price: 38, weight: 120 },

			// Листкові палички з ананасами та брусницею
			{ productId: 65, price: 99, weight: 260 },

			// Макарон манго-маракуйя
			{ productId: 66, price: 43, weight: 24 },

			// Чізкейк Нью-Йорк
			{ productId: 67, price: 63, weight: 100 },

			// Чізкейк Банановий із шоколадним печивом
			{ productId: 68, price: 56, weight: 100 },

			// Еклери-міні із заварним кремом
			{ productId: 69, price: 56, weight: 45 },

			// Шоколадний кукіс
			{ productId: 70, price: 31, weight: 70 },

			// Фондан
			{ productId: 71, price: 129, weight: 160 },

			// Мафін Солена карамель
			{ productId: 72, price: 33, weight: 120 },

			// Маффін Три шоколади
			{ productId: 73, price: 33, weight: 120 },

			// Бруслетики
			{ productId: 74, price: 93, weight: 260 },

			// Сирники зі згущеним молоком
			{ productId: 75, price: 55, weight: 150 },

			// Сирники з малиновим варенням 👶
			{ productId: 76, price: 53, weight: 140 },

			// Сирники
			{ productId: 77, price: 48, weight: 130 },

			// Курячі шматочки 👶
			{ productId: 78, price: 89, weight: 120 },

			// Курячі нагетси
			{ productId: 79, price: 49, weight: 110 },

			// Картопля з печі 🌱👶
			{ productId: 80, price: 46, weight: 80 },

			// Сирники з малиновим варенням 👶
			{ productId: 81, price: 53, weight: 150 },

			// Сирники зі згущеним молоком
			{ productId: 82, price: 55, weight: 140 },

			// Медово-гірчичний
			{ productId: 83, price: 15, weight: 25 },

			// Солодкий чилі
			{ productId: 84, price: 15, weight: 25 },

			// Сирний
			{ productId: 85, price: 15, weight: 25 },

			// Часниковий
			{ productId: 86, price: 15, weight: 25 },

			// Барбекю
			{ productId: 87, price: 15, weight: 25 },

			// Малинове варення
			{ productId: 88, price: 15, weight: 25 },
		],
	})

	await prisma.story.createMany({
		data: stories,
	})

	await prisma.storyItem.createMany({
		data: storyItems,
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "user" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "verification_code" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "category" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "product_item" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "ingredient" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "cart_item" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "order" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "state" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "district" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "community" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "city" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "village" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "story" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "story_item" RESTART IDENTITY CASCADE;`
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
