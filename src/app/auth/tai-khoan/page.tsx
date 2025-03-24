'use client'

import { SaveIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'

import {
    AddButton,
    Button,
    ColumnType,
    CustomTable,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    FormInput,
} from '@/components'

import { VIETNAMESE_PHONE_REGEX } from '@/constants'
import { useCreateAdminAccount, useDisclosure, useGetAdminAccounts, useToast } from '@/hooks'
import { AdminAccountCreateRequestModel, AdminAccountModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<AdminAccountCreateRequestModel> = {
    email: '',
    fullName: '',
    password: '',
    phoneNumber: '',
}

const formSchema = z.object({
    email: z.string().email('Email không hợp lệ').nonempty('Vui lòng nhập email!'),
    fullName: z.string().nonempty('Vui lòng nhập họ và tên!'),
    password: z
        .string()
        .nonempty('Vui lòng đặt mật khẩu cho tài khoản')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    phoneNumber: z
        .string()
        .nonempty('Vui lòng nhập số điện thoại!')
        .regex(VIETNAMESE_PHONE_REGEX, 'Số điện thoại không hợp lệ!'),
})

const AdminCategoryPage = () => {
    const form = useForm<AdminAccountCreateRequestModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { toast } = useToast()

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false, {
        onClose: () => {
            form.reset(initialValues)
        },
    })

    const { mutate: createAdminAccount, isPending: isCreatingAdminAccounts } =
        useCreateAdminAccount()

    const {
        data: adminAccounts,
        isLoading: isLoadingAdminAccounts,
        refetch: refetchAdminAccounts,
    } = useGetAdminAccounts()

    const columns: ColumnType<AdminAccountModel> = [
        {
            key: 'id',
            label: 'Họ và tên',
            render: (data) => data.email,
        },
        {
            key: 'email',
            label: 'Email liên lạc',
            render: (data) => data.email || '---',
        },
    ]

    const handleSubmitForm = (data: AdminAccountCreateRequestModel) => {
        createAdminAccount(data, {
            onSuccess: async () => {
                toggleDialog()
                await refetchAdminAccounts()
                toast({ title: 'Thêm tài khoản thành công!', variant: 'success' })
            },
        })
    }

    return (
        <>
            <CustomTable
                rowKey="id"
                columns={columns}
                data={adminAccounts || []}
                tableName="Danh sách liên hệ"
                onRefresh={refetchAdminAccounts}
                isLoading={isLoadingAdminAccounts}
                totalElements={adminAccounts?.length}
                extraButtons={<AddButton onClick={toggleDialog}>Thêm tài khoản</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm danh mục</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <FormInput isRequired name="fullName" label="Họ và tên" />
                            <FormInput
                                isRequired
                                type="phone"
                                name="phoneNumber"
                                label="Số điện thoại"
                            />
                            <FormInput isRequired name="email" type="email" label="Email" />
                            <FormInput
                                isRequired
                                name="password"
                                type="password"
                                label="Mật khẩu"
                            />
                        </FormProvider>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={toggleDialog}>
                            Hủy
                        </Button>
                        <Button
                            isLoading={isCreatingAdminAccounts}
                            onClick={form.handleSubmit(handleSubmitForm)}
                        >
                            <SaveIcon />
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {/* <ModalConfirm
                isOpen={isModalDeleteOpen}
                onClose={toggleModalDelete}
                isLoading={isDeletingCategory}
                onConfirm={handleDeleteCategory}
            /> */}
        </>
    )
}

export default AdminCategoryPage
