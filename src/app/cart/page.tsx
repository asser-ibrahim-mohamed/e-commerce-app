'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Loading from '../loading'
import { CartResponse, CartItem } from '@/Interfaces/CartInterfaces'


import deleteCartItem from '@/service/cart/delete-cart-items'
import toast from 'react-hot-toast'
import updateCartItem from '@/service/cart/update-cart-items'
import { Button } from '@/components/ui/button'
import {  Trash2 } from 'lucide-react'
import clearCart from '@/service/cart/clear-cart'
import Link from 'next/link'
import CheckOutSession from '@/app/_components/CeckOutSession/CheckOutSession'

export default function Cart() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<CartResponse>({
    queryKey: ['get-cart'],
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      return payload
    }
  })

  // Delete item
  const { mutate: delCartItem, isPending: deleteLoading } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success('Product deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => {
      toast.error('There is something wrong')
    }
  })


  // Update cart item
  const { mutate: updateCart, isPending: updateLoading } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success('Cart updated')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => {
      toast.error('There is something wrong')
    }
  })
  //clear cart
  const { mutate: removeCart, isPending: clearLoading } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('the cart is cleared ')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => {
      toast.error('There is something wrong')
    }
  })

  function handleUpdate(productId: string, count: number) {
    if (count < 1) return;
    updateCart({ productId, count })
  }

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div className="p-10 text-center text-red-500">حدث خطأ أثناء تحميل السلة!</div>;
  }

  return (
    <div className="p-10 ">
      {(data?.numOfCartItems || 0) > 0 ? (
        <>
          <div className="text-left mb-8">
            <h2 className='font-extrabold text-2xl'>Shopping Cart</h2>
            <p className='text-gray-400'>{data?.numOfCartItems} items in your cart</p>
          </div>
          <div className="flex gap-6 flex-col-reverse lg:flex-row ">
            <div className="w-full lg:w-3/4">
              <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border rounded-3xl border-default p-1 lg:p-2">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                  <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                    <tr>
                      <th scope="col" className="px-16 py-3"><span className="sr-only">Image</span></th>
                      <th scope="col" className="px-6 py-3 font-medium">Product</th>
                      <th scope="col" className="px-6 py-3 font-medium">Qty</th>
                      <th scope="col" className="px-6 py-3 font-medium">Price</th>
                      <th scope="col" className="px-6 py-3 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.products.map((prod: CartItem) => {
                      return (
                        <tr key={prod._id} className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium">
                          <td className="p-4">
                            <img src={prod.product.imageCover} className="w-16 md:w-24 max-w-full max-h-full" alt={prod.product.title} />
                          </td>
                          <td className="px-6 py-4 font-semibold text-heading">
                            {prod.product.title}
                          </td>
                          <td className="px-6 py-4">
                            <form className="max-w-xs mx-auto">
                              <label htmlFor={`counter-${prod._id}`} className="sr-only">Choose quantity:</label>
                              <div className="relative flex items-center">

                                <button
                                  disabled={updateLoading || prod.count <= 1}
                                  onClick={() => handleUpdate(prod.product._id, prod.count - 1)}
                                  type="button"
                                  className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border hover:border-3 cursor-pointer border border-default-medium hover:bg-neutral-tertiary-medium rounded-full text-sm focus:outline-none h-6 w-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-3 h-3 text-heading" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" /></svg>
                                </button>

                                <input type="text" id={`counter-${prod._id}`} className="shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-10 text-center" value={prod.count} readOnly />


                                <button
                                  disabled={updateLoading}
                                  onClick={() => handleUpdate(prod.product._id, prod.count + 1)}
                                  type="button"
                                  className="flex items-center justify-center text-body bg-neutral-secondary-medium hover:border-3 cursor-pointer box-border border border-default-medium hover:bg-neutral-tertiary-medium rounded-full text-sm focus:outline-none h-6 w-6 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg className="w-3 h-3 text-heading" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-7 7V5" /></svg>
                                </button>
                              </div>
                            </form>
                          </td>
                          <td className="px-6 py-4 font-semibold text-heading">
                            {prod.price} EGP
                          </td>
                          <td className="px-6 py-4">

                            <button
                              disabled={deleteLoading}
                              onClick={() => delCartItem(prod.product._id)}
                              className="font-medium text-red-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleteLoading ? 'Removing...' : 'Remove'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>


            <div className="lg:w-1/4 w-full ">
              <div className="flex flex-col">
                <div className="border-2 rounded-2xl  p-2  h-fit">
                  <div className="border-b pb-4">
                    <h2 className="font-bold mb-3">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                      <div className="  sm::flex">
                        <p>Subtotal</p>
                        <p className='text-gray-400 sm:ms-2 text-sm mt-0.5'>({data?.numOfCartItems} items)</p>
                      </div>

                      <span className='font-semibold'>{data?.data?.totalCartPrice || 0} EGP</span>
                    </div>
                    <div className="flex justify-between">
                      <p>Shipping</p>
                      <span className='font-semibold text-green-600'>Free</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-bold text-lg">Total</h3>
                      <span className='font-bold text-lg'>{data?.data?.totalCartPrice || 0} EGP</span>
                    </div>
                      <Link href='/products'> 
                    <Button variant="outline" className="border border-gray-200 w-full mb-2">
                      Continue Shopping
                    </Button> </Link>
                <CheckOutSession cartId={data?.cartId|| data?.data?._id  || ''} />
                  </div>
                </div>
                <div className="justify-end flex ">     <Button onClick={() => {
                  removeCart()
                }} className='bg-red-600 text-center text-white w-1/4 lg:w-1/3 mt-2 rounded-2xl '> <Trash2></Trash2> clear
                </Button></div>


              </div>
            </div>


          </div>
        </>
      ) : (<>
     
        <h1 className='text-3xl font-bold'>Shooping Cart</h1>
        <div className="h-screen flex justify-center items-center">
          
          <div className="flex justify-center items-center flex-col gap-y-2" >
            <div className="flex justify-center  items-center text-center bg-black p-5 rounded-2xl text-white">
              <h2 className="text-xl">Your Cart Is Empty</h2>
            </div>
            <Link href='/products'>   <Button className='text-center bg-green-600 hover:bg-green-800' >Add ones</Button></Link>
          
          </div>

        </div>

       </>)}
    </div>
  )
}