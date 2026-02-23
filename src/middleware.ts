import { getToken } from 'next-auth/jwt'

import { NextRequest, NextResponse } from 'next/server'


const protectedRoute=['/cart','/wishlist']

const authRoutes =['login', 'register']

export default async function proxy(req:NextRequest) {

    const token = await getToken({req})

if (protectedRoute.includes(req.nextUrl.pathname)){

    if(token){

        return NextResponse.next()

    }else{

        const redirectURL =new URL("/signin",process.env.BASE_URL)

        redirectURL.searchParams.set('url',req.nextUrl.pathname)

        return NextResponse.redirect(redirectURL)

    }

}

if (authRoutes.includes(req.nextUrl.pathname)){

    if(token){

          const redirectURL =new URL("/",process.env.BASE_URL)

   

        return NextResponse.redirect(redirectURL)

       

    }else{

        return NextResponse.next()

     

    }

   

}

}

