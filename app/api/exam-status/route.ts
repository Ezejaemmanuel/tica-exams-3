// app/exam-status.ts
import { NextRequest, NextResponse } from 'next/server';
import { getExamStatus } from './aside-functions';
import { getUserId } from '@/lib/auth/utils';

export async function GET(req: NextRequest) {
    const userId = getUserId();
    const searchParams = new URL(req.url).searchParams;
    const classLevel = searchParams.get('classLevel');

    if (!classLevel || !userId) {
        return NextResponse.json({ error: 'Missing classLevel or userId query parameters' }, { status: 400 });
    }

    // Check if classLevel is either 'jss1' or 'ss1'
    if (classLevel !== 'jss1' && classLevel !== 'ss1') {
        return NextResponse.json({ error: 'Invalid classLevel. Must be either jss1 or ss1.' }, { status: 400 });
    }

    try {
        const status = await getExamStatus(classLevel, userId);
        return NextResponse.json(status, { status: 200 });
    } catch (error) {
        console.error('Error getting exam status:', error);
        return NextResponse.json({ error: `Internal server error : ${error}` }, { status: 500 });
    }
}
