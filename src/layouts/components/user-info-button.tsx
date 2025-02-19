import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useSession } from 'next-auth/react'

import { Typography } from '@/components'

export const UserInfoButton = () => {
    const session = useSession()
    console.log('UserInfoButton  session:', session)

    return (
        <div className="flex cursor-pointer items-center gap-2 rounded-lg border p-1 hover:bg-zinc-200">
            <Avatar className="size-8">
                <AvatarImage src={'https://github.com/shadcn.png'} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
                <Typography className="text-xs" variant="bold-uppercase">
                    {session?.data?.user?.name || 'ADMIN'}
                </Typography>{' '}
                <Typography className="text-xs">{session?.data?.user?.email}</Typography>
            </div>
        </div>
    )
}
