import { ContactForm, ContactInfo } from './components'
import { Typography } from '@/components'

const ContactPage = () => {
    return (
        <div className="container py-10">
            <Typography as="h1" variant="h1" className="mb-2 text-center">
                Liên hệ chúng tôi
            </Typography>
            <Typography className="text-center">
                Bạn đang thắc mắc gì? Chỉ cần để lại tin nhắn chúng tôi sẽ hỗ trợ bạn ngay
            </Typography>
            <div className="mt-4 grid gap-4 rounded-xl bg-background p-2 drop-shadow lg:grid-cols-[2fr_3fr]">
                <ContactInfo />
                <ContactForm />
            </div>
        </div>
    )
}

export default ContactPage
