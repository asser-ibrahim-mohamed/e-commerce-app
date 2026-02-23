'use server'
import getAccessToken from "@/schema/access-token";

export async function removeFromWishlist(productId: string) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('You must be logged in to modify wishlist');
  }

  
  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      'token': token
    }
  });

  if (!resp.ok) {
    throw new Error('Failed to remove from wishlist');
  }

  return await resp.json();
}