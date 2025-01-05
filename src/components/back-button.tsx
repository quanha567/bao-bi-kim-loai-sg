'use client'

import { Undo2 } from 'lucide-react'

import { useRouter } from 'next/navigation'

import { Button } from './ui'

export const BackButton = () => {
    const router = useRouter()

    return (
        <Button className="w-fit" variant="outline" onClick={router.back}>
            <Undo2 />
            Trở về
        </Button>
    )
}
