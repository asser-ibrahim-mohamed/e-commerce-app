import getAccessToken from "@/schema/access-token";

export async function removeFromWishlist(productId: string) {
  const token = await getAccessToken();

  if (!token) {
    return { success: false, message: 'Login first' };
  }

  try {
    const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'token': token
      }
    });

    const data = await resp.json();

    if (!resp.ok) {
      return { success: false, message: data.message || 'Failed to remove from wishlist' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, message: 'Server connection failed' };
  }
}