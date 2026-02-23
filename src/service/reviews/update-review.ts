'use server'
import getAccessToken from "@/schema/access-token";

export async function updateReview(reviewId: string, rating: number, reviewText: string) {
  const token = await getAccessToken();
  if (!token) throw new Error('You must be logged in');

  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      review: reviewText,
      rating: rating
    })
  });

  if (!resp.ok) throw new Error('Failed to update review');
  return await resp.json();
}