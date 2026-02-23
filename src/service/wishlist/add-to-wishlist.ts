'use server'
import getAccessToken from "@/schema/access-token";

export async function addToWishlist(productId: string) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('You must be logged in to add to wishlist');
  }

  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
    method: 'POST',
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: productId
    })
  });

  if (!resp.ok) {
    throw new Error('Failed to add to wishlist');
  }

  return await resp.json();
}