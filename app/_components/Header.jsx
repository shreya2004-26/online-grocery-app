"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import globalApi from '../_utils/globalApi'
import axios from 'axios'
import Link from 'next/link'

const Header = () => {
    const [CategoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getCategoryList();
    }, [])

    // Get Category List
    const getCategoryList = async () => {
        // globalApi.getCategory().then(resp => {
        //     setCategoryList(resp.data.data);
        // })
        // const resp = await axios.get("http://localhost:1337/api/categories?populate=*")
        setCategoryList(await globalApi.getCategory())
    }


    return (
        <>
            <div className='flex flex-row justify-between p-6 border-[1px] shadow-sm'>
                <div className='flex flex-row gap-7'>
                    <Link href="/" className='flex flex-row items-center gap-1'><Image src="/shopping-bag.png" alt='bag' width={50} height={50} /> <h1 className='flex flex-col leading-5 text-2xl font-bold  text-[#CD7A3D] '>Grocery<span className='text-[#4C9B6D]'>Store</span></h1></Link>
                    <h1 className='flex flex-row gap-1 font-semibold justify-center bg-[#DFE3EF] px-10  rounded-full items-center cursor-pointer '>

                        <DropdownMenu >
                            <DropdownMenuTrigger><h2 className='hidden md:flex items-center gap-1 focus:outline-none focus-within:outline-none border-none'><LayoutGrid className='w-5 h-5 focus:outline-none focus-within:outline-none border-none' />Category</h2></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {CategoryList.map((category, index) => {
                                    return <DropdownMenuItem key={index} className="flex gap-1 items-center cursor-pointer">
                                        <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (category?.attributes?.icon?.data[0]?.attributes?.url)}
                                            unoptimized={true}
                                            alt='icon'
                                            width={23}
                                            height={23} />
                                        <h2 className='capitalize'>{category?.attributes?.name}
                                        </h2>
                                    </DropdownMenuItem>
                                })}

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </h1>
                    <div className='flex flex-row gap-2 items-center border-[2px] px-3 rounded-full '>
                        <Search />
                        <input type='text' placeholder='Search' className='text-gray-500  text-sm border-none outline-none' />
                    </div>


                </div>

                <div className='flex flex-row gap-4 items-center'>
                    <ShoppingBag />
                    <h1 className='py-1 px-2 rounded-3xl text-white bg-[#4C9B6D]'>0</h1>
                    <Button>Login</Button>
                </div>
            </div>

        </>
    )
}

export default Header