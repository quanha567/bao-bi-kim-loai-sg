'use client'

import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Image from 'next/image'
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
    FormUpload,
    ModalConfirm,
    TableButtonWrapper,
    UpdateButton,
} from '@/components'

import {
    useCreateProduct,
    useDeleteProduct,
    useDisclosure,
    useGetProducts,
    useToast,
    useUpdateProduct,
} from '@/hooks'
import { ProductModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<ProductModel> = {
    name: '',
    slug: '',
}

const formSchema = z.object({
    name: z.string().nonempty('Tên sản phẩm không được để trống'),
    slug: z.string(),
    id: z.string().optional(),
})

const AdminProductPage = () => {
    const form = useForm<ProductModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { toast } = useToast()

    const [productIds, setProductIds] = useState<string[]>([])

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false, {
        onClose: () => {
            form.reset()
        },
    })

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const {
        data: productsData,
        isLoading: isLoadingProducts,
        refetch: fetchProducts,
    } = useGetProducts()

    const { mutate: updateProduct, isPending: isUpdatingProduct } = useUpdateProduct()

    const { mutate: createProduct, isPending: isCreatingProduct } = useCreateProduct()

    const { mutate: deleteProduct, isPending: isDeletingProduct } = useDeleteProduct()

    const columns: ColumnType<ProductModel> = [
        {
            key: 'image',
            label: 'Hình ảnh',
            render: (data) =>
                data.image && typeof data.image === 'string' ? (
                    <Image width={50} height={50} alt={data.name} src={data.image} />
                ) : null,
            align: 'center',
        },
        {
            key: 'name',
            label: 'Tên sản phẩm',
            render: (data) => data.name,
        },
        {
            key: 'category',
            label: 'Danh mục',
            render: (data) => data?.category?.name,
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

    const openUpdateDialog = (data: ProductModel) => {
        form.setValue('id', data.id, { shouldDirty: true })
        form.setValue('name', data.name, { shouldDirty: true })
        form.setValue('slug', data.slug, { shouldDirty: true })
        toggleDialog()
    }

    const handleSubmitForm = async (data: ProductModel) => {
        console.log('handleSubmitForm  data:', data)
        try {
            if (data.id) {
                updateProduct(data, {
                    onSuccess: async () => {
                        await fetchProducts()
                        toggleDialog()
                        form.reset()
                        toast({
                            title: 'Cập nhật sản phẩm thành công!',
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

            createProduct(data, {
                onSuccess: async () => {
                    await fetchProducts()
                    toggleDialog()
                    form.reset()
                    toast({
                        title: 'Thêm sản phẩm thành công!',
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

    const handleDeleteProduct = async () => {
        if (productIds.length === 0) {
            return
        }

        deleteProduct(productIds, {
            onSuccess: async () => {
                await fetchProducts()
                toggleModalDelete()
                toast({
                    title: 'Xóa sản phẩm thành công!',
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
        setProductIds(typeof ids === 'string' ? [ids] : ids)
        toggleModalDelete()
    }

    return (
        <>
            <CustomTable
                rowKey={'id'}
                columns={columns}
                onRefresh={fetchProducts}
                isLoading={isLoadingProducts}
                tableName="Danh sách sản phẩm"
                data={productsData?.data || []}
                pageSize={productsData?.pageSize || 0}
                pageIndex={productsData?.pageIndex || 0}
                totalPages={productsData?.totalPages || 0}
                totalElements={productsData?.totalElements || 0}
                extraButtons={<AddButton onClick={toggleDialog}>Thêm sản phẩm</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm sản phẩm</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <FormUpload name="image" label="Hình ảnh" />
                            <FormInput isRequired name="name" label="Tên sản phẩm" />
                            <FormSelect isRequired label="Danh mục" name="category.id" />
                            <FormInput name="slug" label="Slug" />
                        </FormProvider>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={toggleDialog}>
                            Hủy
                        </Button>
                        <Button
                            onClick={form.handleSubmit(handleSubmitForm)}
                            isLoading={isCreatingProduct || isUpdatingProduct}
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
                isLoading={isDeletingProduct}
                onConfirm={handleDeleteProduct}
            />
        </>
    )
}

export default AdminProductPage
