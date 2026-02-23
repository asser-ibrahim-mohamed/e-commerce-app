'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from "zod"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { forgotPassword } from '../api/auth/forgot-password'
import { verifyResetCode } from '../api/auth/verify-reset-code'
import { resetPassword } from '../api/auth/reset-password'
import Link from 'next/link'


const schemaEmail = zod.object({
  email: zod.string().email({ message: "Invalid email address" }),
});

const schemaCode = zod.object({
  resetCode: zod.string().min(1, { message: "Reset code is required" }),
});

const schemaPassword = zod.object({
  newPassword: zod.string().min(6, { message: "Must be at least 6 characters" }),
});

export default function ForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userEmail, setUserEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const formEmail = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(schemaEmail),
    mode: 'onBlur',
  });

  const formCode = useForm({
    defaultValues: { resetCode: '' },
    resolver: zodResolver(schemaCode),
    mode: 'onBlur',
  });

  const formPassword = useForm({
    defaultValues: { newPassword: '' },
    resolver: zodResolver(schemaPassword),
    mode: 'onBlur',
  });

  async function handleEmailSubmit(values: zod.infer<typeof schemaEmail>) {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await forgotPassword(values.email);
      setUserEmail(values.email);
      toast.success('Reset code sent to your email');
      setStep(2);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCodeSubmit(values: zod.infer<typeof schemaCode>) {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await verifyResetCode(values.resetCode);
      toast.success('Code verified successfully');
      setStep(3);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePasswordSubmit(values: zod.infer<typeof schemaPassword>) {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await resetPassword(userEmail, values.newPassword);
      toast.success('Password reset successfully');
      router.push('/signin');
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return <>
    <div className="flex flex-col  justify-center items-center sm:pt-20">
      <h2 className='text-2xl font-semibold'>
        {step === 1 && 'Forgot Password'}
        {step === 2 && 'Verify Reset Code'}
        {step === 3 && 'Create New Password'}
      </h2>
      <div className="mx-auto shadow-xl border rounded-xl mt-5 p-7 w-full max-w-md">
        {errorMsg && (
          <div className="text-red-600 flex flex-col mb-5 text-center font-medium">
            {errorMsg}
             <p className='mt-2 text-sm text-slate-700'>
            If you don't have account, please <Link className='underline font-medium text-blue-600' href={'/register'}>SignUp</Link> Now
          </p>
          </div>
        )}

        {step === 1 && (
          <form onSubmit={formEmail.handleSubmit(handleEmailSubmit)}>
            <div className="mt-5">
              <Controller
                name="email"
                control={formEmail.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your Email"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="mt-5">
              <Button disabled={isLoading} type='submit' className="grow w-full rounded-xl">
                {isLoading && <Loader2Icon className="animate-spin mr-2" />} Send Code
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={formCode.handleSubmit(handleCodeSubmit)}>
            <div className="mt-5">
              <Controller
                name="resetCode"
                control={formCode.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Reset Code</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter the code sent to your email"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="mt-5">
              <Button disabled={isLoading} type='submit' className="grow w-full rounded-xl">
                {isLoading && <Loader2Icon className="animate-spin mr-2" />} Verify Code
              </Button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={formPassword.handleSubmit(handlePasswordSubmit)}>
            <div className="mt-5">
              <Controller
                name="newPassword"
                control={formPassword.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter new password"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            <div className="mt-5">
              <Button disabled={isLoading} type='submit' className="grow w-full rounded-xl">
                {isLoading && <Loader2Icon className="animate-spin mr-2" />} Reset Password
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  </>
}