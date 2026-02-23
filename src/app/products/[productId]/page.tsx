import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { ProductsData } from '@/Interfaces/ProductInterface';
import { StarHalf, StarIcon } from 'lucide-react';
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import Slider from '@/app/_components/Slider/Slider';
import AddToCart from '@/app/_components/AddToCart/AddToCart';
import AddReviewButton from '@/app/_components/ReviewsAction/AddReviewButton';
import ProductReviews from '@/app/_components/ReviewsAction/ProductReviews';
import { getCurrentUserId } from '@/app/api/auth/verify-token';



export default async function ProductDetails({ params }: { params: Params }) {
  const { productId } = await params;
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + productId)
  const { data }: { data: ProductsData } = await response.json()
  
  const currentUserId = await getCurrentUserId();
  
  return <>
    <div className="p-3 flex flex-col justify-center items-center min-h-screen py-10">
      
      <Card className='grid grid-cols-1 md:grid-cols-3 w-full max-w-4xl shadow mt-5 p-4'>
        <div className="">
          <Slider key={data._id} images={data.images} title={data.title}/>
        </div>
        
        <div className="col-span-2 space-y-5 text-left">
          <CardHeader className='p-3 pb-0 lg:p-2'>
            <h1 className='text-gray-400 '>{data.brand.name}</h1>
            <CardTitle className=" font-extrabold" title={data.description}>
              {data.title}
            </CardTitle>
            <h2 className='font-semibold text-green-600'>Description:</h2>
            <CardDescription className='text-black text-sm'>{data.description}</CardDescription>
            <CardDescription>{data.category.name}</CardDescription>
          </CardHeader>
          
          <div className="flex flex-col">
            <CardContent className=' md:p-0'>
              <div className="flex ">
                <div className="flex md:ms-2 ">
                  {[1, 2, 3, 4, 5].map((star) => {
                    if (data.ratingsAverage >= star) {
                      return <StarIcon key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    } else if (data.ratingsAverage >= star - 0.5) {
                      return <StarHalf key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    } else {
                      return <StarIcon key={star} className="w-5 h-5 text-gray-300" />
                    }
                  })}
                </div>
                <p className='ms-2 '>({data.ratingsQuantity})</p>
              </div>
              <p className='md:ms-2 '>EGP {data.price} </p>
              
              <div className="md:ms-2 mt-1">
                <AddReviewButton productId={data.id} />
              </div>
            </CardContent>
            
            <div className="mt-5 mr-8">
              <AddToCart productId={data.id}/>
            </div>
            
            <div className="mt-8 md:ms-2">
           
               <ProductReviews productId={data.id} currentUserId={currentUserId} />
            </div>

          </div>
        </div>
      </Card>
    </div>
  </>
}