// pages/api/user.ts
/* this is in case if fr do not agree to pay for caching  */
// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';
// import { getUserId } from '@/lib/auth/utils';

// export async function GET(req: NextRequest) {
//     const userId = getUserId();


//     if (!userId) {
//         return NextResponse.json({ error: 'User is not authenticated.' }, { status: 401 });
//     }

//     try {
//         const user = await prisma.user.findUnique({
//             where: { id: userId },

//         });

//         if (!user) {
//             return NextResponse.json({ error: 'User not found.' }, { status: 404 });
//         }

//         return NextResponse.json(user);
//     } catch (error) {
//         console.error('Request error', error);
//         return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
// };


// pages/api/user.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getUserId } from '@/lib/auth/utils';
import { User } from '@prisma/client'; // Import the User type from Prisma client
import { kv } from '@vercel/kv';
import { getUserData } from '../../userInfo/cache';
import { getExamIdForUser } from '@/lib/api/redis/exam-id';

// Define the type for the KV operation function

// Function to get user data, first from cache, then from database if necessary

export async function GET(req: NextRequest): Promise<NextResponse> {
    // console.log('Received GET request for user data');
    const userId = req.nextUrl.searchParams.get('userId');
    // const userId = getUserId();

    if (!userId) {
        console.log('User is not authenticated, no userId found');
        return NextResponse.json({ error: 'User is not authenticated.' }, { status: 401 });
    }
    const examId = await getExamIdForUser(userId);
    if (!examId) {
        return NextResponse.json({ error: "eam id is not found" }, { status: 404 });
    }
    console.log('Authenticated userId:', userId);
    const user = await getUserData(userId, examId);

    if (!user) {
        console.log('User not found for userId:', userId);
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    console.log('Returning user data for userId:', userId);
    return NextResponse.json(user);
}

