import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { kv } from '@vercel/kv';
import { safeKVOperation } from '../../safeKvOperation';

export type Question = {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: string;
    examId: string;
};

export async function GET(req: NextRequest): Promise<NextResponse> {
    console.log('GET request received for questions API');
    const examId = req.nextUrl.searchParams.get('examId');
    const subject = req.nextUrl.searchParams.get("subject");
    console.log(`Received examId: ${examId}, subject: ${subject}`);

    if (!examId || !subject) {
        console.error('Missing examId or subject in request parameters');
        return NextResponse.json({ error: 'examId and subject are required' }, { status: 400 });
    }

    const cacheKey = `tica:questions:${examId}:${subject}`;
    console.log(`Cache key generated: ${cacheKey}`);

    try {
        console.log('Attempting to retrieve questions from cache');
        let questions: Question[] | null = await safeKVOperation(() => kv.get<Question[]>(cacheKey));

        if (!questions) {
            console.log('Cache miss, querying database for questions');
            let queryResult;

            if (subject === 'english') {
                queryResult = await prisma.englishQuestion.findMany({
                    where: { examId },
                    select: {
                        id: true,
                        question: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        examId: true,
                        correctAnswer: true,
                    },
                });
            } else if (subject === 'maths') {
                queryResult = await prisma.mathQuestion.findMany({
                    where: { examId },
                    select: {
                        id: true,
                        question: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        correctAnswer: true,
                        examId: true,

                    },
                });
            } else if (subject === 'generalquestions') {
                queryResult = await prisma.generalStudiesQuestion.findMany({
                    where: { examId },
                    select: {
                        id: true,
                        question: true,
                        optionA: true,
                        optionB: true,
                        optionC: true,
                        optionD: true,
                        correctAnswer: true,
                        examId: true,

                    },
                });
            } else {
                console.error('Invalid subject provided');
                return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
            }

            questions = queryResult;
            console.log('Questions retrieved from database, updating cache');
            await safeKVOperation(() => kv.set(cacheKey, questions, { ex: 60 * 60 * 24 })); // Cache for 24 hours
        } else {
            console.log('Questions retrieved from cache');
        }

        console.log('Sending questions response');
        return NextResponse.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: `error:${error}` }, { status: 500 });
    }
}
