'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components'

import { SpeedInsights } from '@vercel/speed-insights/next'

const queryClient = new QueryClient()

export const UIProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <SpeedInsights />
        </QueryClientProvider>
    )
}
