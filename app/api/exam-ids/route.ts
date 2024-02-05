// pages/api/exam-ids.ts
import { getAllExamIds } from '@/lib/api/redis/exam-id';
import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const examIds = await getAllExamIds();
        console.log('examIds', examIds);
        return NextResponse.json({ examIds });

    } catch (error) {
        console.error('Error retrieving exam IDs:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

