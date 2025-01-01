import { Toaster } from '@/components'

import { SpeedInsights } from '@vercel/speed-insights/next'

export const UIProvider = ({ children }: React.PropsWithChildren) => {
    return (
        <>
            {children}
            <Toaster />
            <SpeedInsights />
        </>
    )
}
