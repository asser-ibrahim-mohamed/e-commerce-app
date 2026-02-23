import React from 'react'
import Image from "next/image"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Heart, ShoppingCartIcon, StarHalf, StarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import Link from 'next/link'
import AddToCart from '@/app/_components/AddToCart/AddToCart'


export default async function SubCategory({ params }: { params: Promise<{ categoryId: string }> }) {


    const { categoryId } = await params;

    try {

        const productsRequest = fetch(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`, { cache: 'no-store' });
        const categoryRequest = fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, { cache: 'no-store' });


        const [productsRes, categoryRes] = await Promise.all([productsRequest, categoryRequest]);

        const { data: products } = await productsRes.json();
        const { data: categoryInfo } = await categoryRes.json();

        return (
            <>
<div className="px-7 pt-10 ">
              <div className="text-left  mb-8 ">
                            <h2 className='font-extrabold text-2xl'>{categoryInfo ? categoryInfo.name : 'Category'}</h2>
                            <p className='text-gray-400'>Products in this category</p>
                        </div>
    
                {products && products.length > 0 ? (
                    <div className=" ">
                      
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 ">

                            {products.map((product: any) => (
                                (<div key={product._id} className="max-w-87.5 mx-auto sm:max-w-none ">
                                    <Card className="overflow-hidden p-2 ">
                                        <Link href={'/products/' + product._id}>
                                            <div className='w-full aspect-square '>
                                                <Image src={product.imageCover} alt={product.title} width={200} height={150} className="relative z-20  w-full object-contain p-3 " />
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
                                                            }

                                                            else if (product.ratingsAverage >= star - 0.5) {
                                                                return <StarHalf key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                            }

                                                            else {
                                                                return <StarIcon key={star} className="w-4 h-4 text-gray-300" />
                                                            }
                                                        })}
                                                    </div>
                                                    <p className='ms-2'>({product.ratingsQuantity})</p>
                                                </div>
                                                <p>{product.price} EGP</p>
                                            </CardContent>
                                        </Link>
                                        <AddToCart productId={product._id} />
                                    </Card>
                                </div>)
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col justify-start items-center h-60 text-center mx-auto my-auto">
                        <h2 className='text-2xl font-bold mb-8'>{categoryInfo?.name}</h2>
                        <p className="text-gray-500 text-lg border p-5 mt-3 rounded bg-gray-50">
                            No products found in this category.
                        </p>
                    </div>
                )}</div>
            </>
        )
    } catch (error) {
        console.error(error);
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Something went wrong!</h2>
                <p className="text-gray-600 mb-4">We couldn't load the products. Please check your internet connection.</p>
            </div>
        )
    }
}
