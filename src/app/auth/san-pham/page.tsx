'use client'

import { SaveIcon } from 'lucide-react'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import Image from 'next/image'
import Link from 'next/link'
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
    FormTextarea,
    FormUpload,
    ModalConfirm,
    TableButtonWrapper,
    Typography,
    UpdateButton,
} from '@/components'

import { DEFAULT_PATH } from '@/constants'
import {
    useCreateProduct,
    useDeleteProduct,
    useDisclosure,
    useGetCategoryOptions,
    useGetProducts,
    useSearch,
    useToast,
    useUpdateProduct,
} from '@/hooks'
import { ProductModel } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<ProductModel> = {
    name: '',
    slug: '',
    category: {
        id: '',
        name: '',
        products: [],
        slug: '',
        createdAt: '',
        updatedAt: '',
    },
    image: undefined,
    imageHover: undefined,
    description: '',
}

const formSchema = z.object({
    name: z.string().nonempty('Tên sản phẩm không được để trống'),
    slug: z.string(),
    id: z.string().optional(),
    category: z.object({
        id: z.string().nonempty('Danh mục không được để trống'),
    }),
    image: z.instanceof(Blob).or(z.string()).optional(),
    imageHover: z.instanceof(Blob).or(z.string()).optional(),
    description: z.string().optional(),
})

const AdminProductPage = () => {
    const form = useForm<ProductModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { pageIndex, pageSize, searchText, handlePaginationChange } = useSearch({})

    const { toast } = useToast()

    const [productIds, setProductIds] = useState<string[]>([])

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false)

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const {
        data: productsData,
        isLoading: isLoadingProducts,
        refetch: fetchProducts,
    } = useGetProducts({
        pageIndex,
        pageSize,
        searchText,
    })

    const {
        categoryOptions,
        categorySearchText,
        isLoadingCategoryOptions,
        loadMoreCategoryOptions,
        setCategorySearchText,
        isFetchingNextPageCategoryOptions,
    } = useGetCategoryOptions()

    const { mutate: updateProduct, isPending: isUpdatingProduct } = useUpdateProduct()

    const { mutate: createProduct, isPending: isCreatingProduct } = useCreateProduct()

    const { mutate: deleteProduct, isPending: isDeletingProduct } = useDeleteProduct()

    const columns: ColumnType<ProductModel> = [
        {
            key: 'image',
            label: 'Hình ảnh',
            render: (data) => (
                <div className="size-[50px]">
                    {data.image && typeof data.image === 'string' ? (
                        <Image
                            width={50}
                            height={50}
                            alt={data.name}
                            src={data.image}
                            className="!h-full !w-full object-cover"
                        />
                    ) : null}
                </div>
            ),
        },
        {
            key: 'imageHover',
            label: 'Hình ảnh thay thế',
            render: (data) => (
                <div className="size-[50px]">
                    {data.imageHover && typeof data.imageHover === 'string' ? (
                        <Image
                            width={50}
                            height={50}
                            alt={data.name}
                            src={data.imageHover}
                            className="!h-full !w-full object-cover"
                        />
                    ) : null}
                </div>
            ),
        },
        {
            key: 'name',
            label: 'Tên sản phẩm',
            render: (data) => (
                <Link target="_blank" href={`${DEFAULT_PATH.PRODUCT}/${data.slug}`}>
                    <Typography as="span" variant="link" className="text-primary">
                        {data.name}
                    </Typography>
                </Link>
            ),
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
        form.reset({ ...data })
        toggleDialog()
    }

    const openCreateDialog = () => {
        form.reset(initialValues)
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
                pageSize={pageSize}
                pageIndex={pageIndex}
                onRefresh={fetchProducts}
                isLoading={isLoadingProducts}
                tableName="Danh sách sản phẩm"
                data={productsData?.data || []}
                totalPages={productsData?.totalPages || 0}
                onPaginationChange={handlePaginationChange}
                totalElements={productsData?.totalElements || 0}
                extraButtons={<AddButton onClick={openCreateDialog}>Thêm sản phẩm</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Thêm sản phẩm</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <div className="grid grid-cols-2 gap-2">
                                <FormUpload name="image" label="Hình ảnh" />
                                <FormUpload name="imageHover" label="Hình ảnh thay thế" />
                            </div>
                            <FormInput isRequired name="name" label="Tên sản phẩm" />
                            <FormSelect
                                searchable
                                isRequired
                                label="Danh mục"
                                name="category.id"
                                options={categoryOptions}
                                searchValue={categorySearchText}
                                isLoading={isLoadingCategoryOptions}
                                onLoadMore={loadMoreCategoryOptions}
                                onSearchChange={setCategorySearchText}
                                searchPlaceholder="Tìm kiếm danh mục..."
                                isLoadingMore={isFetchingNextPageCategoryOptions}
                            />
                            <FormInput name="slug" label="Slug" />
                            <FormTextarea name="description" label="Mô tả sản phẩm" />
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
