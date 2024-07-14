import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const CartItemList = ({ cartItemList, onDeleteItem }) => {

    return (
        <>
            <div className='flex flex-col h-[500px] overflow-auto'>
                <div className='flex flex-col mt-2 gap-4'>
                    {cartItemList?.map((cart, index) => cart?.imageUrl && (
                        <div index={index} className='flex flex-row gap-5 md:gap-6 items-center relative'>
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart?.imageUrl} width={200} height={80} className='w-[80px] border-[1px] rounded-md shadow-sm p-1' alt='Media' />
                            <div className='flex flex-col gap-0'>
                                <h2 className='font-bold'>{cart?.name}</h2>
                                <h2>Quantity {cart.quantity}</h2>
                                <h2 className='text-lg font-bold'> $ {cart?.amount}</h2>
                            </div>
                            <Trash2Icon onClick={() => onDeleteItem(cart.id)} className='self-center absolute top-1/2 right-1 cursor-pointer' />
                        </div>
                    ))}
                </div >

            </div>


        </>

    )
}

export default CartItemList