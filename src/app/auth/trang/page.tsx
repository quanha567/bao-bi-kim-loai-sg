'use client'

import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'

import {
    AddButton,
    Button,
    ColumnType,
    CustomTable,
    DeleteButton,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    FormInput,
    FormSelect,
    ModalConfirm,
    TableButtonWrapper,
    UpdateButton,
} from '@/components'

import { PAGE_TYPE_OPTIONS } from '@/constants'
import {
    useCreatePage,
    useDeletePage,
    useDisclosure,
    useGetAllPage,
    useToast,
    useUpdatePage,
} from '@/hooks'
import { PageModel, PageType } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<PageModel> = {
    name: '',
    type: PageType.CUSTOM,
}

const formSchema = z.object({
    name: z.string().nonempty('Tên trang không được để trống'),
    type: z
        .enum(Object.values(PageType) as [PageType, ...PageType[]])
        .default(PageType.CUSTOM)
        .optional(),
    id: z.string().optional(),
    target: z.string().optional(),
})

const PagePage = () => {
    const form = useForm<PageModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { toast } = useToast()

    const { type } = form.watch()

    const [pageIds, setPageIds] = useState<string[]>([])

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false, {
        onClose: () => {
            form.reset()
        },
    })

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const { data: pages, isLoading: isLoadingPages, refetch: fetchCategories } = useGetAllPage()
    const { mutate: updatePage, isPending: isUpdatingPage } = useUpdatePage()

    const { mutate: createPage, isPending: isCreatingPage } = useCreatePage()

    const { mutate: deletePage, isPending: isDeletingPage } = useDeletePage()

    const columns: ColumnType<PageModel> = [
        {
            key: 'name',
            label: 'Tên trang',
            render: (data) => data.name,
        },
        {
            key: 'type',
            label: 'Loại trang',
            render: (data) => data.type,
        },
        {
            key: 'id',
            label: 'Chức năng',
            render: (data) => (
                <TableButtonWrapper>
                    <UpdateButton onClick={() => openUpdateDialog(data)} />
                    <DeleteButton onClick={() => handleOpenDeleteModal(data.id)} />
                </TableButtonWrapper>
            ),
        },
    ]

    const openUpdateDialog = (data: PageModel) => {
        form.reset({ ...data })
        toggleDialog()
    }

    const handleSubmitForm = async (data: PageModel) => {
        if (data.id) {
            updatePage(data, {
                onSuccess: async () => {
                    toggleDialog()
                    form.reset()
                    toast({
                        title: 'Cập nhật trang thành công!',
                        variant: 'success',
                    })
                },
                onError: () => {
                    toast({
                        title: 'Có lỗi xảy ra vui lòng thử lại sau!',
                        variant: 'destructive',
                    })
                },
            })
            return
        }

        createPage(data, {
            onSuccess: async () => {
                toggleDialog()
                form.reset()
                toast({
                    title: 'Thêm trang thành công!',
                    variant: 'success',
                })
            },
            onError: () => {
                toast({
                    title: 'Có lỗi xảy ra vui lòng thử lại sau!',
                    variant: 'destructive',
                })
            },
        })
    }

    const handleDeletePage = async () => {
        if (pageIds.length === 0) {
            return
        }

        deletePage(pageIds, {
            onSuccess: async () => {
                await fetchCategories()
                toggleModalDelete()
                form.reset()
                toast({
                    title: 'Xóa trang thành công!',
                    variant: 'success',
                })
            },
            onError: (error) => {
                toast({
                    title: error.message,
                    variant: 'destructive',
                })
            },
        })
    }

    const handleOpenDeleteModal = (ids: string | string[]) => {
        setPageIds(typeof ids === 'string' ? [ids] : ids)
        toggleModalDelete()
    }

    const renderTarget = () => {
        switch (type) {
            case PageType.ARTICLE:
                return <FormInput name="targetId" label="Liên kết" />
            case PageType.CATEGORY:
                return <></>
            case PageType.CUSTOM:
                return <FormInput name="targetId" label="Liên kết" placeholder="/trang-chu" />
            case PageType.PRODUCT:
                return <></>
            default:
        }
    }

    return (
        <>
            <CustomTable
                rowKey="id"
                columns={columns}
                data={pages || []}
                isLoading={isLoadingPages}
                tableName="Danh sách trang"
                extraButtons={<AddButton onClick={toggleDialog}>Thêm mới</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm trang</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <FormInput isRequired name="name" label="Tên trang" />
                            <FormSelect
                                name="type"
                                label="Loại trang"
                                options={PAGE_TYPE_OPTIONS}
                            />
                            {renderTarget()}
                        </FormProvider>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={toggleDialog}>
                            Hủy
                        </Button>
                        <Button
                            isLoading={isCreatingPage || isUpdatingPage}
                            onClick={form.handleSubmit(handleSubmitForm)}
                        >
                            <SaveIcon />
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ModalConfirm
                isOpen={isModalDeleteOpen}
                isLoading={isDeletingPage}
                onClose={toggleModalDelete}
                onConfirm={handleDeletePage}
            />
        </>
    )
}

export default PagePage
