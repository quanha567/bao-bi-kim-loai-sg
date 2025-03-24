'use client'
import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'

import { z } from 'zod'

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    FormInput,
    FormSubmit,
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
    address: z
        .array(
            z.object({
                address: z.string(),
            }),
        )
        .optional(),
    id: z.string().optional(),
})
const formDefaultValues: z.infer<typeof formSchema> = {
    address: [{ address: '' }],
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

    const { control } = formMethods

    const {
        fields: addresses,
        append: appendAddress,
        remove: removeAddress,
    } = useFieldArray({
        control,
        name: 'address',
    })

    const { data: setting, isLoading: isLoadingSetting } = useGetSetting()

    const { mutate: createOrUpdateSetting, isPending: isLoadingCreateOrUpdateSetting } =
        useCreateOrUpdateSetting()

    useEffect(() => {
        formMethods.reset({
            ...setting?.setting,
            address: setting?.setting?.address?.map((item) => ({ address: item })) || [],
        })
    }, [JSON.stringify(setting)])

    const appendNewAddress = () => appendAddress({ address: '' })

    const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
        const dataSubmit = {
            ...data,
            address: data?.address
                ?.filter((item) => item?.address)
                .map((address) => String(address.address).trim()),
        }
        createOrUpdateSetting(dataSubmit as SettingModel, {
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
                <Card isLoading={isLoadingSetting}>
                    <CardHeader>
                        <CardTitle>Thông tin liên hệ</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        <FormInput name="phoneNumber" label="Số điện thoại" />
                        <FormInput name="email" label="Email" />
                        <FormInput name="fbLink" label="Link facebook" />
                        <FormInput name="zaloLink" label="Link zalo" />
                        <FormInput name="youtubeLink" label="Link youtube" />
                        <div className="col-span-2">
                            {addresses.map((address, index) => (
                                <div key={address.id} className="flex items-center gap-2">
                                    <div className="flex-1">
                                        <FormTextarea
                                            name={`address.${index}.address`}
                                            label={`Địa chỉ công ty ${index + 1}`}
                                        />
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => removeAddress(index)}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                            ))}
                            <Button size="sm" variant="outline" onClick={appendNewAddress}>
                                Thêm địa chỉ công ty
                            </Button>
                        </div>
                        <FormSubmit
                            isLoading={isLoadingCreateOrUpdateSetting}
                            onSubmit={formMethods.handleSubmit(handleSubmitForm)}
                        />
                    </CardContent>
                </Card>
            </div>
        </FormProvider>
    )
}

export default SettingPage
