"use client"
import { Button } from '@/components/ui/button'
import { SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import React, { useEffect, useState } from 'react'
import CartItemList from './CartItemList'
import { useRouter } from 'next/navigation'


const CartPage = ({ cartItemList, onDeleteItem }) => {
    const router = useRouter();
    // const jwt = sessionStorage?.getItem('jwt')
    const jwt = window?.sessionStorage?.getItem("jwt")
    console.log(jwt)
    if (!jwt) return null;
    // console.log(cartItemList)
    const [subTotal, setSubTotal] = useState(0);
    const calculateTotal = () => {
        let total = 0;
        cartItemList.forEach(element => {
            total = total + element.amount;
        });
        setSubTotal(total)
    }
    useEffect(() => {
        calculateTotal()
    }, [cartItemList]) //when page will be render and cart item list
    return (
        <>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-white bg-primary py-1 px-2 mt-3">My Cart</SheetTitle>
                    <SheetDescription>
                        <CartItemList cartItemList={cartItemList} onDeleteItem={onDeleteItem} />
                    </SheetDescription>
                </SheetHeader>


                <SheetFooter className='absolute bottom-2 w-full left-1 p-4 flex-col md:flex-col gap-5'>
                    <h2 className='flex text-lg font-bold justify-between'>Subtotal <span>${subTotal}</span> </h2>
                    <SheetClose asChild>
                        <Button className='w-full' type="submit" onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}>Checkout</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </>
    )
}

export default CartPage