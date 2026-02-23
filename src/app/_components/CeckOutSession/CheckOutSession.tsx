'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel, FieldContent } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { checkOutAction, createCashOrder } from '@/service/cart/add-product-cart'
import { Loader2Icon } from 'lucide-react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from "zod"
import toast from 'react-hot-toast'

export const schemaCheckout = z.object({
  city: z.string().min(1, "City is required"),
  details: z.string().min(5, "Address details are too short"),
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
  paymentMethod: z.string()
})

export default function CheckOutSession({ cartId }: { cartId: string }) {
  const [isLoading, setIsLoading] = useState(false)

const form = useForm({
    resolver: zodResolver(schemaCheckout),
    defaultValues: {
      city: 'Cairo',
      details: 'Maadi',
      phone: '01123689116',
      paymentMethod: 'cash'
    }
  })

  async function Checkout(values: z.infer<typeof schemaCheckout>) {
    setIsLoading(true)
    try {
      const shippingAddress = {
        city: values.city,
        details: values.details,
        phone: values.phone
      }

      if (values.paymentMethod === 'online') {
        const response = await checkOutAction(cartId, shippingAddress)
        if (response.status === 'success') {
          window.location.href = response.session.url
        }
      } else if (values.paymentMethod === 'cash') {
        const cashResponse = await createCashOrder(cartId, shippingAddress)
        if (cashResponse.status === 'success' || cashResponse.message === 'success') {
          toast.success('order will be deliver soon')
          window.location.href = '/allorders'
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'there is an error ,please try again latter ')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='w-full'>Proceed to Checkout</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Shipping Address</DialogTitle>
            <DialogDescription>
              Add a shipping address for your deliveries.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(Checkout)} className="space-y-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="city">City</FieldLabel>
                  <Input {...field} id="city" placeholder="e.g. Cairo" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="details">Details</FieldLabel>
                  <Input {...field} id="details" placeholder="e.g. Street, Building" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input {...field} id="phone" placeholder="01xxxxxxxxx" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="paymentMethod"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="responsive" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="payment-method">Payment Method</FieldLabel>
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </FieldContent>
                  
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value} 
                    value={field.value}
                  >
                    <SelectTrigger id="payment-method" aria-invalid={fieldState.invalid} className="w-full mt-2">
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent position="item-aligned">
                      <SelectItem value="cash">Cash on Delivery</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={isLoading} type="submit">
                {isLoading && <Loader2Icon className='animate-spin mr-2' />}
                Checkout
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}