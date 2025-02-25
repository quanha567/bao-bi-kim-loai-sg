import { Metadata } from 'next'

import {
    CompanyOverview,
    DidYouKnow,
    HomeCarousel,
    MyCustomer,
    SuccessStory,
    TopProduct,
} from './components'

import { API_URL } from '@/constants'
import { getApiUrl } from '@/lib'
import { HomeConfigModel, HomeConfigRequestModel } from '@/models'

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Trang chủ website Bao Bì Kim Loại Sài Gòn',
}

export default async function HomePage() {
    const homeConfig = await getHomeConfigData()

    return (
        <div className="space-y-6 lg:space-y-10">
            <HomeCarousel sliders={homeConfig.sliders} />
            <TopProduct products={homeConfig.products} />
            <DidYouKnow doYouKnows={homeConfig.doYouKnows} />
            <SuccessStory successStories={homeConfig.successStories} />
            <MyCustomer customerLogos={homeConfig.customerLogos} />
            <CompanyOverview extras={homeConfig.extras} />
        </div>
    )
}

const getHomeConfigData = async (): Promise<HomeConfigModel> => {
    return fetch(getApiUrl(API_URL.HOME_CONFIG))
        .then((res) => res.json())
        .then((res: HomeConfigRequestModel) => ({
            ...res,
            doYouKnows: res.doYouKnows ? JSON.parse(res.doYouKnows) : [],
            extras: res.extras ? JSON.parse(res.extras) : [],
            successStories: res.successStories ? JSON.parse(res.successStories) : [],
        }))
}
