import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'

const ProductCardItem = ({ product }) => {
  return (
    <div>
      <Card className='p-3'>
        <Image 
        src={product?.image}
        alt={product?.name}
        width={400}
        height={300} />

        <div>
          <h3 className='font-bold text-lg'>{product?.name}</h3>
          <h2 className='font-bold text-2xl text-yellow-500'> ₹ {product?.price}</h2>

          <div className='mt-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Image 
              src={product?.user.image}
              alt='user profile'
              width={25}
              height={25}
              className='rounded-full' />
              <h2 className='text-sm text-gray-3=400'>{product?.user.name}</h2>
            </div>
            <Button size='sm'>Add to Cart</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductCardItem