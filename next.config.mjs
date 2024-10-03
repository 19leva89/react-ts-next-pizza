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
		],
	},
}

export default nextConfig
