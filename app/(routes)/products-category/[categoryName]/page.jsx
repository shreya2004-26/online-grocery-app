import Header from '@/app/_components/Header'
import globalApi from '@/app/_utils/globalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList'
import ProductList from '@/app/_components/ProductList'

async function productCategory({ params }) {
    const productList = await globalApi.getProductsByCategory(params.categoryName)
    const categoryList = await globalApi.getCategoryList();
    return (
        <>
            <Header />
            <div className='p-4 text-white font-bold bg-primary text-3xl text-center'>
                <h2>{params.categoryName}</h2>
            </div>
            <TopCategoryList categoryList={categoryList} />
            <ProductList productList={productList} />
        </>

    )
}

export default productCategory