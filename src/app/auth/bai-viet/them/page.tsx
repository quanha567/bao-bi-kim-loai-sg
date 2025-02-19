'use client'

import { SaveIcon } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'
import { z } from 'zod'

import {
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
import { useCreateArticle, useToast } from '@/hooks'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
    title: z.string().min(1, 'Vui lòng nhập tên bài viết'),
    content: z.string().min(1, 'Vui lòng nhập nội dung bài viết'),
    thumbnail: z.instanceof(Blob).optional(),
})

const formDefaultValues = {
    title: '',
    content: '',
}

const AddArticlePage = () => {
    const router = useRouter()

    const { mutate: createArticle, isPending: isCreatingArticle } = useCreateArticle()

    const { toast } = useToast()

    const formMethods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDefaultValues,
    })

    const handleSubmitForm = (data: z.infer<typeof formSchema>) => {
        createArticle(data, {
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
                <CardTitle>Thêm bài viết</CardTitle>
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

export default AddArticlePage
