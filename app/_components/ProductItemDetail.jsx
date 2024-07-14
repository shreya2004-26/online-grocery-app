"use client"
import { Button } from '@/components/ui/button'
import { LoaderCircle, ShoppingBasket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import globalApi from '../_utils/globalApi'
import { toast } from 'sonner'
import axios from 'axios'
import { UpdateCartContext } from '../_context/UpdateCartContext'

const ProductItemDetail = ({ product }) => {

    const [loading, setLoading] = useState()
    const jwt = sessionStorage.getItem('jwt')
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { updateCart, setUpdateCart } = useContext(UpdateCartContext)
    // for product total price
    const [productTotalPrice, setProductTotalPrice] = useState(product.attributes.sellingPrice ?
        product.attributes.sellingPrice :
        product.attributes.mrp
    )
    // for product total quantity
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();

    const add_To_Cart = async () => {
        setLoading(true)
        if (!jwt) {
            router.push('/sign-in');
            setLoading(false)
            return;
        }
        if (!user) {
            toast('User not found, please sign in');
            router.push('/sign-in');
            return;
        }
        const data = {
            data: {
                quantity: quantity,
                amount: (quantity * productTotalPrice).toFixed(2),
                products: product.id,
                users_permissions_users: user.id,
                userId: user.id
            }
        }
        // console.log(data);
        try {
            const res = await axios.post('http://localhost:1337/api/user-carts', data, {
                headers: {
                    Authorization: 'Bearer ' + jwt
                }
            });

            // console.log(res);
            toast('Added to Cart');
            setUpdateCart(!updateCart)
            setLoading(false)
        } catch (e) {
            toast('Error while Adding to Cart');
            setLoading(false)
        }
    }
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 p-7 bg-white text-black'>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (product?.attributes?.images?.data?.[0].attributes.url)}
                width={2000} height={200}
                alt='Item'
                className='bg-slate-200 p-5 h-[320px] w-[300px] rounded-lg object-contain' />
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>{product.attributes.name}</h2>
                <h2 className='text-sm font-normal text-gray-500'>{product.attributes.description}</h2>
                <div className='flex gap-3 items-center'>
                    {product?.attributes?.sellingPrice && <h2 className='font-bold text-3xl'>${product.attributes.sellingPrice}</h2>}
                    <h2 className={`font-bold text-3xl ${product?.attributes?.sellingPrice && 'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
                </div>
                <h2 className='font-medium text-lg'>Qualtity({product.attributes.itemQuantityType})</h2>
                <div className='flex flex-col items-baseline gap-3'>
                    <div className='flex gap-3'>
                        <div className='p-2 border flex gap-10 items-center px-5'>
                            <button disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)}>-</button>
                            <h2>{quantity}</h2>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <h2 className='font-bold text-2xl'> = ${quantity * productTotalPrice}</h2>
                    </div>

                    <Button className='flex gap-2' onClick={() => add_To_Cart()} disabled={loading}>
                        <ShoppingBasket />
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Add To Cart'}
                    </Button>
                </div>
                <h2 ><span className='font-bold'>Categories</span>: {product?.attributes?.categories?.data?.[0].attributes.name}</h2>
            </div>

        </div >
    )
}

export default ProductItemDetail