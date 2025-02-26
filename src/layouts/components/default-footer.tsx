'use client'
import { Mail, MapPin, PhoneCall } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'

import { Typography } from '@/components'

import { formatVietnamesePhoneNumber, getLink } from '@/lib'
import { SettingResponseModel } from '@/models'
import FbIcon from '@/public/fb-icon.png'
import Logo from '@/public/logo.jpg'
import YtbIcon from '@/public/ytb-icon.png'
import ZaLoIcon from '@/public/zalo-icon.png'

type DefaultFooterProps = SettingResponseModel

export const DefaultFooter = ({
    setting: { address, email, phoneNumber },
    categories = [],
}: DefaultFooterProps) => {
    const contactMenu = [
        address && {
            href: getLink('maps', address),
            Icon: MapPin,
            text: address,
        },
        phoneNumber && {
            href: getLink('phone', phoneNumber),
            Icon: PhoneCall,
            text: formatVietnamesePhoneNumber(phoneNumber),
        },
        email && {
            href: getLink('mail', email),
            Icon: Mail,
            text: email,
        },
    ].filter((item) => typeof item === 'object')

    const productCategories = categories?.map((category) => category.name) || []

    const socials = [
        {
            icon: FbIcon,
        },
        {
            icon: ZaLoIcon,
        },
        {
            icon: YtbIcon,
        },
    ]

    return (
        <footer className="bg-background">
            <div className="border-t">
                <div className="container grid gap-4 py-8 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                        <Image
                            src={Logo}
                            alt="logo"
                            width={120}
                            className="h-auto w-[120px] object-contain"
                        />
                        <Typography variant="p" className="mt-4 font-bold">
                            CÔNG TY TNHH SẢN XUẤT BAO BÌ KIM LOẠI SÀI GÒN
                        </Typography>
                        <div className="mt-4 grid auto-cols-[40px] grid-flow-col gap-4">
                            {socials.map((social, index) => (
                                <Link href="#" key={index}>
                                    <Image
                                        alt="icon"
                                        src={social.icon}
                                        className="aspect-square h-full w-full object-cover"
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <Typography variant="bold-uppercase">SẢN PHẨM</Typography>
                        <ul className="mt-4 space-y-2">
                            {productCategories.map((category) => (
                                <li key={category}>
                                    <Link passHref href={`/san-pham?category=${category}`}>
                                        <Typography
                                            as="span"
                                            variant="regular-sm"
                                            className="transition-all hover:underline"
                                        >
                                            {category}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <Typography variant="bold-uppercase">Liên hệ</Typography>
                        <ul className="mt-4 space-y-2">
                            {contactMenu.map(({ href, Icon, text }) => (
                                <li key={text}>
                                    <Link
                                        passHref
                                        href={href}
                                        target="_blank"
                                        className="flex items-center gap-1"
                                    >
                                        <Icon size={16} />
                                        <Typography
                                            as="span"
                                            variant="regular-sm"
                                            className="flex-1 transition-all hover:underline"
                                        >
                                            {text}
                                        </Typography>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                        <iframe
                            title="map"
                            className="h-full w-full"
                            src={`https://maps.google.com/maps?q=${10.754487},${106.705593}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                        />
                    </div>
                </div>
            </div>
            <FooterCopyRight />
        </footer>
    )
}

const FooterCopyRight = () => {
    return (
        <div className="container border-t py-3">
            <Typography variant="caption" className="text-center font-medium">
                Copyright © {new Date().getFullYear()} | CÔNG TY TNHH SẢN XUẤT BAO BÌ KIM LOẠI SÀI
                GÒN
            </Typography>
        </div>
    )
}
