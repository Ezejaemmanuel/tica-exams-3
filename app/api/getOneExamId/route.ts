// pages/api/exam-ids.ts
import { getExamIdForUser } from '@/lib/api/redis/exam-id';
import { getUserId } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const authId = getUserId();
    if (!authId) {
        return NextResponse.json({ error: 'user is not authorized' }, { status: 401 });

    }
    try {
        const examId = await getExamIdForUser(authId);
        console.log('examIds', examId);
        if (examId) {
            return NextResponse.json({ examId });
        } else {
            return NextResponse.json({ error: 'THERE IS NO EXAM ID FOR USER' }, { status: 500 });

        }
    } catch (error) {
        console.error('Error retrieving exam IDs:', error);
        return NextResponse.json({ error: `Internal server error ${error}` }, { status: 500 });
    }
}

