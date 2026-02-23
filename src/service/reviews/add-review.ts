'use server'
import getAccessToken from "@/schema/access-token";

export async function addReview(productId: string, rating: number, reviewText: string) {
  const token = await getAccessToken();

  
  if (!token) {
    return { success: false, message: 'Login first' };
  }

  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      review: reviewText,
      rating: rating
    })
  });

  const data = await resp.json();

  if (!resp.ok) {
    let errorMessage = data.errors?.msg || data.message;
    if (errorMessage === 'fail' || !errorMessage) {
      errorMessage = 'You made a comment before';
    }
    return { success: false, message: errorMessage };
  }

  return { success: true, data };
}