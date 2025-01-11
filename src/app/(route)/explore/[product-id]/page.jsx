'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../../../../components/ui/button';
import { Badge } from '../../../../components/ui/badge';
import { Card } from '../../../../components/ui/card';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion"

const page = ({ params }) => {

  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  const path = usePathname();
  const id = path.split('/')[2];

  const getProductDetails = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`/api/product/${id}`);
      if (!response) {
        console.error("Failed to fetch product");
      }

      setProduct(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [])
  return (
    <div className='mt-10'>
      <h2>BACK</h2>

      {loading? (
        <div className='flex gap-5 items-center justify-center mt-6'>
          <div className='h-[400px] w-[600px] bg-slate-200'></div>
          <div className='h-[400px] w-[600px] bg-slate-200'></div>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 gap-10'>
        <Card className='flex items-center justify-center max-h-[400px]'>
          <Image
            src={product?.imageUrl}
            alt={product?.title}
            width={400}
            height={300}
            className='h-[400px] w-[400px] object-contain' />
        </Card>
        <div className='flex flex-col gap-5'>
          <div>
            <h3 className='text-2xl font-bold'>{product?.title}</h3>
            <Badge className={'text-black'}>{product?.category}</Badge>
          </div>
          <h3 className='text-3xl font-bold text-yellow-600'>₹{product?.price}</h3>

          <p className='text-gray-500'>The {product?.category} will send to your registered email id once you purchase this digital products</p>

          <Button className='w-full' size='lg'>Add to cart</Button>

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                {product?.desription}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>About product</AccordionTrigger>
              <AccordionContent>
                {product?.about}
              </AccordionContent>
            </AccordionItem>
            </Accordion>
        </div>
      </div>
      )}
    </div>
  )
}

export default page