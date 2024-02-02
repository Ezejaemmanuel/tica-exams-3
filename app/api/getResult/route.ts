import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Result } from "@prisma/client";
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
