'use client'
import { useQuery } from '@tanstack/react-query'
import { AlignJustify } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Typography,
} from '@/components'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import { articleApi, categoryApi } from '@/apiClient'
import { QUERY_KEY } from '@/constants'
import { SettingRequestModel } from '@/models'
import Logo from '@/public/logo.jpg'

type HeaderBottomProps = SettingRequestModel

export const HeaderBottom = ({ menus }: HeaderBottomProps) => {
    const { data: categories } = useQuery({
        queryKey: [QUERY_KEY.CATEGORIES],
        queryFn: () => categoryApi.getAll(),
    })

    const { data: articles } = useQuery({
        queryKey: [QUERY_KEY.ARTICLES],
        queryFn: () =>
            articleApi.search({
                pageIndex: 0,
                pageSize: 10,
            }),
    })

    const menuItems = [
        {
            href: '/',
            title: 'Trang chủ',
        },
        {
            href: '/gioi-thieu',
            title: 'Giới thiệu',
        },
        {
            children: categories?.map((category) => ({
                href: `/san-pham?category=${category.slug}`,
                title: category.name,
            })),
            href: '/san-pham',
            title: 'Sản phẩm',
        },
        {
            children: articles?.data.map((article) => ({
                href: `/${article.slug}`,
                title: article.title,
            })),
            href: '/tin-tuc',
            title: 'Tin tức & Sự kiện',
        },
        {
            href: '/lien-he',
            title: 'Liên hệ',
        },
    ]

    return (
        <div className="container flex items-center justify-between py-3">
            <Link href="/">
                <Image
                    src={Logo}
                    alt="logo"
                    width={120}
                    className="h-auto w-20 object-contain lg:w-[120px]"
                />
            </Link>
            <div className="hidden flex-col items-end lg:flex xl:flex-row">
                {Array.isArray(menuItems) && menuItems.length > 0 ? (
                    <NavigationMenu className="flex-1">
                        <NavigationMenuList>
                            {menuItems.map((item, index) => {
                                if (!item?.children?.length) {
                                    return (
                                        // <NavigationMenuItem asChild key={index}>
                                        //     <Link
                                        //         passHref
                                        //         href={item.href || '#'}
                                        //         className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                        //     >
                                        //         <Typography as="span" variant="bold-uppercase">
                                        //             {item.title}
                                        //         </Typography>
                                        //     </Link>
                                        // </NavigationMenuItem>
                                        <ListItem key={index} href={item.href} title={item.title} />
                                    )
                                }

                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuTrigger>
                                            <Link passHref href={item.href || '#'}>
                                                <Typography as="span" variant="bold-uppercase">
                                                    {item.title}
                                                </Typography>
                                            </Link>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {item.children.map((component) => (
                                                    <ListItem
                                                        key={component.title}
                                                        href={component.href}
                                                        title={component.title}
                                                    />
                                                ))}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                )
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                ) : (
                    <></>
                )}
                {/* <Button size="icon" variant="ghost">
                    <Search />
                </Button> */}
            </div>
            <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline">
                        <AlignJustify size={24} />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            <Link href="/">
                                <Image
                                    src={Logo}
                                    alt="logo"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                        </SheetTitle>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <NavigationMenu className="flex-1">
                            <NavigationMenuList className="flex flex-col">
                                {menuItems.map((item) => {
                                    if (!item.children?.length) {
                                        return (
                                            <NavigationMenuItem
                                                asChild
                                                key={item.title}
                                                className="w-full"
                                            >
                                                <Link
                                                    passHref
                                                    href={item.href}
                                                    className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                >
                                                    <Typography as="span" variant="bold-uppercase">
                                                        {item.title}
                                                    </Typography>
                                                </Link>
                                            </NavigationMenuItem>
                                        )
                                    }

                                    return (
                                        <NavigationMenuItem key={item.title} className="w-full">
                                            <NavigationMenuTrigger>
                                                <Link passHref href={item.href}>
                                                    <Typography as="span" variant="bold-uppercase">
                                                        {item.title}
                                                    </Typography>
                                                </Link>
                                            </NavigationMenuTrigger>
                                        </NavigationMenuItem>
                                    )
                                })}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

type ListItemProps = {
    href: string
    title: string
}

const ListItem = ({ href, title }: ListItemProps) => {
    return (
        <li className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
            <Link passHref href={href || '#'}>
                <Typography as="span" variant="bold-uppercase">
                    {title}
                </Typography>
            </Link>
        </li>
    )
}
