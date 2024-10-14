import sharp from 'sharp'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const imageUrl = searchParams.get('url')
	const widthParam = searchParams.get('width')
	const heightParam = searchParams.get('height')

	// Check presence of the width and height parameters and parse them
	const width = widthParam ? parseInt(widthParam, 10) : undefined
	const height = heightParam ? parseInt(heightParam, 10) : undefined

	if (!imageUrl) {
		return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
	}

	// Construct an absolute URL
	const absoluteImageUrl = new URL(imageUrl, `${process.env.NEXT_PUBLIC_DOMAIN_URL}/`).toString()

	try {
		const response = await fetch(absoluteImageUrl)

		if (!response.ok) {
			throw new Error(`Failed to fetch image: ${response.statusText}`)
		}

		const arrayBuffer = await response.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		const sharpInstance = sharp(buffer)

		// Conditional resizing
		if (width && height) {
			sharpInstance.resize(width, height)
		} else if (width) {
			sharpInstance.resize(width)
		} else if (height) {
			sharpInstance.resize(undefined, height)
		}

		const resizedImageBuffer = await sharpInstance.toBuffer()

		return new NextResponse(resizedImageBuffer, {
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
