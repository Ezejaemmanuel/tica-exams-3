import { kv } from '@vercel/kv';
import { safeKVOperation } from '@/lib/api/redis/safeKvOperation';
import { prisma } from '@/lib/db';
import { PaymentConfirmation } from '@prisma/client';

type PaymentConfirmationCacheData = PaymentConfirmation | null;

export async function getPaymentConfirmationFromPrismaOrCache(userId: string) {
    // console.log(`Attempting to retrieve payment confirmation for user ID: ${userId}`);
    // const cacheKey = `tica:paymentConfirmation:${userId}`;
    // let paymentConfirmation: PaymentConfirmationCacheData = await safeKVOperation(() => kv.get<PaymentConfirmationCacheData>(cacheKey));

    // if (!paymentConfirmation) {
    // console.log(`Payment confirmation not found in cache for user ID: ${userId}, querying database`);
    const paymentConfirmation = await prisma.paymentConfirmation.findUnique({
        where: { userId },
    });


    return paymentConfirmation;
}

// export async function deletePaymentConfirmationCache(userId: string) {
//     console.log(`Deleting payment confirmation cache for user ID: ${userId}`);
//     const cacheKey = `paymentConfirmation:${userId}`;
//     return safeKVOperation(() => kv.del(cacheKey));
// }
