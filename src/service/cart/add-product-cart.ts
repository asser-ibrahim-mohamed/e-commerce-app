'use server'
import { shippingAddress } from "@/Interfaces/CartInterfaces";
import getAccessToken from "@/schema/access-token";

export   async function addToCart(productId:string) {
  const token = await getAccessToken()
    if(!token){
        throw new Error('unauthorized...')
    }
const resp = await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'POST',
    headers:{
        token:token,
        'content-type':'application/json'
    },
    body:JSON.stringify({
      productId
    })

})
const payload =await resp.json()
console.log(payload);
return payload;
}

export async function checkOutAction(cartId:string, shippingAddress:shippingAddress) {
  const token = await getAccessToken()
    if(!token){
        throw new Error('unauthorized...')
    }
const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
    cache:'no-store',
    method:'POST',
    headers:{
        token:token,
        'content-type':'application/json'
    },
    body:JSON.stringify({shippingAddress})

})
const data =await resp.json()
console.log(data);
return data;
}
export async function createCashOrder(cartId: string, shippingAddress: shippingAddress) {
  const token = await getAccessToken()
  if (!token) {
    throw new Error('unauthorized...')
  }
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
}