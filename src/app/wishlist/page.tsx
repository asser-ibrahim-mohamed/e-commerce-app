'use client'

import React from 'react'
import Image from "next/image"
import { useQuery } from '@tanstack/react-query'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { StarHalf, StarIcon } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import AddToCart from '../_components/AddToCart/AddToCart'
import { getWishlist } from '@/service/wishlist/get-wishlist'


export default function Wishlist() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-wishlist'],
    queryFn: getWishlist
  })

  if (isLoading) return <div className="pt-20"><Spinner /></div>
  if (isError) return <div className="text-center pt-20 text-red-500 font-bold">Failed to load wishlist.</div>

  return (
    <>
    <div className="p-4">
  <h1 className="text-3xl font-extrabold text-center mt-20">My Wishlist</h1>
      {data && data.length > 0 ? (
        <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-18">
          {data.map((product: any) => (
            <div key={product.id} className="max-w-87 mx-auto sm:max-w-none py-4">
              <Card className="overflow-hidden sm:px-2 sm:py-10 sm:mt-3">
                <Link href={'/products/' + product.id}>
                  <div className='w-full aspect-square '>
                    <Image 
                      src={product.imageCover} 
                      alt={product.title} 
                      width={200} 
                      height={150} 
                      className="relative z-20 w-full object-contain p-3" 
                    />
                  </div>
                  <CardHeader className='p-3 pb-0 lg:p-0'>
                    <CardDescription>{product.brand?.name}</CardDescription>
                    <CardTitle className="line-clamp-1 font-bold" title={product.title}>
                      {product.title}
                    </CardTitle>
                    <CardDescription>{product.category?.name}</CardDescription>
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
                
                <AddToCart productId={product.id} />
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center  items-center h-screen text-center mx-auto my-auto">
          <p className='text-2xl font-bold mb-2'>Your wishlist is empty</p>
          <Link href="/products" className="text-blue-500 hover:underline mt-2">Go back to shopping</Link>
        </div>
      )}
  </div>
    
    </>
  )
}