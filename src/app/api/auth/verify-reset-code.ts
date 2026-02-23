'use server'

export async function verifyResetCode(resetCode: string) {
  const resp = await fetch('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ resetCode })
  });

  const data = await resp.json().catch(() => ({}));

  if (!resp.ok) {
    throw new Error(data.message || 'Invalid or expired reset code');
  }

  return data;
}