import { BrandsResponse, BrandsData } from '@/Interfaces/BrandsInterfaces'
import React from 'react'
import { Spinner } from "@/components/ui/spinner"
import Image from "next/image"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Heart, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Brands() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
  const { data }: BrandsResponse = await response.json()
  return <>
  <div className="py-10 px-10">
   {data ? <div className="  mx-auto mt-4 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.map((brand) => (<div key={brand._id} className=" ">
          
         
          <Link href={'/brands/' + brand._id}>
            <Card className="overflow-hidden max-h-165">
              <div className='w-full '>
                <Image src={brand.image} alt={brand.name} width={200} height={150} className="relative z-20  w-full object-cover p-3 " />
              </div>
              <CardFooter className='flex-col '>
                
                {brand.name}
              </CardFooter>
            </Card>
          </Link>

        </div>))}

      </div>
    </div> :
      <Spinner />}
  </div>
  </>
 } catch (error) {

    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">We couldn't load the categories. Please check your internet connection.</p>
      </div>
    )
  }
}