'use client';

import AllProducts from '../../../components/pages/AllProducts';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button';

const page = () => {

    const [ loading, setLoading ] = useState(false);
    const [ productList, setProductList ] = useState([]);
    const [limit] = useState(3); 
    const [skip, setSkip] = useState(0); 

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/all-products', { limit, skip });
            console.log(response.data.response.length)
   
                setProductList((prevList) => [
                    ...prevList,
                    ...response.data.response, // Append new products
                ]);
                setSkip((prevSkip) => prevSkip + response.data.response.length); // Update skip value
        
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        getAllProducts();
    }

    useEffect(() => {
        getAllProducts();
    }, []);

  return (
    <div className='mt-10'>
        <h2 className='font-bold text-3xl'>Explore</h2>

        <div>
            <AllProducts allProducts={productList} />
        </div>

        <div className='flex items-center justify-center my-5'>
            <Button onClick={handleLoadMore}>Load more</Button>
        </div>
    </div>
  )
}

export default page