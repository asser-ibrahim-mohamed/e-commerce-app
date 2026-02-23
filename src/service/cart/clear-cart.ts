'use server'
import getAccessToken from "@/schema/access-token";

export default  async function clearCart() {
  const token = await getAccessToken()
    if(!token){
        throw new Error('unauthorized...')
    }
const resp = await fetch(`${process.env.API}/cart/`,{
    cache:'no-store',
    method:'DELETE',
    headers:{
        token:token,
        'content-type':'application/json'
    },
  

})
const payload =await resp.json()
console.log(payload);
return payload;
}
