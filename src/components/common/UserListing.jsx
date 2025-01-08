'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import ProductCardItem from './ProductCardItem';

const UserListing = () => {

  const [listing, setListing] = useState([]);

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const getUserProductList = async () => {
    setLoading(true);

    try {
      const response = await axios.get('/api/product?email=' + user?.primaryEmailAddress?.emailAddress);
      setListing(response.data.response);
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    user && getUserProductList();
  }, [user]);

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-xl flex items-center justify-between'>
        Listing
        <Link href={'/add-product'}>
          <Button>+ Add New Product</Button>
        </Link>
      </h2>

      <div>
        {listing?.length === 0 &&
          <h2 className='font-medium text-2xl text-center text-gray-500 mt-10'>No listing found</h2>
        }

        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {listing?.map((item, index) => (
            <ProductCardItem key={index} product={item} editable={true} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserListing