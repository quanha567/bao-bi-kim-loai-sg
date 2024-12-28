'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Typography } from '@/components'

import Logo1 from '@/public/brand1.png'
import Logo2 from '@/public/brand2.png'
import Logo3 from '@/public/brand3.png'
import Logo4 from '@/public/brand4.png'
import Logo5 from '@/public/brand5.png'
import Logo6 from '@/public/brand6.png'
import Logo7 from '@/public/brand7.png'
import Logo8 from '@/public/brand8.png'

const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo1, Logo2]

export const MyCustomer = () => {
    return (
        <div className="py-10">
            <div className="container">
                <Typography as="h2" variant="h2" className="font-normal">
                    <span className="font-bold">KHÁCH HÀNG </span>
                    luôn là người bạn đồng hành của <span className="font-bold">SAMEPACK</span>
                </Typography>
                <div className="my-6 h-[1px] w-full max-w-lg bg-[#808080]"></div>
            </div>
            <div className="relative flex overflow-hidden">
                <motion.div
                    initial={{ translateX: 0 }}
                    animate={{ translateX: '-50%' }}
                    className="flex flex-none gap-16 pr-16"
                    transition={{
                        duration: 20,
                        ease: 'linear',
                        repeat: Infinity,
                    }}
                >
                    {[...new Array(2)].fill(0).map((_, i) => (
                        <React.Fragment key={i}>
                            {logos.map((src, j) => (
                                <Image
                                    src={src}
                                    key={`${i} - ${j}`}
                                    alt={`${i} - ${j}`}
                                    className="h-32 w-auto flex-none object-contain"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
