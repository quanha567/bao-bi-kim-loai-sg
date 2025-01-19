'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { DoYouKnowConfig, ProductConfig, SliderConfig, SuccessStory } from './components'

const AdminHomePage = () => {
    const formMethods = useForm()
    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <FormProvider {...formMethods}>
                <SliderConfig />
                <ProductConfig />
                <DoYouKnowConfig />
                <SuccessStory />
            </FormProvider>
        </div>
    )
}

export default AdminHomePage
