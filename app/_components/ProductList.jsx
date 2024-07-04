import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ productList }) => {
    return (
        <div className='flex flex-col px-16 mt-10'>
            <h1 className='font-semibold text-2xl gap-2 text-primary'>Our Popular Products</h1>
            <div className='grid grid-col-2 md:grid-col-3 lg:grid-cols-4 gap-5 gap-y-8 mt-4'>
                {productList?.map((product, index) => {
                    return (<ProductItem key={index} product={product} />)
                })}
            </div>
        </div>
    )
}

export default ProductList