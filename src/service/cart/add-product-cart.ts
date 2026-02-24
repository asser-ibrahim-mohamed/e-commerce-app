'use server'
import { headers } from 'next/headers';
import getAccessToken from "@/schema/access-token";

const API = process.env.API || 'https://ecommerce.routemisr.com/api/v1';

export async function addToCart(productId: string) {
    const token = await getAccessToken();
    if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

    try {
        const resp = await fetch(`${API}/cart`, {
            cache: 'no-store',
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
            cache: 'no-store',
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
            cache: 'no-store',
            method: 'DELETE',
            headers: { 'token': token }
        });
        return await resp.json();
    } catch {
        return { statusMsg: 'fail', message: 'Server connection failed' };
    }
}

export async function checkOutAction(cartId: string, shippingAddress: any) {
    const token = await getAccessToken();
    if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

    const host = (await headers()).get('origin');

    try {
        const resp = await fetch(`${API}/orders/checkout-session/${cartId}?url=${host}`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                token: token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ shippingAddress })
        });
        return await resp.json();
    } catch {
        return { statusMsg: 'fail', message: 'Server connection failed' };
    }
}

export async function createCashOrder(cartId: string, shippingAddress: any) {
    const token = await getAccessToken();
    if (!token) return { statusMsg: 'fail', message: 'unauthorized...' };

    try {
        const resp = await fetch(`${API}/orders/${cartId}`, {
            cache: 'no-store',
            method: 'POST',
            headers: {
                token: token,
                'content-type': 'application/json'
            },
            body: JSON.stringify({ shippingAddress })
        });
        return await resp.json();
    } catch {
        return { statusMsg: 'fail', message: 'Server connection failed' };
    }
}