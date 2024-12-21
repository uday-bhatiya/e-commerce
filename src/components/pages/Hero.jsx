import React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

const Hero = () => {
    return (
        <div className='bg-green-700 p-10 px-28 lg:px-36'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10 pt-20'>
                <div>
                    <h2 className='font-extrabold text-5xl text-white'>Spped Up your Creative workflow</h2>
                    <p className='text-gray-200 my-5'>Join a growing family of 53,537 designers, creator and makers from around the world</p>

                    <div className='flex gap-5'>
                        <Button>Explore</Button>
                        <Button className='bg-red-500 hover:bg-red-600'>Sell</Button>
                    </div>
                </div>

                <div className='flex items-center justify-center'>
                    <Image
                        src={'/img1.webp'}
                        alt='pc img'
                        width={300}
                        height={300}
                        className='scale-x-[-1]' />
                </div>
            </div>
        </div>
    )
}

export default Hero