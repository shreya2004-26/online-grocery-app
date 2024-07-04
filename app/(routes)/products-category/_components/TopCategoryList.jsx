// import CategoryList from '@/app/_components/CategoryList'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TopCategoryList = ({ categoryList }) => {
    return (
        <>
            <div className='flex gap-4 mx-7 md:mx-10 mt-5 justify-center overflow-auto'>
                {/* {console.log(category.attributes)} */}
                {categoryList?.map((category, index) => {
                    return (
                        <Link href={'/products-category/' + category.attributes.name} key={index} className='flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg group hover:bg-green-600 cursor-pointer hover:text-white text-green-800 w-[150px] min-w-[100px]'>
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + (category?.attributes?.icon?.data[0]?.attributes?.url)} width={50} height={50} alt='icon' className='group-hover:scale-125 transition-all ease-in-out' />
                            <h2>{category.attributes.name}</h2>
                        </Link>
                    )
                    // {console.log(categoryList)}
                    // {console.log(category?.attributes?.icon?.data[0]?.attributes?.url)}


                })}
            </div>
        </>
    )
}

export default TopCategoryList