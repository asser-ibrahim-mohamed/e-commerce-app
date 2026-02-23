'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation' 
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MessageSquarePlus, Loader2 } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { addReview } from '@/service/reviews/add-review'

export default function AddReviewButton({ productId }: { productId: string }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const reviewInput = useRef<HTMLInputElement>(null)
  const ratingInput = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { isPending, mutate: submitReview } = useMutation({
    mutationFn: ({ rating, text }: { rating: number, text: string }) => addReview(productId, rating, text),
    onSuccess: (data) => {
      
      if (data?.message === 'Login first') {
        toast.error('Login first!')
        setIsOpen(false)
        setTimeout(() => router.push('/signin'), 1000)
        return
      }

      toast.success('Review added successfully!')
      setIsOpen(false)
      queryClient.invalidateQueries({ queryKey: ['get-product-reviews', productId] })
    },
    onError: (error: any) => {
      const errorMsg = error?.message || "";
console.log(errorMsg)

      if (errorMsg.includes('fail') || errorMsg.includes('before')) {
        toast.error('You made a comment before!')
      } else {
        toast.error('Login first!')
      }
    }
  })
  const handleAddReview = () => {
    const text = reviewInput.current?.value || ''
    const rating = Number(ratingInput.current?.value) || 5

    if (!text) {
      toast.error("Please write a review first")
      return
    }
    if (rating < 1 || rating > 5) {
      toast.error("Rating must be between 1 and 5")
      return
    }

    submitReview({ rating, text })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 text-sm mt-2 focus:outline-none">
          <MessageSquarePlus className="w-4 h-4" />
          <span className="underline">Add Review</span>
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
       <DialogHeader>
  <DialogTitle>Write a Review</DialogTitle>
  
  <DialogDescription className="sr-only">
    Share your experience with this product to help others.
  </DialogDescription>
</DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div>
            <Label htmlFor="rating">Rating (1 to 5)</Label>
            <Input className='mt-2' ref={ratingInput} id="rating" type="number" min="1" max="5" defaultValue={5} />
          </div>
          <div>
            <Label htmlFor="review">Your Review</Label>
            <Input className='mt-2' ref={reviewInput} id="review" placeholder="What do you think about this product?" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleAddReview} disabled={isPending}>
            {isPending ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}