import { Archive, Box, FileText, Headset, Home, Settings } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

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
import Logo from '@/public/logo.jpg'

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <div className="bg-background px-4 py-2">
                    <SidebarTrigger />
                </div>
                {children}
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
    return (
        <Sidebar>
            <SidebarHeader>
                <Image src={Logo} alt="logo" className="w-3/5 object-contain" />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild size="lg">
                                        <Link href={item.url}>
                                            <item.icon size={20} />
                                            <Typography as="span" variant="link">
                                                {item.title}
                                            </Typography>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
