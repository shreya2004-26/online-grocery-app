"use client"
import Header from '@/app/_components/Header'
import globalApi from '@/app/_utils/globalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const page = () => {
    const jwt = sessionStorage.getItem('jwt');
    const user = JSON.parse(sessionStorage.getItem('user'))
    const router = useRouter();

    useEffect(() => {
        if (!jwt) {
            router.replace('/')
        };
        getAllOrders()
    }, [])


    const getAllOrders = async () => {
        const orderList = await globalApi.getMyOrder(user.id, jwt)
        // console.log(orderList)
    }
    return (
        <>
            <Header />
            <h1 className='text-xl font-bold p-3 text-center bg-primary w-full text-white'>My Order</h1>
            <div className='flex flex-col gap-2 px-16 py-10'>
                <h1 className='font-bold text-3xl text-primary'> Order History</h1>
                <div className='flex justify-between bg-gray-200 w-1/2 p-2'>
                    <div className='flex gap-1'>
                        <h2 className='font-bold'>Order Date: </h2>
                        <h2>15/Mar/2024</h2>
                    </div>
                    <div className='flex gap-1'>
                        <h2 className='font-bold'>Total Amount: </h2>
                        <h2>53.02</h2>
                    </div>
                    <div className='flex gap-1'>
                        <h2 className='font-bold'>Status: </h2>
                        <h2>Pending</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page