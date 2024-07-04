import Image from 'next/image'
import React from 'react'

const Banner = () => {
    return (
        <div className='flex justify-center w-full mt-5'>
            <Image src='/banner.png'
                width={2000} height={300}
                className='w-10/12 h-[400px] object-contain cursor-pointer' alt='banner' />
        </div>
    )
}

export default Banner