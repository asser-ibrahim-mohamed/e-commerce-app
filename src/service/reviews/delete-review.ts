'use server'
import getAccessToken from "@/schema/access-token";

export async function deleteReview(reviewId: string) {
  const token = await getAccessToken();
  if (!token) throw new Error('You must be logged in');

  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
    method: 'DELETE',
    headers: {
      'token': token
    }
  });

  if (!resp.ok) {
    throw new Error('Failed to delete review');
  }

 
  return { success: true };
}