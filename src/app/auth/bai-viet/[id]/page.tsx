'use client'

import { SaveIcon } from 'lucide-react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { useParams, useRouter } from 'next/navigation'
import { z } from 'zod'

import {
    BackButton,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    FormCkeditor,
    FormInput,
    FormUpload,
} from '@/components'

import { ADMIN_PATH } from '@/constants'
import { useGetArticle, useToast, useUpdateArticle } from '@/hooks'
import { ArticleStatus } from '@/models'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    title: z.string().min(1, 'Vui lòng nhập tên bài viết'),
    content: z.string().min(1, 'Vui lòng nhập nội dung bài viết'),
    slug: z.string().optional(),
    id: z.string().optional(),
    status: z.string().optional(),
})

const formDefaultValues = {
    title: '',
    content: '',
    slug: '',
    status: ArticleStatus.DRAFT,
}

const UpdateArticlePage = () => {
    const router = useRouter()

    const { id } = useParams()

    const { mutate: updateArticle, isPending: isCreatingArticle } = useUpdateArticle()

    const { toast } = useToast()

    const { data: articleDetail, isLoading: isLoadingArticle } = useGetArticle(id as string)

    const formMethods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    })

    useEffect(() => {
        formMethods.reset({ ...articleDetail })
    }, [JSON.stringify(articleDetail)])

    const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
        updateArticle(data, {
            onSuccess: () => {
                toast({
                    title: 'Thêm bài viết thành công!',
                    variant: 'success',
                })
                router.push(ADMIN_PATH.ARTICLE)
            },
            onError: (error) => {
                console.log('handleSubmitForm  error:', error)
                toast({
                    title: 'Có lỗi xảy ra vui lòng thử lại sau!',
                    variant: 'destructive',
                })
            },
        })
    }

    return (
        <Card>
            <CardHeader>
                <BackButton />
                <CardTitle>Chỉnh sửa bài viết</CardTitle>
            </CardHeader>
            <FormProvider {...formMethods}>
                <CardContent>
                    <div className="w-full max-w-xs">
                        <FormUpload label="Ảnh bìa" name="thumbnail" />
                    </div>
                    <FormInput name="title" label="Tiêu đề" />
                    <FormCkeditor name="content" label="Nội dung bài viết" />
                    <Button
                        className="inline-flex"
                        isLoading={isCreatingArticle}
                        onClick={formMethods.handleSubmit(handleSubmitForm)}
                    >
                        <SaveIcon />
                        Lưu
                    </Button>
                </CardContent>
            </FormProvider>
        </Card>
    )
}

export default UpdateArticlePage
