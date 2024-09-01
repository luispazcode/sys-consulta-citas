/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/dashboard",
				destination: "/dashboard/appointments",
				permanent: true,
			},
		];
	},
};

export default nextConfig;
