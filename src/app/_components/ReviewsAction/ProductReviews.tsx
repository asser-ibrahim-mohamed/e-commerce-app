'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { StarIcon, UserCircle2 } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import ReviewActions from './ReviewActions'

async function fetchProductReviews(productId: string) {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
    cache: 'no-store' 
  })
  const payload = await res.json()
  return payload.data || []
}


export default function ProductReviews({ productId, currentUserId }: { productId: string, currentUserId: string | null }) {

  const { data: reviews, isLoading } = useQuery({
    queryKey: ['get-product-reviews', productId],
    queryFn: () => fetchProductReviews(productId)
  })

  if (isLoading) return <div className="text-gray-500 mt-5">Loading reviews...</div>
  if (!reviews || reviews.length === 0) return <div className="text-gray-500 mt-5">No reviews yet. Be the first to review!</div>

  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-bold border-b pb-2">Customer Reviews</h3>
      <div className="flex flex-col gap-3">
        {reviews.map((review: any) => {
          const reviewOwnerId = review.user?._id || review.user?.id || review.user;

          return (
            <Card key={review._id} className="p-4 shadow-sm border-gray-100">
              <CardContent className="p-0 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="w-8 h-8 text-gray-400" />
                  <div>
                    <p className="font-semibold text-sm">{review.user?.name || 'User'}</p>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          className={`w-3 h-3 ${review.rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mt-1">{review.review}</p>
                
              
                {currentUserId === reviewOwnerId && (
                  <ReviewActions 
                    reviewId={review._id} 
                    currentText={review.review} 
                    currentRating={review.rating} 
                    productId={productId}  
                  />
                )}
                
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}