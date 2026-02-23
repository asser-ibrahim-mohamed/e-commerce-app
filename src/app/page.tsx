'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react";
export default function Home() {
  const {status , data :session} = useSession()
  return (
    <div className="flex  items-center justify-center">
      <main className="flex  w-full max-w-3xl flex-col items-center justify-between py-32 px-10 bg-white dark:bg-black text-center">
        {session?.user?<p className="text-lg font-semibold">Hi {session.user?.name}</p>:null}
       <h1 className="mt-2 text-6xl font-bold">Welcome to ShopMart</h1>
        
        <p className="mt-6 text-gray-600 text-[20px] font-sans ">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="mt-6 flex gap-4 ">
          <Button className="px-10 py-6" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button  variant="outline" className=" border-2   border-black  px-10 py-6" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
