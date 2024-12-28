import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    /* config options here */
    typescript: { ignoreBuildErrors: true },
}

export default nextConfig
