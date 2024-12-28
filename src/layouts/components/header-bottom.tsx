import { Search } from 'lucide-react'
import * as React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components'
import { Button } from '@/components/ui/button'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'

import Logo from '@/public/logo.jpg'

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
        children: [
            {
                href: '/bao-bi-kim-loai',
                title: 'Bao bì kim loại',
            },
            {
                href: '/bao-bi-nhua',
                title: 'Bao bì nhựa',
            },
            {
                href: '/bao-bi-giay',
                title: 'Bao bì giấy',
            },
        ],
        href: '/san-pham',
        title: 'Sản phẩm',
    },
    {
        children: [
            {
                href: '/tin-tuc',
                title: 'Tin tức',
            },
            {
                href: '/su-kien',
                title: 'Sự kiện',
            },
        ],
        href: '/tin-tuc-su-kien',
        title: 'Tin tức & Sự kiện',
    },
    {
        href: '/lien-he',
        title: 'Liên hệ',
    },
]

export const HeaderBottom = () => {
    return (
        <div className="container flex items-center justify-between py-3">
            <Link href="/">
                <Image src={Logo} alt="logo" width={120} className="h-auto w-[120px]" />
            </Link>
            <div className="flex flex-col items-end xl:flex-row">
                <NavigationMenu className="flex-1">
                    <NavigationMenuList>
                        {menuItems.map((item) => {
                            if (!item.children?.length) {
                                return (
                                    <NavigationMenuItem asChild key={item.title}>
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
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuTrigger>
                                        <Link passHref href={item.href}>
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
                <Button size="icon" variant="ghost">
                    <Search />
                </Button>
            </div>
        </div>
    )
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ children, className, href, title, ...props }, ref) => {
        return (
            <li className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <Link passHref href={href || '#'}>
                    <Typography as="span" variant="bold-uppercase">
                        {title}
                    </Typography>
                </Link>
            </li>
        )
    },
)
ListItem.displayName = 'ListItem'
