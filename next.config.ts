import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                destination: 'https://baobikimloaisg.vercel.app/api/:path*',
                source: '/api/:path*',
            },
        ]
    },
    /* config options here */
    typescript: { ignoreBuildErrors: true },
}

export default nextConfig
