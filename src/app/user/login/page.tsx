'use client'
import { signIn } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'

import Image from 'next/image'

import { Button, FormInput, Typography } from '@/components'

import GoogleSvg from '@/public/google-svg.svg'
import LoginBg from '@/public/login-bg.png'

const AdminLoginPage = () => {
    const formMethods = useForm()

    const signInWithGoogle = () => {
        signIn('google')
    }

    return (
        <FormProvider {...formMethods}>
            <div className="flex h-screen w-screen items-center justify-center overflow-hidden p-20">
                <div className="grid w-full max-w-6xl grid-cols-2 overflow-hidden rounded-lg bg-white p-4 drop-shadow-lg">
                    <div className="flex flex-col justify-center gap-6 p-4">
                        <Typography variant="h1">Đăng nhập</Typography>
                        <Typography variant="p">
                            Đăng nhập vào trang quản trị{' '}
                            <Typography as="span" className="font-bold text-primary">
                                SAMEPACK
                            </Typography>
                        </Typography>
                        <div className="space-y-4">
                            <FormInput
                                label="Email"
                                name="username"
                                placeholder="Nhập email của bạn"
                            />
                            <FormInput
                                name="password"
                                type="password"
                                label="Mật khẩu"
                                placeholder="Nhập email của bạn"
                            />
                        </div>
                        <Button className="h-10 w-full">Đăng nhập</Button>
                        <div className="relative border border-b">
                            <Typography
                                as="span"
                                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-medium"
                            >
                                Hoặc
                            </Typography>
                        </div>
                        <Button
                            variant="outline"
                            className="h-10 w-full"
                            onClick={signInWithGoogle}
                        >
                            <Image src={GoogleSvg} alt="Google Logo" className="size-5" />
                            Đăng nhập với Google
                        </Button>
                    </div>
                    <Image
                        src={LoginBg}
                        alt="Login Bg"
                        className="aspect-square h-full w-full rounded-md object-cover"
                    />
                </div>
            </div>
        </FormProvider>
    )
}

export default AdminLoginPage
