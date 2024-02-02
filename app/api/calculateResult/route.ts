// pages/api/saveResult.ts
import { NextRequest, NextResponse } from 'next/server';
import { calculateScoresAndSave } from './calculateScore';
import { getUserId } from '@/lib/auth/utils';
import { getExamIdForUser } from '@/lib/api/redis/exam-id';
import { kv } from '@vercel/kv';
import { Result } from '@prisma/client';
import { prisma } from '@/lib/db';
import { UserExamStatus, setUserExamStatusKV } from '@/lib/api/redis/exam-status';
export async function POST(request: NextRequest) {
    try {
        // Parse the request body to get userId and examId
        const userId = getUserId();
        if (!userId) {
            return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
        }
        const examId = await getExamIdForUser(userId);

        // Check if userId and examId are present
        if (!examId) {
            return NextResponse.json({ error: 'Missing userId or examId' }, { status: 400 });
        }

        // Call your function to calculate scores and save the result
        const result = await calculateScoresAndSave(userId, examId);
        // Return the result as JSON
        await setUserExamStatusKV(userId, UserExamStatus.ResultPresent);
        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        // Return an error response
        return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 });
    }
}



export async function GET(request: NextRequest) {
    try {
        const userId = request.nextUrl.searchParams.get('userId');
        const examId = request.nextUrl.searchParams.get('examId');

        if (!userId || !examId) {
            return NextResponse.json({ error: 'Missing userId or examId' }, { status: 400 });
        }

        const cacheKey = `tica:userResult:${userId}`;
        let result = await kv.get<Result>(cacheKey); // Adjust the type according to your result object structure

        if (!result) {
            // Data not found in cache, querying the database
            result = await prisma.result.findUnique({
                where: {
                    userId: userId,
                    examId: examId,
                }
            });

            if (!result) {
                return NextResponse.json({ error: 'Result not found' }, { status: 404 });
            }

            // Storing the result in the cache for future requests without expiration
            await kv.set(cacheKey, result);
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error retrieving exam result:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
