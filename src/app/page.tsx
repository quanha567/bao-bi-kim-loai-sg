import {
    CompanyOverview,
    DidYouKnow,
    HomeCarousel,
    MyCustomer,
    SuccessStory,
    TopProduct,
} from './components'

export default function HomePage() {
    return (
        <div className="space-y-6 lg:space-y-10">
            <HomeCarousel />
            <TopProduct />
            <DidYouKnow />
            <SuccessStory />
            <MyCustomer />
            <CompanyOverview />
        </div>
    )
}
