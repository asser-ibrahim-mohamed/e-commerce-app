import { ProductsResponse, ProductsData } from '@/Interfaces/ProductInterface'
import React from 'react'
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, ShoppingCartIcon, StarHalf, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import AddToCart from '../_components/AddToCart/AddToCart'
import AddReviewButton from '../_components/ReviewsAction/AddReviewButton'


export default async function Products() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    const { data }: ProductsResponse = await response.json()
    return <>

      {data ?
        <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-18">
          {data.map((product) => (<div key={product.id} className="max-w-87 mx-auto sm:max-w-none py-4">
            <Card className="overflow-hidden sm:px-2 sm:py-10 sm:mt-3">
              <Link href={'products/' + product.id}>
                <div className='w-full aspect-square '>
                  <Image src={product.imageCover} alt={product.title} width={200} height={150} className="relative z-20 w-full object-contain p-3 " />
                </div>
                <CardHeader className='p-3 pb-0 lg:p-0'>
                  <CardDescription>{product.brand.name}</CardDescription>
                  <CardTitle className="line-clamp-1 font-bold" title={product.title}>
                    {product.title}
                  </CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                </CardHeader>
                <CardContent className='p-3 lg:p-0'>
                  <div className="flex">
                    <div className="flex mt-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        if (product.ratingsAverage >= star) {
                          return <StarIcon key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        } else if (product.ratingsAverage >= star - 0.5) {
                          return <StarHalf key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        } else {
                          return <StarIcon key={star} className="w-4 h-4 text-gray-300" />
                        }
                      })}
                    </div>
                    <p className='ms-2'>({product.ratingsQuantity})</p>
                  </div>
                  <p>{product.price} EGP</p>
                </CardContent>
              </Link>
              
            
              <div className="px-3 lg:px-0 mb-3">
                <AddReviewButton productId={product.id} />
              </div>

              <AddToCart productId={product.id}/>
            </Card>
          </div>))}

        </div>
        : <div className="flex flex-col justify-center items-center h-60 text-center mx-auto my-auto">
            <p className='text-2xl font-bold mb-2'>There is no product found</p>
          </div>
        }
    </>

  }
  catch (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">We couldn't load the categories. Please check your internet connection.</p>
      </div>
    )
  }
}