'use client'

import { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
    AddButton,
    ColumnType,
    CustomTable,
    DeleteButton,
    ModalConfirm,
    TableButtonWrapper,
    Typography,
    UpdateButton,
} from '@/components'

import { ADMIN_PATH } from '@/constants'
import { useDeleteArticle, useDisclosure, useGetArticles, useSearch, useToast } from '@/hooks'
import { ArticleModel } from '@/models'

const AdminArticlePage = () => {
    const { pageIndex, pageSize, searchText, handlePaginationChange } = useSearch({})

    const { toast } = useToast()

    const router = useRouter()

    const [articleIds, setArticleIds] = useState<string[]>([])

    const [isModalDeleteOpen, { toggle: toggleModalDelete }] = useDisclosure(false)

    const {
        data: articleData,
        isLoading: isLoadingArticles,
        refetch: fetchArticles,
    } = useGetArticles({
        pageIndex,
        pageSize,
        searchText,
    })

    const { mutate: deleteArticle, isPending: isDeletingArticle } = useDeleteArticle()

    const columns: ColumnType<ArticleModel> = [
        {
            key: 'thumbnail',
            label: 'Hình ảnh',
            render: (data) => (
                <div className="size-[50px]">
                    {data.thumbnail && typeof data.thumbnail === 'string' ? (
                        <Image
                            width={50}
                            height={50}
                            alt={data.thumbnail}
                            src={data.thumbnail}
                            className="!h-full !w-full object-cover"
                        />
                    ) : null}
                </div>
            ),
        },
        {
            key: 'title',
            label: 'Tiêu đề',
            render: (data) => (
                <Link target="_blank" href={`/${data.slug}`}>
                    <Typography as="span" variant="link" className="text-primary">
                        {data.title}
                    </Typography>
                </Link>
            ),
        },
        {
            key: 'slug',
            label: 'Tiêu đề',
            render: (data) => data.slug,
        },
        {
            key: 'id',
            label: 'Chức năng',
            render: (data) => (
                <TableButtonWrapper>
                    <UpdateButton onClick={() => updateArticle(data)} />
                    <DeleteButton onClick={() => handleOpenDeleteModal(data.id)} />
                </TableButtonWrapper>
            ),
        },
    ]

    const createNewArticle = () => router.push(ADMIN_PATH.ADD_ARTICLE)
    const updateArticle = (data: ArticleModel) => router.push(`${ADMIN_PATH.ARTICLE}/${data.id}`)

    const handleDeleteArticle = () => {
        if (articleIds.length === 0) {
            return
        }

        deleteArticle(articleIds, {
            onSuccess: async () => {
                await fetchArticles()
                toggleModalDelete()
                toast({
                    title: 'Xóa bài viết thành công!',
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

    const handleOpenDeleteModal = (ids: string | string[]) => {
        setArticleIds(typeof ids === 'string' ? [ids] : ids)
        toggleModalDelete()
    }

    return (
        <>
            <CustomTable
                rowKey={'id'}
                columns={columns}
                pageSize={pageSize}
                pageIndex={pageIndex}
                onRefresh={fetchArticles}
                isLoading={isLoadingArticles}
                tableName="Danh sách bài viết"
                data={articleData?.data || []}
                totalPages={articleData?.totalPages || 0}
                onPaginationChange={handlePaginationChange}
                totalElements={articleData?.totalElements || 0}
                extraButtons={<AddButton onClick={createNewArticle}>Thêm</AddButton>}
            />

            <ModalConfirm
                isOpen={isModalDeleteOpen}
                onClose={toggleModalDelete}
                isLoading={isDeletingArticle}
                onConfirm={handleDeleteArticle}
            />
        </>
    )
}

export default AdminArticlePage
