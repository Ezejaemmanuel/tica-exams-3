import { Prisma, PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/db';
import { setRegistrationStatus, RegistrationStatus } from '@/lib/api/redis/registeration-status';
import { checkAuthPermission } from '@/lib/auth/utils';
import { paymentData } from '@/app/admin-dashboard/manual-payment/aside';
// Define the expected request body type


export async function PUT(request: NextRequest) {
    await checkAuthPermission("only_admin_and_superadmin");

    console.log('Received PUT request to confirm payment');

    // Parse the request body to get the payment data
    const paymentData: paymentData = await request.json();
    console.log('Parsed payment data from request:', paymentData);

    // Destructure and validate payment data
    const { name, examId, userId, paymentId } = paymentData;
    if (!name || !examId || !userId || !paymentId) {
        console.error('Missing one or more required fields:', paymentData);
        return NextResponse.json({ error: 'Missing required payment confirmation data' }, { status: 400 });
    }

    console.log(`Attempting to confirm payment for user ID: ${userId}, payment ID: ${paymentId}`);

    try {
        // Check if a UserExam already exists for the given userId
        const existingUserExam = await prisma.userExam.findUnique({
            where: {
                userId: userId,
            },
        });

        if (existingUserExam) {
            console.error(`UserExam already exists for user ID: ${userId}`);
            return NextResponse.json({ error: 'UserExam already exists for this user' }, { status: 400 });
        }

        console.log(`No existing UserExam for user ID: ${userId}, proceeding with payment confirmation`);

        // Start a transaction to ensure atomicity
        const result = await prisma.$transaction(async (prisma) => {
            console.log('Starting transaction for payment confirmation and UserExam creation');

            // Update the payment confirmation status in the database
            const updatedPayment = await prisma.paymentConfirmation.update({
                where: { id: paymentId, userId: userId },
                data: { paymentConfirmed: true },
            });
            console.log('Updated payment confirmation:', updatedPayment);

            // Create a UserExam entry for the user
            const userExam = await prisma.userExam.create({
                data: {
                    userId: userId,
                    examId: examId,
                },
            });
            console.log('Created UserExam:', userExam);

            // Update the registration status in Redis
            setRegistrationStatus(userId, RegistrationStatus.PaymentConfirmed);
            console.log('Updated registration status in Redis');


            return { updatedPayment, userExam };
        });
        console.log('Payment confirmation and UserExam creation successful:', result);
        return NextResponse.json({ message: "Payment confirmed and user exam created" });
    } catch (error) {
        console.error('Error while updating payment confirmation status and creating UserExam:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: 'Prisma error: ' + error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
        }
    }
}
