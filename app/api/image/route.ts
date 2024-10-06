import sharp from 'sharp'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url)
	const imageUrl = searchParams.get('url')
	const widthParam = searchParams.get('width')
	const heightParam = searchParams.get('height')

	// Проверяем наличие параметров ширины и высоты и парсим их
	const width = widthParam ? parseInt(widthParam, 10) : undefined
	const height = heightParam ? parseInt(heightParam, 10) : undefined

	if (!imageUrl) {
		return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
	}

	// Добавляем .png, если в imageUrl его нет
	const imageUrlWithExtension = imageUrl.endsWith('.png') ? imageUrl : `${imageUrl}.png`

	try {
		const response = await fetch(imageUrlWithExtension)
		const blob = await response.blob()
		const buffer = Buffer.from(await blob.arrayBuffer())

		const sharpInstance = sharp(buffer)

		// Условное изменение размера
		if (width && height) {
			sharpInstance.resize(width, height)
		} else if (width) {
			sharpInstance.resize(width)
		} else if (height) {
			sharpInstance.resize(undefined, height)
		}

		const resizedImageBuffer = await sharpInstance.toBuffer()

		return new Response(resizedImageBuffer, {
			headers: {
				'Content-Type': 'image/png',
				'Cache-Control': 'no-store',
			},
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Error processing image' }, { status: 500 })
	}
}
