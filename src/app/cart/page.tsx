'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import Loading from '../loading'
import { CartResponse, CartItem } from '@/Interfaces/CartInterfaces'
import deleteCartItem from '@/service/cart/delete-cart-items'
import toast from 'react-hot-toast'
import updateCartItem from '@/service/cart/update-cart-items'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import clearCart from '@/service/cart/clear-cart'
import Link from 'next/link'
import CheckOutSession from '@/app/_components/CeckOutSession/CheckOutSession'

export default function Cart() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery<CartResponse & { message?: string }>({
    queryKey: ['get-cart'],
    queryFn: async () => {
      const resp = await fetch('/api/cart')
      const payload = await resp.json()
      
      // التحقق مما إذا كان المستخدم يحتاج لتسجيل الدخول
      if (resp.status === 401 || payload.message === 'Login first') {
        return { message: 'Login first', data: { products: [] } } as any
      }
      return payload
    }
  })

  // دالات الـ Mutation كما هي...
  const { mutate: delCartItem, isPending: deleteLoading } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      toast.success('Product deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => toast.error('Something went wrong')
  })

  const { mutate: updateCart, isPending: updateLoading } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success('Cart updated')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => toast.error('Something went wrong')
  })

  const { mutate: removeCart, isPending: clearLoading } = useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success('Cart cleared')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: () => toast.error('Something went wrong')
  })

  function handleUpdate(productId: string, count: number) {
    if (count < 1) return;
    updateCart({ productId, count })
  }

  if (isLoading) return <Loading />;

  if (data?.message === 'Login first') {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-y-4">
          <div className="flex justify-center items-center text-center bg-black p-5 rounded-2xl text-white">
            <h2 className="text-xl">Login first to view your cart</h2>
          </div>
          <Link href='/signin'>
            <Button className='text-center bg-green-600 hover:bg-green-800 px-12 rounded-xl'>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (isError) return <div className="p-10 text-center text-red-500">There is an error!</div>;

  return (
    <div className="p-10">
      {(data?.numOfCartItems || 0) > 0 ? (
        <>
          <div className="text-left mb-8">
            <h2 className='font-extrabold text-2xl'>Shopping Cart</h2>
            <p className='text-gray-400'>{data?.numOfCartItems} items in your cart</p>
          </div>
          <div className="flex gap-6 flex-col-reverse lg:flex-row">
            <div className="w-full lg:w-3/4">
              <div className="relative overflow-x-auto bg-white shadow-sm border rounded-3xl p-2">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-700 bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">Image</th>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Qty</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.products.map((prod: CartItem) => (
                      <tr key={prod._id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <img src={prod.product.imageCover} className="w-16 md:w-24 object-contain" alt={prod.product.title} />
                        </td>
                        <td className="px-6 py-4 font-semibold">{prod.product.title}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button 
                              disabled={updateLoading || prod.count <= 1}
                              onClick={() => handleUpdate(prod.product._id, prod.count - 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 disabled:opacity-50"
                            >-</button>
                            <span className="w-8 text-center">{prod.count}</span>
                            <button 
                              disabled={updateLoading}
                              onClick={() => handleUpdate(prod.product._id, prod.count + 1)}
                              className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 disabled:opacity-50"
                            >+</button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold">{prod.price} EGP</td>
                        <td className="px-6 py-4">
                          <button 
                            disabled={deleteLoading}
                            onClick={() => delCartItem(prod.product._id)}
                            className="text-red-600 hover:underline disabled:opacity-50"
                          >
                            {deleteLoading ? 'Removing...' : 'Remove'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-1/4 w-full">
              <div className="border-2 rounded-2xl p-4 bg-white shadow-sm">
                <h2 className="font-bold text-xl mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal ({data?.numOfCartItems} items)</span>
                  <span className="font-semibold">{data?.data?.totalCartPrice} EGP</span>
                </div>
                <div className="flex justify-between border-b pb-4 mb-4">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>Total</span>
                  <span>{data?.data?.totalCartPrice} EGP</span>
                </div>
                <Link href='/products'>
                  <Button variant="outline" className="w-full mb-3 rounded-xl">Continue Shopping</Button>
                </Link>
                <CheckOutSession cartId={data?.cartId || data?.data?._id || ''} />
                <Button 
                  onClick={() => removeCart()} 
                  disabled={clearLoading}
                  className="bg-red-600 hover:bg-red-700 text-white w-full mt-4 rounded-xl flex items-center justify-center gap-2"
                >
                  <Trash2 size={18} /> {clearLoading ? 'Clearing...' : 'Clear Cart'}
                </Button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center gap-4">
          <div className="bg-black text-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold">Your Cart Is Empty</h2>
          </div>
          <Link href='/products'>
            <Button className='bg-green-600 hover:bg-green-700 px-10 py-2 rounded-xl text-lg'>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  )
}