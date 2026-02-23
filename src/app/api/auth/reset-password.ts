'use server'

export async function resetPassword(email: string, newPassword: string) {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, newPassword })
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(data.message || 'Failed to reset password');
  }

  return data;
}