'use client'

import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import Product from '../../app/_demoData/product';
import ProductCardItem from '../common/ProductCardItem';
import axios from 'axios';
import Link from 'next/link';

const ProductList = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getProducts = async () => {
        setLoading(true);

        try {
            const response = await axios.get('/api/product?limit=3');
            console.log(response.data.response);
            setProductList(response.data.response);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // setProductList(Product);
        getProducts();
    }, []);
    return (
        <div>
            <h2 className='font-bold text-xl flex items-center justify-between'>Featured
                <span>
                    <Link href={'/explore'}><Button>View All</Button></Link>
                </span>
            </h2>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                {productList.length > 0 ?  productList.map((item, index) => (
                    <ProductCardItem key={index} product={item} />
                )) :
                [1,2,3,4,5,6].map((item, index) => (
                    <div key={index} className='h-[250px] w-full bg-slate-200 rounded-lg'>

                    </div>
                ))
                }
            </div>
        </div>
    )
}

export default ProductList