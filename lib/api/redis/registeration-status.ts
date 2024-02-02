// lib/setRegistrationStatus.ts

import { kv } from '@vercel/kv';
// lib/registrationStatus.ts

export enum RegistrationStatus {
    NotRegistered = 'not registered',
    Registered = 'registered',
    MadePayment = 'made payment',
    PaymentNotConfirmed = 'payment not confirmed',
    PaymentConfirmed = 'payment confirmed',
}


export async function setRegistrationStatus(userId: string, status: RegistrationStatus): Promise<void> {
    try {
        await kv.set(`tica:registrationStatus:${userId}`, status);
        console.log(`Registration status for user ID ${userId} set to ${status}`);
    } catch (error) {
        console.error(`Error setting registration status for user ID ${userId}:`, error);
        throw new Error('Failed to set registration status');
    }
}
