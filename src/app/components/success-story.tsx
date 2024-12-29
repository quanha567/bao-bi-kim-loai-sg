import Image from 'next/image'

import { Typography } from '@/components'

import DividerSvg from '@/public/divider.svg'
import StoryImg1 from '@/public/story1.jpg'
import StoryImg2 from '@/public/story2.jpg'
import StoryImg3 from '@/public/story3.jpg'

export const SuccessStory = () => {
    const stories = [
        {
            img: StoryImg1,
            title: 'Tận tâm với khách hàng',
        },
        {
            img: StoryImg2,
            title: 'Tập thể đoàn kết ',
        },
        {
            img: StoryImg3,
            title: 'Cải tiến công nghệ',
        },
    ]

    return (
        <div className="container flex flex-col items-center py-6 lg:py-10">
            <Typography
                as="h2"
                variant="h2"
                className="text-pretty text-center font-normal leading-normal"
            >
                <span className="font-bold">CHÚNG TÔI</span> luôn tin rằng sự thành công của <br />
                <span className="font-bold">SAMEPACK</span> được khởi nguồn từ...
            </Typography>
            <div className="relative my-10 w-full max-w-md border-b border-[#808080]">
                <Image
                    alt="divider"
                    src={DividerSvg}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F8F8F8] px-4"
                />
            </div>
            <div className="mt-4 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-8">
                {stories.map((story, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                        <Image
                            alt="story"
                            src={story.img}
                            className="aspect-square w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Typography
                            variant="h3"
                            className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-pretty text-center text-white"
                        >
                            {story.title}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
