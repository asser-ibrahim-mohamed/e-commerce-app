'use server'

import getAccessToken from "@/schema/access-token";

const API = process.env.API;

export async function addToCart(productId: string) {
  const token = await getAccessToken();
  if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

  try {
    const resp = await fetch(`${API}/cart`, {
      method: 'POST',
      headers: { 'token': token, 'content-type': 'application/json' },
      body: JSON.stringify({ productId })
    });
    return await resp.json();
  } catch {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}

export async function deleteCartItem(productId: string) {
  const token = await getAccessToken();
  if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

  try {
    const resp = await fetch(`${API}/cart/${productId}`, {
      method: 'DELETE',
      headers: { 'token': token }
    });
    return await resp.json();
  } catch {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}

export async function clearCart() {
  const token = await getAccessToken();
  if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

  try {
    const resp = await fetch(`${API}/cart`, {
      method: 'DELETE',
      headers: { 'token': token }
    });
    return await resp.json();
  } catch {
    return { statusMsg: 'fail', message: 'Server connection failed' };
  }
}