"use client"
import Header from '@/app/_components/Header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import React from 'react'

const page = () => {
    const router = useRouter();
    return (
        <>
            <Header />
            <div className='flex flex-col justify-center items-center w-full pt-32'>
                <Card className='flex flex-col items-center p-14 border rounded-md shadow-md gap-3'>
                    {/* <CardHeader> */}
                    <CardTitle><Image src='/check.png' width={50} height={50} className='w-[50px self-center] ' /></CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                    {/* </CardHeader> */}
                    <h2 className='text-green-500 font-bold text-2xl'>Order Successful</h2>
                    <h2>Thank you so much for your order</h2>
                    {/* <CardContent>
                        <p>Card Content</p>
                    </CardContent> */}
                    <CardFooter className='pt-5'>
                        <Button className='bg-green-600' onClick={() => router.push("/")}>Go to Homepage</Button>
                    </CardFooter>
                </Card>
            </div>

        </>
    )
}

export default page