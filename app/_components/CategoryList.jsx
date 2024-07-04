"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CategoryList = ({ categoryList }) => {
    return (
        <div className='flex flex-col px-16 text-primary'>
            <h1 className='font-semibold text-2xl gap-2'>Shop by Category</h1>
            <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-5 mt-3'>
                {/* {console.log(category.attributes)} */}
                {categoryList?.map((category, index) => {
                    return (
                        <Link href={'/products-category/' + category.attributes.name} key={index} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group hover:bg-green-600 cursor-pointer hover:text-white text-green-800'>
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (category?.attributes?.icon?.data[0]?.attributes?.url)} width={50} height={50} alt='icon' className='group-hover:scale-125 transition-all ease-in-out' />
                            <h2>{category.attributes.name}</h2>
                        </Link>
                    )
                    // {console.log(categoryList)}
                    // {console.log(category?.attributes?.icon?.data[0]?.attributes?.url)}


                })}
            </div>
        </div >
    )
}

export default CategoryList
