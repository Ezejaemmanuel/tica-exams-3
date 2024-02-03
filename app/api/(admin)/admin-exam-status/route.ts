// pages/api/exam-status.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { deleteExamStatusCache, getExamStatusCache, setExamStatusCache } from './cache';
import { Exam } from '@prisma/client';
// types/ExamStatusTypes.ts

export enum ExamStatusEnum {
    NoExamYet = 'NO_EXAM_YET',
    ExamData = 'EXAM_DATA',
}

import { Exam as PrismaExam, EnglishQuestion, GeneralStudiesQuestion, MathQuestion, UserExam } from '@prisma/client';
import { checkAuthPermission } from '@/lib/auth/utils';

export type ExamStatus = {
    exam: {
        id: PrismaExam['id'];
        classLevel: PrismaExam['classLevel'];
        date: PrismaExam['date'];
        startTime: PrismaExam['startTime'];
        lengthOfExam: PrismaExam['lengthOfExam'];

    };
    englishQuestionsCount: number;
    generalStudiesQuestionsCount: number;
    mathQuestionsCount: number;
    usersWritingExamCount: number;
};

export async function GET(req: NextRequest) {
    await checkAuthPermission("only_admin_and_superadmin");

    const revalidate = req.nextUrl.searchParams.get('revalidate') === 'true';
    const cacheKey = 'tica:exam-status';

    try {
        if (revalidate) {

            console.log('Revalidating cache: deleting and fetching fresh data');
            await deleteExamStatusCache(cacheKey);
        }

        // Define a type for the exam status object

        // Use the type for the examStatus variable
        let examStatus: ExamStatus[] | null = revalidate ? null : await getExamStatusCache(cacheKey);


        if (!examStatus) {
            console.log('Fetching exam status from database');
            const exams = await prisma.exam.findMany({
                select: {
                    id: true,
                    classLevel: true,
                    date: true,
                    startTime: true,
                    lengthOfExam: true,

                    // Replace with actual fields you need from the exam
                    englishQuestions: {
                        select: {
                            id: true, // Replace with actual fields you need from englishQuestions
                        }
                    },
                    generalStudiesQuestions: {
                        select: {
                            id: true, // Replace with actual fields you need from generalStudiesQuestions
                        }
                    },
                    mathQuestions: {
                        select: {
                            id: true, // Replace with actual fields you need from mathQuestions
                        }
                    },
                    userExam: {
                        select: {
                            id: true, // Replace with actual fields you need from userExam
                        }
                    },
                },
            });

            if (exams.length === 0) {
                console.log('No exams found');
                return NextResponse.json({ status: ExamStatusEnum.NoExamYet });
            }

            examStatus = exams.map(exam => ({
                exam: {
                    id: exam.id,
                    classLevel: exam.classLevel,
                    date: exam.date,
                    startTime: exam.startTime,
                    lengthOfExam: exam.lengthOfExam,
                },
                englishQuestionsCount: exam.englishQuestions.length,
                generalStudiesQuestionsCount: exam.generalStudiesQuestions.length,
                mathQuestionsCount: exam.mathQuestions.length,
                usersWritingExamCount: exam.userExam.length,
            }));

            await setExamStatusCache(cacheKey, examStatus);
        }

        return NextResponse.json({ status: ExamStatusEnum.ExamData, data: examStatus });
    } catch (error) {
        console.error('Error fetching exam status:', error);
        return NextResponse.json({ error: 'Error fetching exam status' }, { status: 500 });
    }
}
