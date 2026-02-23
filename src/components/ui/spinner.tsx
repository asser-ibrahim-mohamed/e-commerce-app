import { Loader, Loader2Icon, LoaderIcon, LoaderPinwheelIcon } from "lucide-react"
import Image from 'next/image';


function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center h-120 gap-1">
      <h1><Image
              src="/shop-mart-logo.png"
              alt="ShopMart_Logo"
              width={150}
              height={40}
              priority

              className="h-40 -my-8 w-auto object-contain"
            /></h1>
 <LoaderPinwheelIcon
      role="status"
      aria-label="Loading"
      className="size-20 animate-spin"/>
     <div className="flex items-end mt-4 text-xl font-semibold text-gray-600">
        Loading
      
        <span className="animate-bounce [animation-delay:-0.3s] ml-1">.</span>
       
        <span className="animate-bounce [animation-delay:-0.15s]">.</span>
      
        <span className="animate-bounce">.</span>
      </div>
    </div>
   
  )
}

export { Spinner }
