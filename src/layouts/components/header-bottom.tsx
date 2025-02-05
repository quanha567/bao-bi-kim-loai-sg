import { AlignJustify, Search } from 'lucide-react'

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

import { MenuSettingModel, SettingRequestModel } from '@/models'
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

type HeaderBottomProps = SettingRequestModel

export const HeaderBottom = ({ menus }: HeaderBottomProps) => {
    const convertedMenu = (menus ? JSON.parse(menus) : []) as MenuSettingModel[]
    console.log('HeaderBottom  convertedMenu:', convertedMenu)

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
                {Array.isArray(convertedMenu) && convertedMenu.length > 0 ? (
                    <NavigationMenu className="flex-1">
                        <NavigationMenuList>
                            {convertedMenu.map((item, index) => {
                                if (!item?.children?.length) {
                                    return (
                                        <NavigationMenuItem asChild key={index}>
                                            <Link
                                                passHref
                                                href={item.slug || '#'}
                                                className="select-none rounded-md px-3 py-1.5 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                            >
                                                <Typography as="span" variant="bold-uppercase">
                                                    {item.label}
                                                </Typography>
                                            </Link>
                                        </NavigationMenuItem>
                                    )
                                }

                                return (
                                    <NavigationMenuItem key={index}>
                                        <NavigationMenuTrigger>
                                            <Link passHref href={item.slug || '#'}>
                                                <Typography as="span" variant="bold-uppercase">
                                                    {item.label}
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
                <Button size="icon" variant="ghost">
                    <Search />
                </Button>
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
