"use client"
import Header from '@/app/_components/Header'
import globalApi from '@/app/_utils/globalApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const router = useRouter();
    const [orderList, setOrderList] = useState(null);
    useEffect(() => {
        const jwt = sessionStorage?.getItem('jwt');
        const user = JSON.parse(sessionStorage.getItem('user'))
        console.log("user", user)
        if (!jwt) {
            router.replace('/')
        };
        getAllOrders(user, jwt)
    }, [])


    const getAllOrders = async (user, jwt) => {
        const orderList = await globalApi.getMyOrder(user.id, jwt)
        console.log(orderList)
        setOrderList(orderList)
    }
    return (
        <>
            <Header />
            <h1 className='text-xl font-bold p-3 text-center bg-primary w-full text-white'>My Order</h1>
            <div className='flex flex-col gap-2 px-16 py-10'>
                <h1 className='font-bold text-3xl text-primary'> Order History</h1>
                {
                    orderList?.map((curr, index) => {
                        return (
                            <div className='flex justify-between bg-gray-200 w-1/2 p-2' key={index}>
                                <div className='flex gap-1'>
                                    <h2 className='font-bold'>Order Date: </h2>
                                    <h2>{curr?.orderDate}</h2>
                                </div>
                                <div className='flex gap-1'>
                                    <h2 className='font-bold'>Total Amount: </h2>
                                    <h2>{curr?.totalOrderAmount}</h2>
                                </div>
                                <div className='flex gap-1'>
                                    <h2 className='font-bold'>Status: </h2>
                                    <h2>Pending</h2>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default page