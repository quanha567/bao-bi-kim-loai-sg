'use client'

import { Send } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'

import { Button, FormInput, FormTextarea } from '@/components'

import { useCreateContact, useToast } from '@/hooks'
import { ContactModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<ContactModel> = {
    name: '',
    email: '',
    phone: '',
    message: '',
}

const formSchema = z.object({
    name: z.string().nonempty('Vui lòng nhập họ và tên của bạn'),
    email: z.string().optional(),
    phone: z.string().nonempty('Vui lòng nhập số điện thoại của bạn'),
    message: z.string().nonempty('Vui lòng nhập nội dung yêu cầu của bạn'),
})

export const ContactForm = () => {
    const { toast } = useToast()

    const formMethods = useForm<ContactModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { mutate: createContact, isPending: isCreatingContact } = useCreateContact()

    const handleCreateContact = async (data: ContactModel) => {
        await createContact(data, {
            onSuccess: () => {
                formMethods.reset()
                toast({
                    title: 'Gửi yêu cầu thành công!',
                    description: 'Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất',
                    variant: 'success',
                })
            },
            onError: (error) => {
                toast({
                    title: 'Gửi yêu cầu thất bại!',
                    description: error.message,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <FormProvider {...formMethods}>
            <div className="space-y-4 p-2 lg:p-10">
                <FormInput name="name" label="Họ và tên" placeholder="Nhập họ và tên của bạn" />
                <FormInput
                    name="phone"
                    label="Số điện thoại"
                    placeholder="Nhập số điện thoại của bạn"
                />
                <FormInput name="email" label="Email" placeholder="Nhập email của bạn" />
                <FormTextarea
                    name="message"
                    label="Nội dung yêu cầu"
                    placeholder="Nhập nội dung yêu cầu của bạn"
                />
                <div className="flex justify-end">
                    <Button
                        isLoading={isCreatingContact}
                        onClick={formMethods.handleSubmit(handleCreateContact)}
                    >
                        Gửi yêu cầu
                        <Send />
                    </Button>
                </div>
            </div>
        </FormProvider>
    )
}
