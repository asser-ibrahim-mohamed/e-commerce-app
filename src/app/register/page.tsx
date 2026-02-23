'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schema } from '@/schema/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"
import Link from "next/link"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Loader2Icon } from 'lucide-react'

export default function Register() {
  const form = useForm({
defaultValues:{
  name:'',
  email:'',
  password:'',
  rePassword:'',
  phone:''
},

resolver:zodResolver(schema),
mode:'onBlur',
  })
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false)

 async function submitForm(values:zod.infer<typeof schema>){
     setIsLoading(true);
     setErrorMsg('');
     console.log(values);

    try {
      
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })

      if (response?.ok){
        toast.success('Account is created')
       
        window.location.href = '/signin'
      }
      else{
        setErrorMsg('This account already exists')
      }
    } catch (error) {
      setErrorMsg('Network error, please try again')
    }
    
    setIsLoading(false)
  }
  
  return <>
    <div className=" flex flex-col  justify-center items-center lg:p-8 ">
      <h2 className='text-2xl font-semibold'>Register now and Join US</h2>
      <div className="mx-auto text-center shadow-xl border rounded-xl lg:w-1/3 mt-5 p-7">
        <form onSubmit={form.handleSubmit(submitForm)} >
          <div className="mt-5">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Name </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Name"
                 
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          <div className="mt-5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                 
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          <div className="mt-5">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password </FieldLabel>
                  <Input  type='password'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Password"
                 
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
   
          <div className="mt-5">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Confirm Password </FieldLabel>
                  <Input type='password'
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                 
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
                 <div className="mt-5">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Phone number"
                 
                  />
                  
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
          <div className="mt-5">

            <Button  disabled={isLoading } type='submit' className="grow w-full rounded-xl" >  {isLoading&& <Loader2Icon className="animate-spin "/>} Submit   </Button>
          </div>
        </form>
      
        {<p className='mt-5 text-red-600'>{errorMsg}</p>}
      </div>


    </div>



  </>
}