// Import the necessary types and classes from Prisma and Next.js
import { PrismaClient, PaymentConfirmation, User, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { checkAuthPermission } from "@/lib/auth/utils";
import { PaymentConfirmationWithUser } from "./types";

// Define a type for the payment confirmation with user details

// Function to get payment confirmations from the database
async function getPaymentConfirmations(page: number, size: number): Promise<PaymentConfirmationWithUser[]> {
    await checkAuthPermission("only_admin_and_superadmin");

    console.log(`Fetching payment confirmations with a payment URL for page ${page} with size ${size}`);
    const paymentConfirmations = await prisma.paymentConfirmation.findMany({
        skip: (page - 1) * size,
        take: size,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            paymentConfirmed: false,
            paymentUrl: {
                not: null // Only include records with a non-null paymentUrl
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    officialPhoneOrWhatsappNumber: true
                }
            }
        }
    });

    console.log(`Found ${paymentConfirmations.length} payment confirmations with a payment URL`);
    if (paymentConfirmations.length === 0) {
        console.log('No payment confirmations with a payment URL found');
    }

    return paymentConfirmations;
}

// API route GET method using NextResponse
export async function GET(req: NextRequest): Promise<NextResponse> {
    console.log('Received request to get payment confirmations with a payment URL');
    const url = new URL(req.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const size = Number(url.searchParams.get('size')) || 3;

    console.log(`Page: ${page}, Size: ${size}`);
    try {
        const paymentConfirmations = await getPaymentConfirmations(page, size);
        console.log(`Returning ${paymentConfirmations.length} payment confirmations with a payment URL`);
        return NextResponse.json(paymentConfirmations);
    } catch (error) {
        console.error('Error in GET method:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ error: 'Prisma error: ' + error.message }, { status: 400 });
        } else if (error instanceof Error) {
            return NextResponse.json({ error: 'An unknown error occurred: ' + error.message }, { status: 500 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
        }
    }
}

