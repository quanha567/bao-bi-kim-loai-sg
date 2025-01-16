'use client'

import { SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { z } from 'zod'

import {
    AddButton,
    Badge,
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

import { PAGE_TYPE_NAMES, PAGE_TYPE_OPTIONS } from '@/constants'
import {
    useCreatePage,
    useDeletePage,
    useDisclosure,
    useGetAllPage,
    useGetArticleOptions,
    useGetCategoryOptions,
    useGetProductOptions,
    useToast,
    useUpdatePage,
} from '@/hooks'
import { PageModel, PageType } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const initialValues: Partial<PageModel> = {
    name: '',
    type: PageType.CUSTOM,
    targetId: '',
}

const formSchema = z
    .object({
        name: z.string().optional(),
        type: z
            .enum(Object.values(PageType) as [PageType, ...PageType[]])
            .default(PageType.CUSTOM)
            .optional(),
        id: z.string().optional(),
        targetId: z.string().nonempty('Liên kết không được để trống!'),
    })
    .refine(
        (data) => {
            // If type is CUSTOM, name must not be empty
            if (data.type === PageType.CUSTOM && (!data.name || data.name.trim() === '')) {
                return false
            }
            return true
        },
        {
            message: 'Tên trang không được để trống khi loại là CUSTOM!',
            path: ['name'], // The field to associate the error message with
        },
    )

const PagePage = () => {
    const form = useForm<PageModel>({
        defaultValues: initialValues,
        resolver: zodResolver(formSchema),
    })

    const { toast } = useToast()

    const { type, id, targetId } = form.watch()

    const [pageIds, setPageIds] = useState<string[]>([])

    const [isDialogOpen, { toggle: toggleDialog }] = useDisclosure(false)

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const { data: pages, isLoading: isLoadingPages, refetch: fetchPages } = useGetAllPage()
    const { mutate: updatePage, isPending: isUpdatingPage } = useUpdatePage()

    const { mutate: createPage, isPending: isCreatingPage } = useCreatePage()

    const { mutate: deletePage, isPending: isDeletingPage } = useDeletePage()

    const {
        categoryOptions,
        isFetchingNextPageCategoryOptions,
        isLoadingCategoryOptions,
        loadMoreCategoryOptions,
    } = useGetCategoryOptions({
        isEnable: type === PageType.CATEGORY,
        optionKey: 'slug',
    })

    const {
        isFetchingNextPageProductOptions,
        isLoadingProductOptions,
        loadMoreProductOptions,
        productOptions,
    } = useGetProductOptions({
        isEnable: type === PageType.PRODUCT,
        optionKey: 'slug',
    })

    const {
        articleOptions,
        isFetchingNextPageArticleOptions,
        isLoadingArticleOptions,
        loadMoreArticleOptions,
    } = useGetArticleOptions({
        isEnable: type === PageType.ARTICLE,
        optionKey: 'slug',
    })

    const columns: ColumnType<PageModel> = [
        {
            key: 'name',
            label: 'Tên trang',
            render: (data) => data.name,
        },
        {
            key: 'type',
            label: 'Loại trang',
            render: (data) => <Badge variant="outline">{PAGE_TYPE_NAMES[data.type]}</Badge>,
        },
        {
            key: 'targetId',
            label: 'Liên kết',
            render: (data) => data.targetId,
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

    const openCreateDialog = () => {
        form.reset(initialValues)
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
                await fetchPages()
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

    useEffect(() => {
        // reset targetId when type change and set name to empty if type is CUSTOM
        form.setValue('targetId', '')

        if (type === PageType.CUSTOM) {
            form.setValue('name', '')
        }
    }, [type])

    useEffect(() => {
        switch (type) {
            case PageType.ARTICLE: {
                const selectedArticle = articleOptions.find((item) => item.value === targetId)

                if (selectedArticle?.label) {
                    form.setValue('name', String(selectedArticle.label), { shouldDirty: true })
                }
                break
            }
            case PageType.CATEGORY: {
                const selectedCategory = categoryOptions.find((item) => item.value === targetId)

                if (selectedCategory?.label) {
                    form.setValue('name', String(selectedCategory.label), {
                        shouldDirty: true,
                    })
                }

                break
            }
            case PageType.PRODUCT: {
                const selectedProduct = productOptions.find((item) => item.value === targetId)

                if (selectedProduct?.label) {
                    form.setValue('name', String(selectedProduct.label), {
                        shouldDirty: true,
                    })
                }
                break
            }
            default:
                break
        }
    }, [targetId, type])

    const renderTarget = () => {
        switch (type) {
            case PageType.ARTICLE:
                return (
                    <FormSelect
                        name="targetId"
                        options={articleOptions}
                        label="Bài việt liên kết"
                        isLoading={isLoadingArticleOptions}
                        onLoadMore={loadMoreArticleOptions}
                        isLoadingMore={isFetchingNextPageArticleOptions}
                    />
                )
            case PageType.CATEGORY:
                return (
                    <FormSelect
                        name="targetId"
                        label="Danh mục liên kết"
                        options={categoryOptions}
                        isLoading={isLoadingCategoryOptions}
                        onLoadMore={loadMoreCategoryOptions}
                        isLoadingMore={isFetchingNextPageCategoryOptions}
                    />
                )
            case PageType.CUSTOM:
                return <FormInput name="targetId" label="Liên kết" />
            case PageType.PRODUCT:
                return (
                    <FormSelect
                        name="targetId"
                        options={productOptions}
                        label="Sản phẩm liên kết"
                        isLoading={isLoadingProductOptions}
                        onLoadMore={loadMoreProductOptions}
                        isLoadingMore={isFetchingNextPageProductOptions}
                    />
                )
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
                extraButtons={<AddButton onClick={openCreateDialog}>Thêm mới</AddButton>}
            />
            <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{id ? 'Cập nhật trang' : 'Thêm trang'}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <FormProvider {...form}>
                            <FormSelect
                                name="type"
                                label="Loại trang"
                                options={PAGE_TYPE_OPTIONS}
                            />
                            {type === PageType.CUSTOM && (
                                <FormInput isRequired name="name" label="Tên trang" />
                            )}
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
