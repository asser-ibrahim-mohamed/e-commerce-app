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
import { Button } from '@/components/ui/button'
import AddToCart from '../_components/AddToCart/AddToCart'
import { getWishlist } from '@/service/wishlist/get-wishlist'
import { ProductsData } from '@/Interfaces/ProductInterface'

export default function Wishlist() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['get-wishlist'],
    queryFn: getWishlist
  })

  if (isLoading) return <div className="pt-20 flex justify-center"><Spinner /></div>

  if (data?.success === false && data?.message === 'Login first') {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center px-4">
        <h2 className="text-2xl font-bold mb-4">Login first to see your wishlist</h2>
        <Link href="/signin">
          <Button className="bg-blue-600 hover:bg-blue-800 text-white px-10 py-2 rounded-xl">
            Sign In
          </Button>
        </Link>
      </div>
    )
  }

  if (isError || data?.success === false) return <div className="text-center pt-20 text-red-500 font-bold">Failed to load wishlist.</div>

  const wishlistItems: ProductsData[] = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center mt-20">My Wishlist</h1>
      {wishlistItems.length > 0 ? (
        <div className="grid justify-center items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-18">
          {wishlistItems.map((product: ProductsData) => (
            <div key={product.id} className="max-w-87 mx-auto sm:max-w-none py-4 w-full">
              <Card className="overflow-hidden sm:px-2 sm:py-10 sm:mt-3 h-full flex flex-col justify-between">
                <Link href={'/products/' + product.id}>
                  <div className='w-full aspect-square'>
                    <Image 
                      src={product.imageCover} 
                      alt={product.title} 
                      width={200} 
                      height={150} 
                      className="relative z-20 w-full h-full object-contain p-3" 
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
                    <div className="flex items-center">
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          product.ratingsAverage >= star 
                            ? <StarIcon key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            : product.ratingsAverage >= star - 0.5
                            ? <StarHalf key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            : <StarIcon key={star} className="w-4 h-4 text-gray-300" />
                        ))}
                      </div>
                      <p className='ms-2 text-sm text-gray-500'>({product.ratingsQuantity})</p>
                    </div>
                    <p className="font-bold mt-2">{product.price} EGP</p>
                  </CardContent>
                </Link>
                <div className="mt-4">
                  {/* تم تصحيح تمرير الـ Props هنا بحذف تعريف النوع غير الصحيح */}
                  <AddToCart productId={product.id} wishlistData={wishlistItems} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen text-center mx-auto my-auto">
          <p className='text-2xl font-bold mb-2'>Your wishlist is empty</p>
          <Link href="/products" className="text-blue-500 hover:underline mt-2">Go back to shopping</Link>
        </div>
      )}
    </div>
  )
}