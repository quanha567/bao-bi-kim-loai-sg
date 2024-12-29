import { Mail, MapPin, PhoneCall, Send } from 'lucide-react'

import Link from 'next/link'

import { Button, Input, Label, Textarea, Typography } from '@/components'

import { formatVietnamesePhoneNumber } from '@/lib'

const contactInfo = {
    address: '368/77O Tôn Đản, Phường 04, Quận 4, Thành phố Hồ Chí Minh, Việt Nam',
    mail: 'baobikimloaisaigon@gmail.com',
    phoneNumber: '0903207911',
}

const ContactPage = () => {
    return (
        <div className="container py-10">
            <Typography as="h1" variant="h1" className="mb-2 text-center">
                Liên hệ chúng tôi
            </Typography>
            <Typography className="text-center">
                Bạn đang thắc mắc gì? Chỉ cần để lại tin nhắn chúng tôi sẽ hỗ trợ bạn ngay
            </Typography>
            <div className="mt-4 grid grid-cols-[2fr_3fr] gap-4 rounded-xl bg-background p-2">
                <div className="bg-circle rounded-lg bg-primary p-8 text-background">
                    <Typography as="h3" variant="h3">
                        Thông tin liên hệ
                    </Typography>
                    <div className="mt-4 space-y-4">
                        <Link
                            href={`tel:${contactInfo.phoneNumber}`}
                            className="flex items-center gap-4 py-2"
                        >
                            <PhoneCall size={20} />
                            <Typography as="span" variant="link" className="flex-1">
                                {formatVietnamesePhoneNumber(contactInfo.phoneNumber)}
                            </Typography>
                        </Link>
                        <Link
                            href={`tel:${contactInfo.phoneNumber}`}
                            className="flex items-center gap-4 py-2"
                        >
                            <Mail size={20} />
                            <Typography as="span" variant="link" className="flex-1">
                                {contactInfo.mail}
                            </Typography>
                        </Link>
                        <Link className="flex gap-4 py-2" href={`tel:${contactInfo.phoneNumber}`}>
                            <MapPin size={20} />
                            <Typography as="span" variant="link" className="flex-1">
                                {contactInfo.address}
                            </Typography>
                        </Link>
                    </div>
                </div>
                <div className="space-y-4 p-10">
                    <div className="space-y-1">
                        <Label>Họ và tên</Label>
                        <Input placeholder="Nhập họ và tên của bạn" />
                    </div>
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Nhập email của bạn" />
                    </div>
                    <div className="space-y-1">
                        <Label>Số điện thoại của bạn</Label>
                        <Input type="tel" placeholder="Nhập họ và tên của bạn" />
                    </div>
                    <div className="space-y-1">
                        <Label>Nội dung yêu cầu</Label>
                        <Textarea placeholder="Nhập nội dung yêu cầu của bạn..." />
                    </div>
                    <div className="flex justify-end">
                        <Button>
                            Gửi yêu cầu
                            <Send />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
