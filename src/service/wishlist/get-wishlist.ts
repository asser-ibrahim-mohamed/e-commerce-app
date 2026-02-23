'use server'
import getAccessToken from "@/schema/access-token";

export async function getWishlist() {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('You must be logged in to view your wishlist');
  }

  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'GET',
    cache: 'no-store',
    headers: {
      'token': token
    }
  });

  if (!resp.ok) {
    throw new Error('Failed to fetch wishlist');
  }

  const payload = await resp.json();
  
  return payload.data || []; 
}