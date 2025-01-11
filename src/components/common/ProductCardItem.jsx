import React from 'react'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChartLine, MoreVertical, PenBox, Trash2 } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import Link from 'next/link'

export const ProductEditableOption = ({ children }) => {
  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent>
        <ul>
          <li className='flex gap-2 hover:bg-slate-200 cursor-pointer p-2 rounded-md'><PenBox />Edit</li>
          <li className='flex gap-2 hover:bg-slate-200 cursor-pointer p-2 rounded-md'><ChartLine />Analytics</li>
          <li className='flex gap-2 hover:bg-slate-200 cursor-pointer  p-2 rounded-md text-red-500'><Trash2 />Edit</li>
        </ul>
      </PopoverContent>
    </Popover>
  )
}

const ProductCardItem = ({ product, editable = false }) => {
  return (
    <Link href={`/explore/${product._id}`}>
      <Card className='p-3 mt-5 max-w-max'>
        <Image
          src={product?.imageUrl}
          alt={product?.title}
          width={400}
          height={300} />

        <div>
          <h3 className='font-bold text-lg'>{product?.title}</h3>
          <h2 className='font-bold text-2xl text-yellow-500'> ₹ {product?.price}</h2>

          <div className='mt-3 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <Image
                src={product?.createdById?.image}
                alt='user profile'
                width={25}
                height={25}
                className='rounded-full' />
              <h2 className='text-sm text-gray-3=400'>{product?.createdById?.name}</h2>
            </div>
            {!editable ? <Button size='sm'>Add to Cart</Button> :
             <ProductEditableOption>
              <MoreVertical />
              </ProductEditableOption>}
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ProductCardItem