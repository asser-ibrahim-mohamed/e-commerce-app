'use client'

import { useQuery } from '@tanstack/react-query'
import React from 'react'
import getUserOrders from '@/service/orders/get-user-orders'
import { Order, OrderItem } from '@/Interfaces/OrderInterfaces'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PackageCheck, CreditCard, CalendarDays } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export default function AllOrders() {
    const { data: orders, isLoading, isError } = useQuery<Order[]>({
        queryKey: ['get-user-orders'],
        queryFn: getUserOrders
    })

    if (isLoading) {
        return <div className="h-screen flex justify-center items-center "><Spinner /></div>
    }

    if (isError) {
        return <div className="p-10 text-center text-red-500">something went is wrong</div>
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="h-[70vh] flex flex-col justify-center items-center gap-4">
                <PackageCheck size={64} className="text-gray-300" />
                <h2 className="text-2xl font-bold">No Orders Yet!</h2>
                <p className="text-gray-500">You haven't placed any orders.</p>
                <Link href="/products">
                    <Button className="mt-4 bg-black text-white">Start Shopping</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto p-6 lg:p-10">
            <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
                <PackageCheck className="text-green-600" />
                My Orders
            </h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <Card key={order._id} className="overflow-hidden border border-gray-200 shadow-sm rounded-2xl">
                        
                        <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                <div>
                                    <CardTitle className="text-lg mb-1 flex items-center gap-2">
                                        Order ID: <span className="text-gray-500 text-sm font-normal">#{order._id}</span>
                                    </CardTitle>
                                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                                        <span className="flex items-center gap-1"><CalendarDays size={16} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><CreditCard size={16} /> {order.paymentMethodType}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-xl font-bold text-black">{order.totalOrderPrice} EGP</p>
                                    <div className="flex gap-2">
                                        {order.isPaid ? (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-0">Paid</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-red-500 border-red-200">Not Paid</Badge>
                                        )}
                                        {order.isDelivered ? (
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0">Delivered</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-orange-500 border-orange-200">Processing</Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {order.cartItems.map((item: OrderItem) => (
                                    <div key={item._id} className="flex gap-4 items-center border border-gray-100 p-3 rounded-xl">
                                        <div className="w-30 h-30 bg-gray-50 rounded-lg shrink-0 p-2">
                                            <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain" />
                                        </div>
                                        <div>
                                            <p className="font-semibold line-clamp-1 text-sm">{item.product.title}</p>
                                            <p className="text-gray-500 text-xs mt-1">Qty: {item.count}</p>
                                            <p className="font-bold text-sm mt-1">{item.price} EGP</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}