'use client'
import { BadgePlus, CircleChevronRight, Logs, SaveIcon, Trash2 } from 'lucide-react'
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
    FormSelect,
    FormTextarea,
    Typography,
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
                    <CardContent className="space-y-3">
                        {Array.from({ length: 5 }, (_, i) => (
                            <MenuGroup key={i} index={i + 1} />
                        ))}
                        <div className="flex items-center gap-2">
                            <Button>
                                <BadgePlus />
                                Thêm menu
                            </Button>
                            <Button>
                                <SaveIcon />
                                Lưu
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </FormProvider>
    )
}

interface MenuItemProps {
    index: number
    subIndex?: number
}

export const MenuItem = ({ index, subIndex }: MenuItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <CircleChevronRight className="mt-6" />
            {typeof subIndex === 'number' && <CircleChevronRight className="mt-6" />}
            <div className="flex-1">
                <FormInput name="header" label="Tên menu" />
            </div>{' '}
            <div className="flex-1">
                <FormSelect name="header" label="Trang liên kết" />
            </div>
            {typeof subIndex === 'number' && (
                <Button size="icon" className="mt-6" variant="destructive">
                    <Trash2 />
                </Button>
            )}
        </div>
    )
}

interface MenuGroupProps {
    index: number
}

export const MenuGroup = ({ index }: MenuGroupProps) => {
    const children = ['', '', '']
    return (
        <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 px-3 py-2">
                <Logs size={16} />
                <Typography variant="link">Menu {index}</Typography>
            </div>
            <MenuItem index={index} />
            {children.map((_, i) => (
                <MenuItem key={i} subIndex={i} index={index} />
            ))}
            <div className="flex items-center gap-2">
                <Button variant="destructive">
                    <Trash2 />
                    Xóa
                </Button>
                <Button variant="outline">
                    <BadgePlus />
                    Thêm menu con
                </Button>
            </div>
        </div>
    )
}

export default SettingPage
