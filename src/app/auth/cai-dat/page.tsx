'use client'
import { BadgePlus, CircleChevronRight, Logs, SaveIcon, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useFieldArray, useForm, useFormContext } from 'react-hook-form'

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
    SelectOption,
    Typography,
} from '@/components'

import { useCreateOrUpdateSetting, useGetPageOptions, useGetSetting, useToast } from '@/hooks'
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
    menus: z
        .array(
            z.object({
                id: z.string().optional(),
                pageId: z.string().nonempty('Vui lòng chọn trang liên kết!'),
                settingId: z.string().optional(),
                children: z.array(z.object({})).optional(),
            }),
        )
        .optional(),
})
const formDefaultValues: z.infer<typeof formSchema> = {
    address: '',
    email: '',
    fbLink: '',
    phoneNumber: '',
    zaloLink: '',
    youtubeLink: '',
    menus: [],
}

const SettingPage = () => {
    const { toast } = useToast()

    const formMethods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    })

    const { pageOptions } = useGetPageOptions()

    const {
        fields: menuFields,
        append: appendMenu,
        remove: removeMenu,
    } = useFieldArray({
        control: formMethods.control,
        name: 'menus',
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

    const handleAddNewMenu = () => {
        appendMenu({
            pageId: '',
            settingId: setting?.id,
            children: [],
        })
    }

    const handleRemoveMenu = (index: number) => {
        removeMenu(index)
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
                        {menuFields?.map((field, i) => (
                            <MenuGroup
                                index={i}
                                key={field?.id}
                                options={pageOptions}
                                onDelete={handleRemoveMenu}
                            />
                        ))}
                        <div className="flex items-center gap-2">
                            <Button onClick={handleAddNewMenu}>
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
    onDelete?: (index: number) => void
    options?: SelectOption[]
    subIndex?: number
}

export const MenuItem = ({ index, subIndex, onDelete, options }: MenuItemProps) => {
    return (
        <div className="flex items-center gap-2">
            <CircleChevronRight className="mt-6" />
            {typeof subIndex === 'number' && <CircleChevronRight className="mt-6" />}
            <div className="flex-1">
                {typeof subIndex === 'number' ? (
                    <FormSelect
                        options={options}
                        label="Trang liên kết"
                        placeholder="-- Chọn trang liên kết --"
                        name={`menus.${index}.menuSettings.${subIndex}.pageId`}
                    />
                ) : (
                    <FormSelect
                        options={options}
                        label="Trang liên kết"
                        name={`menus.${index}.pageId`}
                        placeholder="-- Chọn trang liên kết --"
                    />
                )}
            </div>
            {typeof subIndex === 'number' && (
                <Button
                    size="icon"
                    className="mt-6"
                    variant="destructive"
                    onClick={() => onDelete?.(subIndex)}
                >
                    <Trash2 />
                </Button>
            )}
        </div>
    )
}

interface MenuGroupProps {
    index: number
    onDelete?: (index: number) => void
    options?: SelectOption[]
}

export const MenuGroup = ({ index, onDelete, options }: MenuGroupProps) => {
    const { control } = useFormContext()

    const {
        fields: childrenMenus,
        append: appendChildrenMenu,
        remove: removeChildrenMenu,
    } = useFieldArray({
        control,
        name: `menus.${index}.menuSettings`,
    })

    const handleAddNewChildrenMenu = () => {
        appendChildrenMenu({
            pageId: '',
        })
    }

    const handleDeleteChildrenMenu = (index: number) => {
        removeChildrenMenu(index)
    }

    return (
        <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 px-3 py-2">
                <Logs size={16} />
                <Typography variant="link" className="text-base font-bold">
                    Menu {index + 1}
                </Typography>
            </div>
            <MenuItem index={index} options={options} />
            {childrenMenus?.map((field, i) => (
                <MenuItem
                    subIndex={i}
                    index={index}
                    key={field?.id}
                    options={options}
                    onDelete={handleDeleteChildrenMenu}
                />
            ))}
            <div className="flex items-center gap-2">
                <Button size="sm" variant="destructive" onClick={() => onDelete?.(index)}>
                    <Trash2 />
                    Xóa
                </Button>
                <Button size="sm" variant="outline" onClick={handleAddNewChildrenMenu}>
                    <BadgePlus />
                    Thêm menu con
                </Button>
            </div>
        </div>
    )
}

export default SettingPage
