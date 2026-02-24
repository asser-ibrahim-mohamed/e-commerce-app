'use server'
import { shippingAddress } from "@/Interfaces/CartInterfaces";
import getAccessToken from "@/schema/access-token";

export async function addToCart(productId:string) {
  const token = await getAccessToken()
  if(!token){
    return { statusMsg: 'fail', message: 'unauthorized...' };
  }
  try {
    const resp = await fetch(`${process.env.API}/cart`,{
        cache:'no-store',
        method:'POST',
        headers:{
            token:token,
            'content-type':'application/json'
        },
        body:JSON.stringify({ productId })
    })
    const payload = await resp.json()
    console.log(payload);
    return payload;
  } catch (error) {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}

export async function checkOutAction(cartId:string, shippingAddress:shippingAddress) {
  const token = await getAccessToken()
  if(!token){
    return { statusMsg: 'fail', message: 'unauthorized...' };
  }
  try {
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        cache:'no-store',
        method:'POST',
        headers:{
            token:token,
            'content-type':'application/json'
        },
        body:JSON.stringify({shippingAddress})
    })
    const data = await resp.json()
    console.log(data);
    return data;
  } catch (error) {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}

export async function createCashOrder(cartId: string, shippingAddress: shippingAddress) {
  const token = await getAccessToken()
  if (!token) {
    return { statusMsg: 'fail', message: 'unauthorized...' };
  }
  try {
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
      cache: 'no-store',
      method: 'POST',
      headers: {
        token: token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ shippingAddress })
    })
    const data = await resp.json()
    return data;
  } catch (error) {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}