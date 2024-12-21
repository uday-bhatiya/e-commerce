import { ShoppingBag } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

const Header = () => {

  const menuItems = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Store',
      path: '/store'
    },
    {
      name: 'Explore',
      path: '/explore'
    },
  ]

  return (
    <div className='flex items-center justify-between p-4 px-10 md:px-32 lg:px-48 bg-primary border-b-4 border-black'>
      <h2 className='font-bold text-lg bg-black text-white px-2 p-1'>Apna Store</h2>

      <ul className='flex gap-5'>
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className='hover:border-b-2 hover:border-b-white px-2 py-1 cursor-pointer'
          >{menu?.name}</li>
        ))}
      </ul>

      <div className='flex items-center justify-between gap-2'>
        <ShoppingBag />
        <Button className='bg-red-500 hover:bg-red-600'>Start selling</Button>
      </div>
    </div>
  )
}

export default Header