import { Mail, MapPin, PhoneCall } from 'lucide-react'

import Link from 'next/link'

import { Typography } from '@/components'

import { formatVietnamesePhoneNumber, getLink } from '@/lib'

import { DefaultHeaderProps } from './default-header'

type HeaderContactProps = DefaultHeaderProps

export const HeaderContact = ({
    address = '',
    email = '',
    phoneNumber = '',
}: HeaderContactProps) => {
    return (
        <div className="hidden bg-primary py-2 lg:block">
            <div className="container flex items-center justify-between text-white">
                <Link
                    href={getLink('maps', address)}
                    className="flex flex-1 items-center gap-1 hover:underline"
                >
                    <MapPin size={16} />
                    <Typography
                        as="span"
                        className="line-clamp-1 flex-1 text-xs font-medium uppercase"
                    >
                        {address}
                    </Typography>
                </Link>
                <div className="divide-x-white flex items-center divide-x-[1px]">
                    <Link
                        href={getLink('phone', phoneNumber)}
                        className="flex items-center gap-1 pr-2 hover:underline"
                    >
                        <PhoneCall size={16} />
                        <Typography as="span" className="text-xs font-medium">
                            {formatVietnamesePhoneNumber(phoneNumber)}
                        </Typography>
                    </Link>
                    <Link
                        href={getLink('mail', email)}
                        className="flex items-center gap-1 pl-2 hover:underline"
                    >
                        <Mail size={16} />
                        <Typography as="span" className="text-xs font-medium">
                            {email}
                        </Typography>
                    </Link>
                </div>
            </div>
        </div>
    )
}
