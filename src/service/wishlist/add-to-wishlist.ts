'use server'
import getAccessToken from "@/schema/access-token";

export async function addToWishlist(productId: string) {
  const token = await getAccessToken();

  if (!token) {
    return { success: false, message: 'Login first' };
  }

  try {
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

    const data = await resp.json();

    if (!resp.ok) {
      return { success: false, message: data.message || 'Failed to add to wishlist' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: 'Server connection failed' };
  }
}