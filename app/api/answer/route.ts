import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod'; // Assuming zod is used for formSchema
import { kv } from '@vercel/kv';
import { getUserId } from '@/lib/auth/utils';
import { FormSchemaForAnswers } from '@/app/write-exam/aside';
import { getAllAnswers } from './aside';



export async function POST(req: NextRequest): Promise<NextResponse> {
    const userId: string | null = getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const FromFront: FormSchemaForAnswers = await req.json();
        const questionAcronym: string = FromFront.questionAcronym;

        if (!questionAcronym) {
            return NextResponse.json({ error: 'Invalid or missing questionAcronym' }, { status: 400 });
        }

        if (!FromFront.selectedOption || FromFront.selectedOption === 'non') {
            return NextResponse.json({ error: 'No valid option selected' }, { status: 400 });
        }

        await kv.hset(`tica:answers:${userId}`, { [questionAcronym]: FromFront.selectedOption });

        return NextResponse.json({ message: 'Answer received and logged' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    const userId: string | null = getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
        const answers: Record<string, string> | null = await getAllAnswers(userId);
        return NextResponse.json(answers, { status: 200 });
    } catch (error) {
        console.error('Failed to create user auth:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export const dynamic = 'force-dynamic';

// Assuming kv is your Redis client configured to connect to Vercel KV Redis

