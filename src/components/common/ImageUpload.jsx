'use client'

import Image from 'next/image'
import React, { useState } from 'react'

const ImageUpload = ({ onImageSelect }) => {

    const [image, setImage] = useState();

    const handleFileChange = (e) => {
        onImageSelect(e);
        const file = e.target.files[0];
        const render = new FileReader();
        render.onloadend = () => {
            setImage(render.result)
        }
        render.readAsDataURL(file)
    }

    return (
        <div>
            <h3>Upload Product Image</h3>
            <input
                type="file"
                id='imageUpload'
                name='image'
                className='hidden'
                onChange={handleFileChange} />
            <label htmlFor="imageUpload">
                <div className='flex justify-center items-center p-10 cursor-pointer border-dashed border-2 border-black bg-slate-200'>
                    {image ?
                     (
                        <Image
                            src={image}
                            alt='product image'
                            width={300}
                            height={300}
                            className='object-contain h-[200px]'
                        />
                    ) 
                    : 
                    (
                        <Image src={'/image.png'} alt='img' width={70} height={70} />
                    )

                    }
                </div>
            </label>
        </div>
    )
}

export default ImageUpload