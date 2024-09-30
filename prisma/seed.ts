import { hashSync } from 'bcrypt'

import { prisma } from './../prisma/db'

import { categories, ingredients, products, storyItems, storys } from './constants'

const randomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User',
				email: 'user@gmail.com',
				password: hashSync('111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@gmail.com',
				password: hashSync('111111', 10),
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
			name: 'Пепероні фреш',
			imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5),
			},
		},
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Сирна',
			imageUrl: 'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10),
			},
		},
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Чорізо фреш',
			imageUrl: 'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 15),
			},
		},
	})

	await prisma.productItem.createMany({
		data: [
			// Пицца "Пепперони фреш"
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza1.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Пицца "Сырная"
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 30 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 40 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 20 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza2.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

			// Пицца "Чоризо фреш"
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 1, pizzaSize: 20 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 30 },
			{ productId: pizza3.id, price: randomNumber(100, 180), pizzaType: 2, pizzaSize: 40 },

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
			// quantity: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }],
			},
		},
	})

	await prisma.story.createMany({
		data: storys,
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
