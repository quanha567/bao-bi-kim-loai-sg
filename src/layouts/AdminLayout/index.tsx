'use client'

import { Archive, Box, FileText, Headset, Home, Settings } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { UserInfoButton } from '../components'
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

const items = [
    {
        icon: Home,
        title: 'Cấu hình trang chủ',
        url: ADMIN_PATH.DASHBOARD,
    },
    {
        icon: Box,
        title: 'Quản lý danh mục',
        url: ADMIN_PATH.CATEGORY,
    },
    {
        icon: Archive,
        title: 'Quản lý sản phẩm',
        url: ADMIN_PATH.PRODUCT,
    },
    {
        icon: FileText,
        title: 'Quản lý bài viết',
        url: ADMIN_PATH.ARTICLE,
    },
    {
        icon: Headset,
        title: 'Danh sách liên hệ',
        url: ADMIN_PATH.CONTACT,
    },
    // {
    //     icon: PanelTop,
    //     title: 'Quản lý trang',
    //     url: ADMIN_PATH.PAGE,
    // },
    {
        icon: Settings,
        title: 'Cài đặt',
        url: ADMIN_PATH.SETTING,
    },
]

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
    const pathName = usePathname()

    const matchingRoute = items.find((item) => item.url === pathName)

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex h-screen w-full flex-col">
                {matchingRoute && (
                    <div className="flex items-center justify-between gap-2 bg-background px-4 py-3">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <Typography className="font-bold">{matchingRoute.title}</Typography>
                        </div>
                        <UserInfoButton />
                    </div>
                )}
                <QueryProvider>
                    <div className="flex-1 overflow-auto bg-zinc-200 p-4">{children}</div>
                </QueryProvider>
            </main>
        </SidebarProvider>
    )
}

export function AppSidebar() {
    const pathName = usePathname()

    return (
        <Sidebar className="bg-white">
            <SidebarHeader className="border-b">
                <Link href="/" target="_blank">
                    <Image src={Logo} alt="logo" className="w-3/5 object-contain" />
                </Link>
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
