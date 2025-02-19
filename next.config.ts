import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    /* config options here */
    typescript: { ignoreBuildErrors: true },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ik.imagekit.io',
            },
        ],
    },
}

export default nextConfig
