'use server'
import getAccessToken from "@/schema/access-token";

export async function getWishlist() {
  try {
    const token = await getAccessToken();

   
    if (!token) {
      return { success: false, message: 'Login first' };
    }

    const resp = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
      method: 'GET',
      cache: 'no-store',
      headers: {
        'token': token
      }
    });

    const payload = await resp.json();

    if (!resp.ok) {
      return { success: false, message: payload.message || 'Failed to fetch' };
    }

    
    return { success: true, data: payload.data || [] };
  } catch (error) {
    return { success: false, message: 'Server Error' };
  }
}