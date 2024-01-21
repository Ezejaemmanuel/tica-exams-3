// utils/examStatus.ts

import { ExamStatusResponse } from "@/lib/tenstack-hooks/exam-status";
import { kv } from "@vercel/kv";

export enum ExamStatus {
    NotYet = 'not-yet',
    ExamDateSet = 'exam-date-set',
    ExamOngoing = 'exam-ongoing',
    ExamFinished = 'exam-finished',
    ResultOut = 'result-out',
}
// utils/examStatus.ts

export interface ExamStatusKVValue {
    examDateTime?: Date;
    length?: number;
    status: ExamStatus;
}

export async function getExamStatus(classLevel: 'jss1' | 'ss1', userId: string): Promise<ExamStatusResponse> {
    const examId = `${classLevel}-1-2024`;
    const examStatusKey = `${examId}:exam-status:all`;

    const examStatusValue = await kv.get<ExamStatusKVValue>(examStatusKey);
    if (!examStatusValue) {
        return { status: ExamStatus.NotYet };
    }

    if (!examStatusValue.examDateTime || !examStatusValue.length) {
        return { status: ExamStatus.NotYet };
    }

    const examDateTime = new Date(examStatusValue.examDateTime);
    console.log("this si the examDateTime from the cache", examDateTime);
    const examEndTime = new Date(examDateTime.getTime() + examStatusValue.length * 60000);
    console.log("this is the end time", examEndTime);
    const now = new Date();

    if (now < examDateTime) {
        console.log("thiis is the examDatetime that is returrned 1 ", examDateTime);
        return { status: ExamStatus.ExamDateSet, examDate: examDateTime, length: examStatusValue.length };

    } else if (now >= examDateTime && now <= examEndTime) {
        console.log("thiis is the examDatetime that is returrned 2", examDateTime);

        return { status: ExamStatus.ExamOngoing, examDate: examDateTime, length: examStatusValue.length };
    } else {
        const resultStatusKey = `result:${examId}:${userId}`;
        const resultStatus = await kv.get(resultStatusKey);
        if (resultStatus) {
            console.log("thiis is the examDatetime that is returrned 3 ", examDateTime);

            return { status: ExamStatus.ResultOut, examDate: examDateTime, length: examStatusValue.length };
        } else {
            console.log("thiis is the examDatetime that is returrned 4 ", examDateTime);

            return { status: ExamStatus.ExamFinished, examDate: examDateTime, length: examStatusValue.length };
        }
    }
}
