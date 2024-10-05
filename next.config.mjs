/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'media.dodostatic.net',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.dodostatic.net',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.inappstory.ru',
				pathname: '/**',
			},
		],
	},
}

export default nextConfig
