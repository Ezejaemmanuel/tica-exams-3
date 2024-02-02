import { NextRequest, NextResponse } from 'next/server';
import { getPaymentConfirmationFromPrismaOrCache } from './cache';
import { getUserId } from '@/lib/auth/utils';
import { prisma } from '@/lib/db';
import { safeKVOperation } from '@/lib/api/redis/safeKvOperation';
import { kv } from '@vercel/kv';
import { RegistrationStatus, setRegistrationStatus } from '@/lib/api/redis/registeration-status';
import { StatusType, StatusValue, setGenericStatus } from '@/lib/api/redis/genericStatus';
// pages/api/get-payment-confirmation.ts


export async function GET(req: NextRequest, res: NextResponse) {
    console.log('Received GET request for payment confirmation');
    const userId = getUserId();

    if (!userId) {
        console.log('Error: User ID is required');
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        console.log(`Retrieving payment confirmation for user ID: ${userId}`);
        const paymentConfirmation = await getPaymentConfirmationFromPrismaOrCache(userId);

        if (!paymentConfirmation) {
            console.log(`Payment confirmation not found for user ID: ${userId}`);
            return NextResponse.json({ error: 'Payment confirmation not found.' }, { status: 404 });
        }

        console.log(`Payment confirmation retrieved successfully for user ID: ${userId}`);
        return NextResponse.json(paymentConfirmation);
    } catch (error) {
        console.error('Request error', error);
        return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
}



// pages/api/make-payments.ts


interface PaymentConfirmationData {
    paymentUrl: string;
}

// pages/api/make-payments.ts


interface PaymentConfirmationData {
    imageUrl: string;
}

export async function POST(req: NextRequest, res: NextResponse) {
    console.log('Received POST request to make payment');
    const authId = getUserId();
    const examId = req.nextUrl.searchParams.get("examId");

    if (!authId || !examId) {
        console.log('Error: User is not authenticated or there is no exam ID');
        return NextResponse.json({ error: 'User is not authenticated or there is no exam ID' }, { status: 401 });
    }

    const { imageUrl }: PaymentConfirmationData = await req.json();

    if (!imageUrl) {
        console.log('Error: Payment URL is required');
        return NextResponse.json({ error: 'Payment URL is required.' }, { status: 400 });
    }

    try {
        console.log(`Creating payment confirmation for user ID: ${authId} and exam ID: ${examId}`);
        const paymentConfirmation = await prisma.paymentConfirmation.upsert({
            where: {
                userId: authId,
            },
            update: {
                paymentUrl: imageUrl,
                // Other fields that you want to update, if any.
            },
            create: {
                paymentUrl: imageUrl,
                paymentConfirmed: false, // Default value is set to false
                userId: authId,
                examId: examId // Associate the payment confirmation with the authenticated user
            },
        });
        setRegistrationStatus(authId, RegistrationStatus.PaymentNotConfirmed);
        setGenericStatus(StatusType.NewPayments, StatusValue.True);

        console.log(`Payment confirmation submitted successfully for user ID: ${authId}`);
        return NextResponse.json({ message: 'Payment confirmation submitted successfully.', paymentConfirmation });
    } catch (error) {
        console.error('Request error', error);
        return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
}

// You need to export the config to allow the API route to use the new handlers
// Add the necessary config export if required by your application

// pages/api/update-payment-confirmation/[userId].ts


// pages/api/update-payment-confirmation/[userId].ts


export async function PUT(req: NextRequest, res: NextResponse) {
    console.log('Received PUT request to update payment confirmation');
    const userId = getUserId();
    if (!userId) {
        console.log('Error: User ID is required.');
        return NextResponse.json({ error: 'User ID is required.' }, { status: 400 });
    }

    try {
        console.log(`Updating payment confirmation for user ID: ${userId}`);
        await prisma.$transaction(async (prisma) => {
            const paymentConfirmation = await prisma.paymentConfirmation.update({
                where: { userId },
                data: {
                    paymentConfirmed: true,
                },
            });
            await prisma.userExam.create({
                data: {
                    id: userId, // Generate a unique ID for the UserExam
                    userId: userId, // Set the userId to the ID of the newly created user
                    examId: paymentConfirmation.examId, // Set the examId to the examId from paymentConfirmation
                    // You can set other fields as needed
                },
            });

        });

        console.log(`Payment confirmation updated successfully for user ID: ${userId}`);
        return NextResponse.json({ message: 'Payment confirmation updated successfully.' });
    } catch (error) {
        console.error('Request error', error);
        return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
}



// You need to export the config to allow the API route to use the new handlers


// You need to export the config to allow the API route to use the new handlers
