// pages/api/create-exam.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { ClassLevel } from '@prisma/client';
import { kv } from '@vercel/kv';
import { safeKVOperation } from '../safeKvOperation';
import { ExamStatus } from '../exam-status/aside-functions';
import { ExamDetails } from '@/app/admin-dashboard/setExamDetails/aside';
import { deleteExamStatusCache } from '../(admin)/admin-exam-status/cache';


interface ExamStatusKVValue {
    examDateTime?: Date;
    length?: number;
    status: ExamStatus;
}

export async function POST(request: NextRequest) {
    const fromFront: ExamDetails = await request.json();
    console.log("this is from the frontend", fromFront);
    if (!fromFront.classLevel || !fromFront.examStartDate || !fromFront.examTime || !fromFront.length) {
        return NextResponse.json({ error: "Some fields are not available" }, { status: 400 });
    }

    let classLevelEnum: ClassLevel;
    if (fromFront.classLevel === 'JSS1') {
        classLevelEnum = ClassLevel.JSS1;
    } else if (fromFront.classLevel === 'SS1') {
        classLevelEnum = ClassLevel.SS1;
    } else {
        return NextResponse.json({ error: 'Invalid class level.' }, { status: 400 });
    }

    const examId = `${fromFront.classLevel.toLowerCase()}-1-2024`;
    // console.log("thsi is the examId", examId);
    // const startDate = new Date(fromFront.examStartDate);
    // const year = startDate.getUTCFullYear();
    // console.log("thsi si the year in backend", year);
    // const month = (startDate.getUTCMonth() + 1).toString().padStart(2, '0'); // Pad month with leading zero]
    // console.log("this is the month in the backend", month);
    // const day = startDate.getUTCDate().toString().padStart(2, '0'); // Pad day with leading zero
    // console.log("this is the day in backend", day);
    // // const hour = fromFront
    // console.log("this is the examTime in backend", fromFront.examTime);

    // Combine the date with the examTime
    // Note: examTime is expected to be in 'HH:mm' format
    const examDateTime = fromFront.examStartDate;
    console.log("this is the exam datetime that is about to be set", examDateTime);
    async function setExamStatusKV(examId: string, examStatus: ExamStatusKVValue) {
        const key = `${examId}:exam-status:all`;
        return safeKVOperation(() => kv.set(key, examStatus));
    }
    const length = fromFront.length;
    try {
        const newExam = await prisma.exam.upsert({
            where: { id: examId },
            create: {
                id: examId,
                date: examDateTime,
                classLevel: classLevelEnum,
                lengthOfExam: fromFront.length
            },
            update: {
                date: examDateTime,
                classLevel: classLevelEnum,
                lengthOfExam: fromFront.length
            },
        });
        const cacheKey = 'tica:exam-status';

        const [kvResult, cacheResult] = await Promise.all([
            setExamStatusKV(examId, {
                examDateTime,
                length,
                status: ExamStatus.ExamDateSet // Assuming the default status when creating an exam
            }),
            deleteExamStatusCache(cacheKey)
        ]);
        if (kvResult === null) {
            console.error('Failed to set KV value for exam status');
        }
        return NextResponse.json({ message: 'Exam created successfully', exam: newExam });
    } catch (error) {
        console.error('Failed to create exam', error);
        return NextResponse.json({ error: `Failed to create exam ${error}` }, { status: 500 });
    }
}
