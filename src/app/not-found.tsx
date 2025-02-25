import Link from 'next/link'

import { Button } from '@/components'

const NotFoundPage = () => {
    return (
        <section className="flex h-full items-center p-16 dark:bg-gray-50 dark:text-gray-800">
            <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-400">404</h2>
                    <p className="text-2xl font-semibold md:text-3xl">
                        Rất tiếc, chúng tôi không tìm thấy trang này.
                    </p>
                    <p className="mb-8 mt-4 dark:text-gray-600">
                        Nhưng đừng lo lắng, bạn có thể tìm thấy nhiều thứ khác trên trang chủ của
                        chúng tôi.
                    </p>
                    <Link href="/" rel="noopener noreferrer">
                        <Button>Trở về trang chủ</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFoundPage
