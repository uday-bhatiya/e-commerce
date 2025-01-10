import React from 'react'
import ProductCardItem from '../common/ProductCardItem';

const AllProducts = ({ allProducts }) => {

    const productList = 0;

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
    {allProducts.length > 0 ?  allProducts.map((item, index) => (
        <ProductCardItem key={index} product={item} />
    )) :
    [1,2,3,4,5,6].map((item, index) => (
        <div key={index} className='h-[250px] w-full bg-slate-200 rounded-lg'>

        </div>
    ))
    }
</div>
  )
}

export default AllProducts