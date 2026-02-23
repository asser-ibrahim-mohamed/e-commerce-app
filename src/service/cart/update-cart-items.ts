'use server'
import getAccessToken from "@/schema/access-token";

export default  async function  updateCartItem({productId ,count}:{productId:string ,count:number}) {
  const token = await getAccessToken()
    if(!token){
        throw new Error('unauthorized...')
    }
const resp = await fetch(`${process.env.API}/cart/${productId}`,{
    cache:'no-store',
    method:'PUT',
    headers:{
        token:token,
        'content-type':'application/json'
    },
  body:JSON.stringify({
count:count
  })

})
const payload =await resp.json()
console.log(payload);
return payload;
}
