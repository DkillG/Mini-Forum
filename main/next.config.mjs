/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				pathname: '/**',
				protocol: 'https',
				hostname: 'i.pravatar.cc'
			}
		]
	}
};

export default nextConfig;