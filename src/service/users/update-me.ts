'use server'
import getAccessToken from "@/schema/access-token";

export async function updateMe(name: string, email: string, phone: string) {
  const token = await getAccessToken();
  if (!token) throw new Error('You must be logged in');

  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe/', {
    method: 'PUT',
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, phone })
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(data.message || data.errors?.msg || 'Failed to update user data');
  }

  return data;
}