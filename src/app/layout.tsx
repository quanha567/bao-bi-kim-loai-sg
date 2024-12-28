import type { Metadata } from 'next'

import { Montserrat } from 'next/font/google'

import './globals.css'

import { DefaultLayout } from '@/layouts'

const geistSans = Montserrat({
    subsets: ['latin'],
    variable: '--font-montserrat',
})

export const metadata: Metadata = {
    description:
        'CÔNG TY TNHH SẢN XUẤT BAO BÌ KIM LOẠI SÀI GÒN, trụ sở chính tại 368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam, chuyên sản xuất Bao bì kim loại các loại, bao gồm: Thùng lon sơn, thùng lon đựng hóa chất lỏng và khô, hộp bút, văn phòng phẩm, Hộp bánh kẹo, hộp thuốc lá, hộp trà….',
    title: 'Bao bì kim loại Sài Gòn',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="vi">
            <body className={`${geistSans.variable} bg-[#F8F8F8] antialiased`}>
                <DefaultLayout>{children}</DefaultLayout>
            </body>
        </html>
    )
}
