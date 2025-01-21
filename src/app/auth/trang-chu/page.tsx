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
import { Button } from '@/components'

import { useCreateOrUpdateHomeConfig, useGetHomeConfig } from '@/hooks'

const AdminHomePage = () => {
    const formMethods = useForm()

    const { data: homeConfig, isLoading: isLoadingHomeConfig } = useGetHomeConfig()

    const { mutate: createOrUpdate } = useCreateOrUpdateHomeConfig()

    const handleSubmitForm = (data: any) => {
        createOrUpdate(data)
    }

    useEffect(() => {
        if (!isLoadingHomeConfig && homeConfig) {
            formMethods.reset(homeConfig)
        }
    }, [isLoadingHomeConfig, homeConfig])

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <FormProvider {...formMethods}>
                <SliderConfig />
                <ProductConfig />
                <DoYouKnowConfig />
                <SuccessStory />
                <MyCustomerConfig />
                <Extras />
                <Button onClick={formMethods.handleSubmit(handleSubmitForm)}>Lưu</Button>
            </FormProvider>
        </div>
    )
}

export default AdminHomePage
