import { DidYouKnow, HomeCarousel, MyCustomer, SuccessStory, TopProduct } from './components'

export default function Home() {
    return (
        <div className="space-y-10">
            <HomeCarousel />
            <TopProduct />
            <DidYouKnow />
            <SuccessStory />
            <MyCustomer />
        </div>
    )
}
