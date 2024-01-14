// pages/api/user.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth/utils';

export async function GET(req: NextRequest) {
    const userId = getUserId();


    if (!userId) {
        return NextResponse.json({ error: 'User is not authenticated.' }, { status: 401 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },

        });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Request error', error);
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
};
