'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Product from '@/app/_demoData/product';
import ProductCardItem from '../common/ProductCardItem';

const ProductList = () => {

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        setProductList(Product);
    }, []);
  return (
    <div>
        <h2 className='font-bold text-xl flex items-center justify-between'>Featured
        <span> <Button>View All</Button> </span>
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
            {productList.map((item, index) => (
                <ProductCardItem key={index} product={item} />
            ))}
        </div>
    </div>
  )
}

export default ProductList