'use server'

export async function forgotPassword(email: string) {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(data.message || 'Failed to send reset code');
  }

  return data;
}