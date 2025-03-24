'use client'

import { LogOutIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'

import Image from 'next/image'

import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, Typography } from '@/components'

interface UserInfoButtonProps {
    onLogout: () => void
}

export const UserInfoButton = ({ onLogout }: UserInfoButtonProps) => {
    const { data } = useSession()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                    {data?.user?.image ? (
                        <Image
                            width={50}
                            height={50}
                            alt="User Image"
                            className="block !size-6"
                            src={data?.user?.image || ''}
                        />
                    ) : (
                        <Avatar className="flex size-6 items-center justify-center bg-primary text-white">
                            {data?.user?.name?.charAt(0)}
                        </Avatar>
                    )}
                    <Typography as="span" className="text-sm">
                        {data?.user?.name}
                    </Typography>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="flex flex-col items-center">
                    {data?.user?.image ? (
                        <Image
                            width={100}
                            height={100}
                            alt="User Image"
                            src={data?.user?.image || ''}
                            className="block !size-16 rounded-full"
                        />
                    ) : (
                        <Avatar className="flex size-6 items-center justify-center bg-primary text-white">
                            {data?.user?.name?.charAt(0)}
                        </Avatar>
                    )}
                    <Typography className="mt-2" variant="bold-uppercase">
                        {data?.user?.name}
                    </Typography>
                    <div className="mt-4 w-full">
                        <Button variant="outline" className="w-full" onClick={onLogout}>
                            <LogOutIcon /> Đăng xuất
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
