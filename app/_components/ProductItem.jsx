"use client"
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image'
import React from 'react'
import ProductItemDetail from './ProductItemDetail';

const ProductItem = ({ product }) => {
    const imgSrc = product?.attributes?.images?.data?.[0].attributes.url;
    return imgSrc && (
        <div className='flex flex-col items-center justify-center  border rounded-lg p-2 md:p-6 gap-3  hover:scale-105 hover:shadow-lg transition-all ease-in-out'>
            {/* {console.log(process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "" + product?.attributes?.images?.data?.[0].attributes.url)} */}
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (product?.attributes?.images?.data?.[0].attributes.url)}
                width={500}
                height={200}
                alt={product?.attributes?.name}
                className='h-[200px] w-[200px] object-contain' />
            <h2 className='font-semibold text-lg'>{product?.attributes?.name}</h2>
            <div className='flex gap-2 items-center'>
                {product?.attributes?.sellingPrice && <h2 className='font-semibold text-lg'>${product.attributes.sellingPrice}</h2>}
                <h2 className={`font-semibold ${product?.attributes?.sellingPrice && 'line-through text-gray-500'}`}>${product?.attributes?.mrp}</h2>
            </div>


            <Dialog>
                <DialogTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground  text-primary  hover:text-white hover:bg-primary p-2 '>Add to Cart</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                        <DialogDescription>
                            <ProductItemDetail product={product} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default
    ProductItem