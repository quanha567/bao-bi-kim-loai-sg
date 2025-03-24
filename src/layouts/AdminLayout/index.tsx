'use client'

import { Archive, Box, FileText, Headset, Home, Settings, User2 } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

import Image from 'next/image'
import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'

import { UserInfoButton } from '../components'
import {
    Loader,
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
import { useToast } from '@/hooks'
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
        title: 'Quản lý liên hệ',
        url: ADMIN_PATH.CONTACT,
    },
    {
        icon: User2,
        title: 'Quản lý tài khoản',
        url: ADMIN_PATH.ACCOUNT,
    },
    {
        icon: Settings,
        title: 'Cài đặt',
        url: ADMIN_PATH.SETTING,
    },
]

const emailAccounts = ['quanhavo005@gmail.com']

export const AdminLayout = ({ children }: React.PropsWithChildren) => {
    const pathName = usePathname()

    const { status, data } = useSession()

    const { toast } = useToast()

    const matchingRoute = items.find((item) => item.url === pathName)

    const handleLogout = async () => {
        try {
            await signOut({
                redirectTo: ADMIN_PATH.LOGIN,
            })
            toast({
                title: 'Đăng xuất thành công',
                variant: 'success',
            })
        } catch (err) {
            console.log('handleLogout  err:', err)
            toast({
                title: 'Có lỗi xảy ra, vui lòng thử lại',
                variant: 'destructive',
            })
        }
    }

    if (status === 'loading') {
        return <Loader className="fixed inset-0" />
    }

    if (status === 'unauthenticated') {
        return redirect(ADMIN_PATH.LOGIN)
    }

    if (data?.user?.email && !emailAccounts.includes(data.user.email)) {
        return <p> Not have permission</p>
    }

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
                        <UserInfoButton onLogout={handleLogout} />
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
