'use client'

import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import {
    DoYouKnowConfig,
    Extras,
    MyCustomerConfig,
    ProductConfig,
    SliderConfig,
    SuccessStory,
} from './components'
import { FormSubmit } from '@/components'

import { useCreateOrUpdateHomeConfig, useGetHomeConfig, useToast } from '@/hooks'

const AdminHomePage = () => {
    const formMethods = useForm()

    const { toast } = useToast()

    const { data: homeConfig, isLoading: isLoadingHomeConfig } = useGetHomeConfig()

    const { mutate: createOrUpdate, isPending: isCreatingOrUpdating } =
        useCreateOrUpdateHomeConfig()

    const handleSubmitForm = (data: any) => {
        createOrUpdate(data, {
            onSuccess: () => {
                toast({
                    variant: 'success',
                    title: 'Cập nhật cấu hình trang chủ thành công!',
                })
            },
            onError: () => {
                toast({
                    variant: 'destructive',
                    title: 'Có lỗi xảy ra vui lòng thử lại sau!',
                })
            },
        })
    }

    useEffect(() => {
        if (!isLoadingHomeConfig && homeConfig) {
            formMethods.reset(homeConfig)
        }
    }, [isLoadingHomeConfig, homeConfig])

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FormProvider {...formMethods}>
                <SliderConfig isLoading={isLoadingHomeConfig} />
                <ProductConfig isLoading={isLoadingHomeConfig} />
                <DoYouKnowConfig isLoading={isLoadingHomeConfig} />
                <SuccessStory isLoading={isLoadingHomeConfig} />
                <MyCustomerConfig isLoading={isLoadingHomeConfig} />
                <Extras isLoading={isLoadingHomeConfig} />
                <FormSubmit
                    isLoading={isCreatingOrUpdating}
                    onSubmit={formMethods.handleSubmit(handleSubmitForm)}
                />
            </FormProvider>
        </div>
    )
}

export default AdminHomePage
