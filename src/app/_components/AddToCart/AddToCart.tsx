'use client'

import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Heart, Loader2, ShoppingCartIcon } from 'lucide-react'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addToCart } from '@/service/cart/add-product-cart'
import { addToWishlist } from '@/service/wishlist/add-to-wishlist'
import { getWishlist } from '@/service/wishlist/get-wishlist'
import { removeFromWishlist } from '@/service/cart/remove-from-wishlist'
import { ProductsData } from '@/Interfaces/ProductInterface'

interface AddToCartProps {
  productId: string;
  wishlistData?: any; 
}

export default function AddToCart({ productId, wishlistData: wishlistDataProp }: AddToCartProps) {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { data: internalWishlistData } = useQuery({
    queryKey: ['get-wishlist'],
    queryFn: getWishlist,
    enabled: !wishlistDataProp, 
  })

  const getWishlistArray = () => {
    const rawData = wishlistDataProp || internalWishlistData;
    if (Array.isArray(rawData)) return rawData;
    if (rawData?.success && Array.isArray(rawData.data)) return rawData.data;
    if (Array.isArray(rawData?.data)) return rawData.data;
    return [];
  };

  const currentWishlist = getWishlistArray();
  
  const isHeartFilled = currentWishlist.some((item: any) => 
    (item._id || item.id || item.product?.id || item.product?._id) === productId
  );

  const { isPending: cartPending, mutate: addProductToCart } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      if (data?.statusMsg === 'fail' || data?.message === 'unauthorized...') {
        toast.error(data?.message === 'unauthorized...' ? 'Login First!' : (data?.message || 'Failed to add product'))
        if (data?.message === 'unauthorized...') router.push('/signin')
        return
      }
      toast.success(data?.message || 'Product added successfully')
      queryClient.invalidateQueries({ queryKey: ['get-cart'] })
    },
    onError: (error: any) => {
      toast.error('Login First!')
      router.push('/signin')
    }
  })

  const { isPending: wishAddPending, mutate: addProductToWishlist } = useMutation({
    mutationFn: addToWishlist,
    onSuccess: (data) => {
      toast.success(data?.message || 'Added to Wishlist')
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => {
      toast.error('Login First to add to wishlist!')
      router.push('/signin')
    }
  })

  const { isPending: wishRemovePending, mutate: removeProductFromWishlist } = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: (data) => {
      toast.success(data?.message || 'Removed from Wishlist')
      queryClient.invalidateQueries({ queryKey: ['get-wishlist'] })
    },
    onError: () => {
      toast.error('Something went wrong!')
    }
  })

  const isWishlistLoading = wishAddPending || wishRemovePending;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (isHeartFilled) {
      removeProductFromWishlist(productId);
    } else {
      addProductToWishlist(productId);
    }
  }

  return (
    <CardFooter className="p-3 lg:p-0">
      <Button 
        onClick={() => addProductToCart(productId)} 
        disabled={cartPending} 
        className='grow rounded-xl'
      >
        {cartPending ? <Loader2 className='animate-spin mr-2 w-4 h-4' /> : <ShoppingCartIcon className='mr-2 w-4 h-4' />}
        Add to cart
      </Button> 
      
      <button 
        onClick={toggleWishlist} 
        disabled={isWishlistLoading}
        type="button"
        className="ms-3 focus:outline-none disabled:opacity-50 transition-transform active:scale-90"
      >
        {isWishlistLoading ? (
          <Loader2 className="animate-spin text-red-500 w-6 h-6" />
        ) : (
          <Heart 
            className={`w-6 h-6 transition-colors duration-200 ${isHeartFilled ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} 
          />
        )}
      </button> 
    </CardFooter>
  )
}