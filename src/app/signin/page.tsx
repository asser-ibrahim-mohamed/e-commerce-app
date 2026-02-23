'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { schemaLogin } from '@/schema/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"
import Link from "next/link"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { Loader2Icon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function Signin() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schemaLogin),
    mode: 'onBlur',
  })
  
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0); 
  const searchParams = useSearchParams();
  const redirectURL = searchParams.get('url')

  async function submitForm(values: zod.infer<typeof schemaLogin>) {
    setIsLoading(true);
    setErrorMsg('');
    
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: redirectURL ? redirectURL : '/',
      redirect: false
    })

    if (response?.ok) {
      toast.success('Success Login')
      window.location.href = response.url || '/'
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setErrorMsg('Incorrect password. Forget it? Click the link below');
      } else {
        toast.error('Incorrect email or password');
      }
    }
    setIsLoading(false)
  }

  return <>
    <div className="flex flex-col justify-center items-center sm:pt-20">
      <h2 className='text-2xl font-semibold'>Welcome Back !</h2>
      <div className="mx-auto shadow-xl border rounded-xl mt-5 p-7 w-full max-w-md">
        
        {errorMsg && (
          <div className="text-red-600 mb-5 text-center font-medium bg-red-50 p-3 rounded-lg border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={form.handleSubmit(submitForm)}>
          
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
                  <Input type='password'
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

          {attempts >= 2 && (
            <div className="mt-2 text-right">
              <Link href="/forgot-password"  className="text-sm  font-medium text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
          )}
   
          <div className="mt-5">
            <Button disabled={isLoading} type='submit' className="grow w-full rounded-xl">
              {isLoading && <Loader2Icon className="animate-spin mr-2" />} Submit
            </Button>
          </div>
          <p className='mt-5 text-sm'>
            If you don't have account, please <Link className='underline font-medium text-blue-600' href={'/register'}>SignUp</Link> Now
          </p>
        </form>
      </div>
    </div>
  </>
}