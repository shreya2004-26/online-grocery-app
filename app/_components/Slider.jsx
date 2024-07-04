
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'
const Slider = ({ sliderList }) => {
    return (
        <div className='p-10 px-16'>
            <Carousel>
                <CarouselContent>
                    {/* {console.log("print thid" + slider.attributes?.image?.data[0]?.attributes?.url)} */}
                    {sliderList.map((slider, index) => {

                        return <CarouselItem key={index}>
                            {/* {console.log(slider.attributes)} */}
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider.attributes?.image?.data[0]?.attributes?.url}
                                alt='slide' width={2000} height={200} className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl' />
                        </CarouselItem>
                    })}


                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    )
}

export default Slider