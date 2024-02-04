import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { safeKVOperation } from '../../../../lib/api/redis/safeKvOperation';
import { checkAuthPermission } from '@/lib/auth/utils';



export async function GET(req: NextRequest): Promise<NextResponse> {
    await checkAuthPermission("only_admin_and_superadmin");

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
        } else if (subject === 'generalStudies') {
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



        console.log('Sending questions response');
        return NextResponse.json(queryResult);
    } catch (error) {
        console.error('Error fetching questions:', error);
        return NextResponse.json({ error: `error:${error}` }, { status: 500 });
    }
}
