// "use client"
import Header from '@/app/_components/Header'
import globalApi from '@/app/_utils/globalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

async function productCategory({ params }) {
    const productList = await globalApi.getProductsByCategory(params.categoryName)
    // console.log("productList:", productList)
    const categoryList = await globalApi.getCategoryList();
    return (
        <>
            <Header />
            <div className='p-4 text-white font-bold bg-primary text-3xl text-center'>
                <h2>{decodeURIComponent(params.categoryName)}</h2>
            </div>
            <TopCategoryList categoryList={categoryList} />
            <div className='p-5 md:p-10'> {productList?.length === 0 ? (<h1 className='text-lg text-center font-semibold text-slate-500'>No products available</h1>) : < ProductList productList={productList} />}</div>

        </>

    )
}
//condition ? a:b
// a && b
// a || b
// a?.b
// a??b
export default productCategory