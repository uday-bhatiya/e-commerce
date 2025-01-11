'use client';

import AllProducts from '../../../components/pages/AllProducts';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Search } from 'lucide-react';
import SortProducts from '../../../components/common/SortProducts';

const page = () => {

    const [loading, setLoading] = useState(false);
    const [productList, setProductList] = useState([]);
    const [limit] = useState(3);
    const [skip, setSkip] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [ sort, setSort ] = useState();

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

    const getSeachedProducts = async () => {}

    const handleLoadMore = () => {
        getAllProducts();
    }

    const handleSearch = () => {
        getSeachedProducts();
    }

    const sortProductList = async () => {}

    useEffect(() => {
        getAllProducts();
    }, []);

    useEffect(() => {
        if (sort) {
            setProductList([]);
            sortProductList();
        }
    }, [sort])

    return (
        <div className='mt-10'>
            <h2 className='font-bold text-3xl'>Explore</h2>

            <div className='my-5 flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <label>Search:</label>
                    <Input
                        className="w-80"
                        placeholder={"Search"}
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)} />
                    <Button onClick={() => handleSearch()}><Search /> Search</Button>
                </div>

                <SortProducts onSortChange={(value) => setSort(value)} />
            </div>

            <div>
                <AllProducts allProducts={productList} />
            </div>

            <div className='flex items-center justify-center my-5'>
                <Button onClick={() => handleLoadMore()}>Load more</Button>
            </div>
        </div>
    )
}

export default page