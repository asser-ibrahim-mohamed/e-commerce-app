'use server'
import { getCurrentUserId } from "@/app/api/auth/verify-token";
import getAccessToken from "@/schema/access-token";

export default async function getUserOrders() {
  const token = await getAccessToken();

  if (!token) {
    throw new Error('You must be logged in to view orders');
  }

  const userId = await getCurrentUserId();

  if (!userId) {
    throw new Error('Could not identify the user');
  }

  const resp = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!resp.ok) {
    throw new Error('Failed to fetch orders');
  }

  const payload = await resp.json();
  
  return Array.isArray(payload) ? payload : (payload.data || []); 
}