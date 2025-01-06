'use client'

import { Archive, Box, FileText, Headset, Home, Settings } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    Typography,
} from '@/components'

import { ADMIN_PATH } from '@/constants'
import { QueryProvider } from '@/providers'
import Logo from '@/public/logo.jpg'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex h-screen w-full flex-col">
                <div className="bg-background px-4 py-2">
                    <SidebarTrigger />
                </div>
                <QueryProvider>
                    <div className="flex-1 overflow-auto bg-zinc-200 p-4">{children}</div>
                </QueryProvider>
            </main>
        </SidebarProvider>
    )
}

const items = [
    {
        icon: Home,
        title: 'Trang chủ',
        url: ADMIN_PATH.DASHBOARD,
    },
    {
        icon: Box,
        title: 'Danh mục',
        url: ADMIN_PATH.CATEGORY,
    },
    {
        icon: Archive,
        title: 'Sản phẩm',
        url: ADMIN_PATH.PRODUCT,
    },
    {
        icon: FileText,
        title: 'Bài viết',
        url: ADMIN_PATH.ARTICLE,
    },
    {
        icon: Headset,
        title: 'Liên hệ',
        url: ADMIN_PATH.CONTACT,
    },
    {
        icon: Settings,
        title: 'Cài đặt',
        url: ADMIN_PATH.SETTING,
    },
]
export function AppSidebar() {
    const pathName = usePathname()

    return (
        <Sidebar className="bg-white">
            <SidebarHeader className="border-b">
                <Image src={Logo} alt="logo" className="w-3/5 object-contain" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = pathName === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            size="lg"
                                            isActive={isActive}
                                            className={isActive ? '!bg-primary !text-white' : ''}
                                        >
                                            <Link href={item.url}>
                                                <item.icon size={20} />
                                                <Typography as="span" variant="link">
                                                    {item.title}
                                                </Typography>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
