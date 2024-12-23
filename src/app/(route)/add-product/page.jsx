'use client'

import React, { useEffect, useState } from 'react'
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from '../../../components/ui/textarea';
import { Button } from '../../../components/ui/button';
import ImageUpload from '../../../components/common/ImageUpload';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const AddProduct = () => {

  const categoryOptions = ['Source code, UI Kit', 'Icons', 'Document', 'Fonts', 'Theme', 'Video', 'Other'];

  const { user } = useUser();
  const [ isLoading, setIsLoading ] = useState(false);
  const [ formData, setFormData ] = useState([]);

  const router = useRouter();

  const handleInputChange = ( fieldName, fieldValue ) => {
    setFormData(prev => ({
      ...prev,
      [fieldName] : fieldValue
    }))
  }

  const onAddProductBtn = async () => {
    setIsLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('image', formData.image);
      formDataObj.append('data', JSON.stringify(formData));

      const response = await axios.post('/api/product', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success) {
        toast('Product Added');
        router.push('/dashboard');
      }

      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setFormData({
      userEmail: user?.primaryEmailAddress?.emailAddress
    })
  }, [user])
  return (
    <div className='mt-10'>
      <h2 className='text-3xl font-bold'>Add New Product</h2>
      <p>Start adding product details to sell your item</p>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
        <div className='flex flex-col gap-5'>
          <ImageUpload onImageSelect={(e) => handleInputChange(e.target.name, e.target.files[0])} />

          <div>
            <label>Message to Buyer</label>
            <Textarea 
            name='message' 
            placeholder='Add Message'
            onChange= {(e) => handleInputChange(e.target.name, e.target.value)} />
          </div>
        </div>

        <div className='flex flex-col gap-5'>

          <div>
            <label>Product Title</label>
            <Input 
            name='title' 
            placeholder='Ex. Ui kit'
            onChange= {(e) => handleInputChange(e.target.name, e.target.value)} />
          </div>

          <div>
            <label>Price</label>
            <Input 
            type='number' 
            name='price' 
            placeholder='Ex. ₹ 200'
            onChange= {(e) => handleInputChange(e.target.name, e.target.value)} />
          </div>

          <div>
            <label>Category</label>
            <Select onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((category, index) => (
                  <SelectItem key={index} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label>Description</label>
            <Textarea 
            name='description' 
            placeholder='Add Product Description'
            onChange= {(e) => handleInputChange(e.target.name, e.target.value)} />
          </div>
          
          <div>
            <label>About Product (Optional) </label>
            <Textarea 
            name='about' 
            placeholder='Add Product Infomation'
            onChange= {(e) => handleInputChange(e.target.name, e.target.value)} />
          </div>

          <Button 
          diabled={isLoading}
          onClick={onAddProductBtn}>
            {isLoading ? <Loader2Icon className='animate-spin' /> : 'Add Product'}
          </Button>

        </div>
      </div>
    </div>
  )
}

export default AddProduct