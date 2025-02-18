'use client'

import { Mail, MapPin, PhoneCall } from 'lucide-react'

import Link from 'next/link'

import { Typography } from '@/components'

import { useAppContext } from '@/contexts'
import { formatVietnamesePhoneNumber, getLink, openLink } from '@/lib'

interface ContactInfoItemProps {
    href: string
    icon: React.ComponentType<{ size: number }>
    label: string
    onClick?: () => void
}

const ContactInfoItem = ({ href, icon: Icon, label, onClick }: ContactInfoItemProps) => (
    <Link href={href} onClick={onClick} className="flex items-center gap-4 py-2">
        <Icon size={20} />
        <Typography as="span" variant="link" className="flex-1">
            {label}
        </Typography>
    </Link>
)

export const ContactInfo = () => {
    const { address, phoneNumber, email } = useAppContext()

    const openMap = () => openLink('maps', address)

    return (
        <div className="bg-circle rounded-lg bg-primary p-8 text-background">
            <Typography as="h3" variant="h3">
                Thông tin liên hệ
            </Typography>
            <div className="mt-4 space-y-4">
                {phoneNumber && (
                    <ContactInfoItem
                        icon={PhoneCall}
                        href={getLink('phone', phoneNumber)}
                        label={formatVietnamesePhoneNumber(phoneNumber)}
                    />
                )}
                {email && (
                    <ContactInfoItem icon={Mail} label={email} href={getLink('mail', email)} />
                )}
                {address && (
                    <ContactInfoItem href="#" icon={MapPin} label={address} onClick={openMap} />
                )}
            </div>
        </div>
    )
}
