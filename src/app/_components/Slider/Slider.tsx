'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import Autoplay from "embla-carousel-autoplay";
import {
    Card, CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';


export default function Slider({ images, title }: { images: string[], title: string }) {

    return <>

        <div className="">
            <Carousel opts={{
                align: "start",
                loop: true,
            }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                    }),
                ]}
            >
                <CarouselContent >
                    {images.map((img,index) => <CarouselItem key={index}>  <Image src={img} alt={title} width={400} height={300} className='w-full'></Image></CarouselItem>)}

                </CarouselContent>
              
            </Carousel>

        </div>
    </>
}
