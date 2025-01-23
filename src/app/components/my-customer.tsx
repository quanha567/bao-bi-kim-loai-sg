'use client'

import React from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Typography } from '@/components'

import { HomeConfigModel } from '@/models'

type MyCustomerProps = Pick<HomeConfigModel, 'customerLogos'>

export const MyCustomer = ({ customerLogos }: MyCustomerProps) => {
    if (!customerLogos?.length) return <></>

    const minItems = 10
    const repeatCount = Math.ceil(minItems / customerLogos.length)
    const repeatedLogos = Array(repeatCount).fill(customerLogos).flat().slice(0, minItems) // Ensure exactly `minItems` items

    return (
        <div className="py-10">
            <div className="container">
                <Typography as="h2" variant="h2" className="font-normal">
                    <span className="font-bold">KHÁCH HÀNG </span>
                    luôn là người bạn đồng hành của <span className="font-bold">SAMEPACK</span>
                </Typography>
                <div className="my-6 h-[1px] w-full max-w-xs bg-[#808080] lg:max-w-lg"></div>
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
                            {repeatedLogos.map((src, j) => (
                                <Image
                                    src={src}
                                    width={200}
                                    height={200}
                                    key={`${i}-${j}`}
                                    alt={`Customer logo ${i}-${j}`}
                                    className="h-20 w-auto flex-none object-contain lg:h-32"
                                />
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
