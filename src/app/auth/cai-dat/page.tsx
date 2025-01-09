'use client'
import { SaveIcon } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    FormInput,
    FormTextarea,
} from '@/components'

import { useCreateOrUpdateSetting, useGetSetting, useToast } from '@/hooks'
import { SettingModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    fbLink: z.string().url().optional(),
    zaloLink: z.string().url().optional(),
    youtubeLink: z.string().url().optional(),
    address: z.string().optional(),
    id: z.string().optional(),
})
const formDefaultValues: z.infer<typeof formSchema> = {
    address: '',
    email: '',
    fbLink: '',
    phoneNumber: '',
    zaloLink: '',
    youtubeLink: '',
}

const SettingPage = () => {
    const { toast } = useToast()

    const formMethods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    })

    const { data: setting, isLoading: isLoadingSetting } = useGetSetting()

    const { mutate: createOrUpdateSetting, isLoading: isLoadingCreateOrUpdateSetting } =
        useCreateOrUpdateSetting()

    useEffect(() => {
        formMethods.reset({ ...setting })
    }, [JSON.stringify(setting)])

    const handleSubmitForm = (data: SettingModel) => {
        createOrUpdateSetting(data, {
            onSuccess: () => {
                toast({
                    title: 'Cập nhật thông tin thành công!',
                    variant: 'success',
                })
            },
            onError: (error) => {
                console.log('handleSubmitForm  error:', error)
                toast({
                    title: error.message,
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <FormProvider {...formMethods}>
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin liên hệ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <FormInput name="phoneNumber" label="Số điện thoại" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="fbLink" label="Link facebook" />
                        <FormInput name="zaloLink" label="Link zalo" />
                        <FormInput name="youtubeLink" label="Link youtube" />
                        <FormTextarea name="address" label="Địa chỉ công ty" />
                        <Button
                            isLoading={isLoadingCreateOrUpdateSetting}
                            onClick={formMethods.handleSubmit(handleSubmitForm)}
                        >
                            <SaveIcon />
                            Lưu
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Cấu hình Menu</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <div>
                                <FormInput label="" name="header" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FormProvider>
    )
}

export default SettingPage
