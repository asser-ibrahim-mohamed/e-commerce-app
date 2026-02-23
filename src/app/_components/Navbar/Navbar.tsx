'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, ShoppingCartIcon, User2Icon, UserIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { CartResponse } from '@/Interfaces/CartInterfaces';
export default function Navbar() {
const { data, isLoading ,isError } = useQuery <CartResponse>({
    queryKey:['get-cart'] ,
    queryFn:async()=>{
const resp = await fetch('/api/cart')
const payload = await resp.json()
return payload
    }

  })
  const { status, data: session } = useSession()
  function logOut(){
    signOut({
callbackUrl:'/signin'
    })
  }
  return <>
    <nav className='bg-gray-100  shadow  fixed top-0 w-full z-50 '>
      <div className="container mx-auto row hidden sm:flex items-center sm:justify-between p-1  justify-center ">

        <h1>

          <Link href={'/'} className='shrink-0'>
            <Image
              src="/shop-mart-logo.png"
              alt="ShopMart_Logo"
              width={150}
              height={40}
              priority

              className="h-32 -my-8 w-auto object-contain"
            />
          </Link>
        </h1>
        <div className='mt-2 sm:mt-0' >
          <NavigationMenu>
            <NavigationMenuList className="hidden sm:flex   gap-2 sm:gap-3 items-start sm:items-center">
              <NavigationMenuItem>
                <NavigationMenuLink asChild >
                  <Link href="/products">products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  <Link href="/brands">brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className=''>
                  <Link href="/categories">categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

        </div>
        <div className="grid-cols-1 sm:grid-cols-2 sm:gap-3 hidden sm:grid">
          <div className="mt-4 sm:mt-0 sm:me-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserIcon className='size-6 cursor-pointer' />
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mt-2'>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className='text-center  font-semibold'>HI {session?.user?.name || 'USER'}</DropdownMenuLabel>

                </DropdownMenuGroup>
                  <DropdownMenuSeparator />
    <DropdownMenuGroup>
  <DropdownMenuSeparator />
  
  {status === 'authenticated' ? (
    <>
      <DropdownMenuItem asChild className='cursor-pointer  focus:bg-black focus:text-white'>
        <Link href='/allorders'>All Orders</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className='cursor-pointer text-green-600  focus:bg-green-600 focus:text-white '>
        <Link href='/wishlist'>Your Wishlist</Link>
      </DropdownMenuItem>
      <DropdownMenuItem className='cursor-pointer text-red-600 focus:bg-red-600 focus:text-white font-medium' onClick={logOut}>
        LogOut
      </DropdownMenuItem>
    </>
  ) : (
   
    <>
      <DropdownMenuItem asChild className='cursor-pointer'>
        <Link href='/signin'>Login</Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild className='cursor-pointer'>
        <Link href='/register'>Register</Link>
      </DropdownMenuItem>
    </>
  )}
</DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
         {session?.user?<>
        <div className="pt-4 sm:pt-0 sm:pe-2">
  <Link href={'/cart'} className="relative inline-flex items-center">
    <ShoppingCartIcon />
    <span className="absolute bottom-5 left-5 flex w-5 h-5 justify-center items-center bg-black text-white rounded-full text-xs">
     {data?.numOfCartItems || 0}
    </span>
  </Link>
</div> </> :null}
        </div>
      </div>




      <div className="sm:hidden">
        <div className="flex justify-between">
          <h1>

            <Link href={'/'} className='shrink-0'>
              <Image
                src="/shop-mart-logo.png"
                alt="ShopMart_Logo"
                width={150}
                height={40}
                priority

                className="h-32 -my-8 w-auto object-contain"
              />
            </Link>
          </h1>
          <Sheet >
            <SheetTrigger asChild>
              <button className="p-2 hover:bg-gray-200 rounded-full transition outline-none">
                <Menu className="size-6 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-65 ps-3">
              <SheetHeader className="mb-6 text-left border-b pb-4">
                 {session?.user?<SheetTitle className="text-2xl font-bold">Hi {session.user?.name}</SheetTitle>:<SheetTitle className="text-2xl font-bold">My Account</SheetTitle>}
              </SheetHeader>
              <div className="flex flex-col gap-5">
                <Link href="/products" className="text-lg font-medium hover:text-blue-600 transition-colors">Products</Link>
                <Link href="/brands" className="text-lg font-medium hover:text-blue-600 transition-colors">Brands</Link>
                <Link href="/categories" className="text-lg font-medium hover:text-blue-600 transition-colors">Categories</Link>
                <div className="mt-6 flex flex-col gap-3">
              <div className="mt-6 flex flex-col gap-3">
  {status === 'authenticated' ? (
 
    <>
      <Link href='/allorders' className="cursor-default px-4 py-3 bg-slate-900 hover:bg-slate-950 text-white text-center rounded-lg font-semibold">
        All Orders
      </Link>
      <Link href='/cart' className="cursor-default px-4 py-3 bg-blue-700 hover:bg-blue-900 text-white text-center rounded-lg font-semibold">
       your cart
      </Link>
      <Link href='/wishlist' className="cursor-default px-4 py-3 bg-green-600 text-white  hover:bg-green-700 focus:text-white text-center rounded-lg font-semibold">
        Your Wishlist
      </Link>
      <button onClick={logOut} className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg font-semibold transition">
        LogOut
      </button>
    </>
  ) : (
   
    <>
      <Link href="/signin" className="px-4 py-3 bg-slate-900 text-white text-center rounded-lg font-semibold">
        Login
      </Link>
      <Link href="/register" className="px-4 py-3 border border-slate-300 text-center rounded-lg font-semibold">
        Register
      </Link>
    </>
  )}
</div>

                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>

    </nav>



  </>
}
