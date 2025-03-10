import { SessionProvider } from 'next-auth/react'

import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'

import './globals.css'

import { auth } from '@/auth'
import { LayoutWrapper } from '@/layouts'
import { UIProvider } from '@/providers'

const montserrat = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

export const metadata: Metadata = {
    description:
        'CÔNG TY TNHH SẢN XUẤT BAO BÌ KIM LOẠI SÀI GÒN, trụ sở chính tại 368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam, chuyên sản xuất Bao bì kim loại các loại, bao gồm: Thùng lon sơn, thùng lon đựng hóa chất lỏng và khô, hộp bút, văn phòng phẩm, Hộp bánh kẹo, hộp thuốc lá, hộp trà….',
    title: 'Bao bì kim loại Sài Gòn',
    keywords:
        'bao bì kim loại, bao bì kim loại sài gòn, bao bì kim loại tphcm, bao bì kim loại hcm, bao bì, kim loại',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()

    return (
        <html lang="vi">
            <body className={`${montserrat.variable} bg-[#F8F8F8] antialiased`}>
                <SessionProvider session={session}>
                    <UIProvider>
                        <LayoutWrapper>{children}</LayoutWrapper>
                    </UIProvider>
                </SessionProvider>
            </body>
        </html>
    )
}
