"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { CircleUserRound, LayoutGrid, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import globalApi from '../_utils/globalApi'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import CartPage from './CartPage'
import { UpdateCartContext } from '../_context/UpdateCartContext'
import { toast } from 'sonner'

const Header = () => {
    let user = null;
    let jwt = null;
    let isLogin = false;

    try {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            user = JSON.parse(userData);
        }
        jwt = sessionStorage.getItem('jwt');
        isLogin = !!jwt;
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
    // const user = JSON.parse(sessionStorage.getItem('user'));
    // const jwt = sessionStorage.getItem('jwt')
    const router = useRouter();
    // const isLogin = sessionStorage.getItem('jwt') ? true : false;
    const [categoryList, setCategoryList] = useState([]);
    const [totalCartItem, setTotalCartItem] = useState(0);
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
    const [cartItemList, setCartItemList] = useState([]);


    useEffect(() => {
        getCategoryList();
    }, [])

    useEffect(() => {
        getCartItems();
    }, [updateCart])

    // Get Category List
    const getCategoryList = async () => {
        // globalApi.getCategory().then(resp => {
        //     setCategoryList(resp.data.data);
        // })
        // const resp = await axios.get("http://localhost:1337/api/categories?populate=*")
        setCategoryList(await globalApi.getCategory())
    }
    const onSignOut = () => {
        sessionStorage.clear();
        router.push('/sign-in');
    }

    // used to get total cart items

    const getCartItems = async () => {
        const cartItemList_ = await globalApi.getCartItems(user?.id, jwt);
        // console.log(cartItemList_)
        setTotalCartItem(cartItemList_?.length);
        setCartItemList(cartItemList_)
    }

    const handleDeleteItem = async (id) => {
        globalApi.deleteCartItem(id, jwt).then(resp => {
            toast('Item Removed !')
            getCartItems()
        })
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
                                {categoryList.map((category, index) => {
                                    return <DropdownMenuItem key={index} >
                                        <Link href={'/products-category/' + category?.attributes?.name} className="flex gap-1 items-center cursor-pointer">
                                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (category?.attributes?.icon?.data[0]?.attributes?.url)}
                                                unoptimized={true}
                                                alt='icon'
                                                width={23}
                                                height={23} />
                                            <h2 className='capitalize'>{category?.attributes?.name}
                                            </h2>
                                        </Link>

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
                    <Sheet className='relative'>
                        <SheetTrigger asChild>
                            <ShoppingBasket className='cursor-pointer h-7 w-7' />
                        </SheetTrigger>
                        <CartPage cartItemList={cartItemList}
                            onDeleteItem={handleDeleteItem} />
                    </Sheet>

                    <h1 className='bg-[#4C9B6D] text-white px-2 rounded-full  '>{totalCartItem}</h1>
                    {!isLogin ? <Button onClick={() => router.push("/sign-in")}>Login</Button> : <DropdownMenu>
                        <DropdownMenuTrigger asChild><CircleUserRound className='bg-green-100 cursor-pointer text-primary rounded-full h-11 w-11 px-2' /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => router.push("/my-order")}>My Order</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" onClick={() => onSignOut()}>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    }
                </div>
            </div>

        </>
    )
}

export default Header
