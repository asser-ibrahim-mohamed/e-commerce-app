'use server'
import getAccessToken from "@/schema/access-token";

export async function getCurrentUserId() {
  const token = await getAccessToken();
  if (!token) return null;

  try {
  
    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyToken', {
      method: 'GET',
      headers: {
        'token': token
      },
      cache: 'no-store'
    });

    if (!resp.ok) return null;

    const data = await resp.json();
    
    
    return data.decoded?.id || data.decoded?._id || null;
    
  } catch (error) {
    console.error("Error verifying token from API", error);
    return null;
  }
}