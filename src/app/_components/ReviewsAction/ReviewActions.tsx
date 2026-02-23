'use client'

import React, { useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Trash2, Edit, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteReview } from '@/service/reviews/delete-review'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateReview } from '@/service/reviews/update-review'


export default function ReviewActions({ reviewId, currentText, currentRating, productId }: { reviewId: string, currentText: string, currentRating: number, productId: string }) {
  const queryClient = useQueryClient()
  const reviewInput = useRef<HTMLInputElement>(null)
  const ratingInput = useRef<HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)

 
  const { isPending: isDeleting, mutate: removeReview } = useMutation({
    mutationFn: () => deleteReview(reviewId),
    onSuccess: () => {
      toast.success('Review deleted successfully')
      
      queryClient.invalidateQueries({ queryKey: ['get-product-reviews', productId] }) 
    },
    onError: () => toast.error('Failed to delete review')
  })

  
  const { isPending: isUpdating, mutate: editReview } = useMutation({
    mutationFn: ({ rating, text }: { rating: number, text: string }) => updateReview(reviewId, rating, text),
    onSuccess: () => {
      toast.success('Review updated successfully')
      setIsOpen(false)
     
      queryClient.invalidateQueries({ queryKey: ['get-product-reviews', productId] })
    },
    onError: () => toast.error('Failed to update review')
  })

  const handleUpdate = () => {
    const text = reviewInput.current?.value || ''
    const rating = Number(ratingInput.current?.value) || 5
    if (!text) {
      toast.error("Review text can't be empty")
      return
    }
    editReview({ rating, text })
  }

  return (
    <div className="flex gap-2 items-center mt-2">
   
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">
            <Edit className="w-4 h-4 mr-1" /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Your Review</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div>
              <Label htmlFor="rating">Rating (1 to 5)</Label>
              <Input ref={ratingInput} id="rating" type="number" min="1" max="5" defaultValue={currentRating} />
            </div>
            <div>
              <Label htmlFor="review">Your Review</Label>
              <Input ref={reviewInput} id="review" defaultValue={currentText} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => removeReview()} 
        disabled={isDeleting}
        className="text-red-600 border-red-200 hover:bg-red-50"
      >
        {isDeleting ? <Loader2 className="animate-spin w-4 h-4" /> : <Trash2 className="w-4 h-4 mr-1" />} 
        Delete
      </Button>
    </div>
  )
}