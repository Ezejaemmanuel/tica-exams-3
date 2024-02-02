// pages/api/exam/[examId].ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { kv } from '@vercel/kv';
import { safeKVOperation } from '../../../lib/api/redis/safeKvOperation';
import { getExamIdForUser } from '@/lib/api/redis/exam-id';
import { getUserId } from '@/lib/auth/utils';

enum SubjectName {
    English = 'English',
    GeneralStudies = 'General Studies',
    Mathematics = 'Mathematics',
}

export interface ExamSubject {
    name: SubjectName;
    questionCount: number;
}

export interface ExamInstructionsProps {
    subjects: ExamSubject[];
    examDuration: number; // in minutes
}

export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = getUserId();
    if (!userId) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const examId = await getExamIdForUser(userId)
    if (!examId) {
        return NextResponse.json({ error: 'Invalid exam ID' }, { status: 400 });
    }

    const cacheKey = `tica:exam-summary:${examId}`;
    let examInstructions: ExamInstructionsProps | null = await safeKVOperation(() =>
        kv.get<ExamInstructionsProps>(cacheKey)
    );

    if (!examInstructions) {
        try {
            const exam = await prisma.exam.findUnique({
                where: { id: examId },
                select: {
                    lengthOfExam: true,
                    englishQuestions: {
                        select: { id: true },
                    },
                    generalStudiesQuestions: {
                        select: { id: true },
                    },
                    mathQuestions: {
                        select: { id: true },
                    },
                },
            });
            console.log("this is the exam that is returned", exam);
            if (exam) {
                examInstructions = {
                    subjects: [
                        { name: SubjectName.English, questionCount: exam.englishQuestions.length },
                        { name: SubjectName.GeneralStudies, questionCount: exam.generalStudiesQuestions.length },
                        { name: SubjectName.Mathematics, questionCount: exam.mathQuestions.length },
                    ],
                    examDuration: exam.lengthOfExam ?? 0,
                };
                console.log("the exam instructions are", examInstructions);
                await safeKVOperation(() => kv.set(cacheKey, examInstructions)); // Cache for 24 hours
            } else {
                return NextResponse.json({ error: 'Exam not found' }, { status: 404 });
            }
        } catch (error) {
            return NextResponse.json({ error: 'An error occurred while fetching the exam' }, { status: 500 });
        }
    }

    return NextResponse.json(examInstructions);
}
