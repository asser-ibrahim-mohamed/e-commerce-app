import { CategoryResponse, CategoryData } from '@/Interfaces/CategoriesInterface'
import React from 'react'
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
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
export default async function Categories() {
  try {
    const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    const { data }: CategoryResponse = await response.json()
    if (!data || data.length === 0) {
        return <div className="text-center mt-10">No categories found.</div>;
    }
    return <>
    <div className="pt-10">
  {data ? <div className="  mx-auto md:mt-4  ">
        <div className=" grid grid-cols-1 md:px-4   px-20 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((category) => (<div key={category._id} className=" ">
            <Link href={'categories/'+category._id}>
            <Card className="overflow-hidden ">
              <div className='relative w-full aspect-square '>
                <Image src={category.image} alt={category.name} fill className="relative z-20  w-full object-full p-3  " />
              </div>
              <CardFooter className='flex-col'>
                {category.name}
              </CardFooter>
            </Card>
            </Link>
          </div>))}

        </div>
      </div>
        :   <Spinner/>
                  }

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
