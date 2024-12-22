'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'

const UserListing = () => {

    const [ listing, setListing ] = useState([]);
 
  return (
    <div className='mt-5'>
        <h2 className='font-bold text-xl flex items-center justify-between'>
            Listing
            <Button>+ Add New Product</Button>
        </h2>

        <div>
            {listing?.length === 0  && 
            <h2 className='font-medium text-2xl text-center text-gray-500 mt-10'>No listing found</h2>
            }
        </div>
    </div>
  )
}

export default UserListing