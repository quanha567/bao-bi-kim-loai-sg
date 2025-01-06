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
    ModalConfirm,
    TableButtonWrapper,
    UpdateButton,
} from '@/components'

import {
    useCreateCategory,
    useDeleteCategory,
    useDisclosure,
    useGetCategories,
    useSearch,
    useToast,
    useUpdateCategory,
} from '@/hooks'
import { CategoryModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<CategoryModel> = {
    name: '',
    slug: '',
}

const formSchema = z.object({
    name: z.string().nonempty('Tên danh mục không được để trống'),
    slug: z.string(),
    id: z.string().optional(),
})

const AdminCategoryPage = () => {
    const form = useForm<CategoryModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { toast } = useToast()

    const [categoryIds, setCategoryIds] = useState<string[]>([])

    const { pageIndex, pageSize, searchText, handlePaginationChange } = useSearch({})

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false, {
        onClose: () => {
            form.reset()
        },
    })

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        refetch: fetchCategories,
    } = useGetCategories({
        pageIndex,
        pageSize,
        searchText,
    })

    const { mutate: updateCategory, isPending: isUpdatingCategory } = useUpdateCategory()

    const { mutate: createCategory, isPending: isCreatingCategory } = useCreateCategory()

    const { mutate: deleteCategory, isPending: isDeletingCategory } = useDeleteCategory()

    const columns: ColumnType<CategoryModel> = [
        {
            key: 'name',
            label: 'Tên danh mục',
            render: (data) => data.name,
        },
        {
            key: 'slug',
            label: 'Slug',
            render: (data) => data.slug,
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

    const openUpdateDialog = (data: CategoryModel) => {
        form.setValue('id', data.id, { shouldDirty: true })
        form.setValue('name', data.name, { shouldDirty: true })
        form.setValue('slug', data.slug, { shouldDirty: true })
        toggleDialog()
    }

    const handleSubmitForm = async (data: CategoryModel) => {
        console.log('handleSubmitForm  data:', data)
        try {
            if (data.id) {
                updateCategory(data, {
                    onSuccess: async () => {
                        await fetchCategories()
                        toggleDialog()
                        form.reset()
                        toast({
                            title: 'Cập nhật danh mục thành công!',
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
                return
            }

            createCategory(data, {
                onSuccess: async () => {
                    await fetchCategories()
                    toggleDialog()
                    form.reset()
                    toast({
                        title: 'Thêm danh mục thành công!',
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
        } catch (error) {
            console.log('handleSubmitForm  error:', error)
            toast({
                title: 'Có lỗi xảy ra',
                variant: 'destructive',
            })
        }
    }

    const handleDeleteCategory = async () => {
        if (categoryIds.length === 0) {
            return
        }

        deleteCategory(categoryIds, {
            onSuccess: async () => {
                await fetchCategories()
                toggleModalDelete()
                form.reset()
                toast({
                    title: 'Xóa danh mục thành công!',
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
        setCategoryIds(typeof ids === 'string' ? [ids] : ids)
        toggleModalDelete()
    }

    return (
        <>
            <CustomTable
                rowKey="id"
                columns={columns}
                tableName="Danh sách danh mục"
                isLoading={isLoadingCategories}
                data={categoriesData?.data || []}
                pageSize={categoriesData?.pageSize || 0}
                pageIndex={categoriesData?.pageIndex || 0}
                onPaginationChange={handlePaginationChange}
                totalPages={categoriesData?.totalPages || 0}
                totalElements={categoriesData?.totalElements || 0}
                extraButtons={<AddButton onClick={toggleDialog}>Thêm danh mục</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm danh mục</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <FormInput isRequired name="name" label="Tên danh mục" />
                            <FormInput name="slug" label="Slug" />
                        </FormProvider>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={toggleDialog}>
                            Hủy
                        </Button>
                        <Button
                            onClick={form.handleSubmit(handleSubmitForm)}
                            isLoading={isCreatingCategory || isUpdatingCategory}
                        >
                            <SaveIcon />
                            Lưu
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <ModalConfirm
                isOpen={isModalDeleteOpen}
                onClose={toggleModalDelete}
                isLoading={isDeletingCategory}
                onConfirm={handleDeleteCategory}
            />
        </>
    )
}

export default AdminCategoryPage
