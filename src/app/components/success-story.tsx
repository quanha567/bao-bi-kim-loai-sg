import Image from 'next/image'

import { Typography } from '@/components'

import { HomeConfigModel } from '@/models'
import DividerSvg from '@/public/divider.svg'

type SuccessStoryProps = Pick<HomeConfigModel, 'successStories'>

export const SuccessStory = ({ successStories }: SuccessStoryProps) => {
    if (!successStories?.length) return

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
                {successStories.map((story, index) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                        <Image
                            width={500}
                            height={500}
                            alt={story.title}
                            src={String(story.image)}
                            className="aspect-square w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20"></div>
                        <Typography
                            variant="h3"
                            className="absolute left-1/2 top-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-pretty break-all text-center !text-4xl text-white"
                        >
                            {story.title}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    )
}
