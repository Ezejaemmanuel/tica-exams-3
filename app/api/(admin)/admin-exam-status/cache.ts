// lib/cacheHandlers.ts
import { Exam as PrismaExam, EnglishQuestion, GeneralStudiesQuestion, MathQuestion, UserExam } from '@prisma/client';

export enum ExamStatusEnum {
    NoExamYet = 'NO_EXAM_YET',
    ExamData = 'EXAM_DATA',
}
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

import { kv } from '@vercel/kv';
import { safeKVOperation } from '../../../../lib/api/redis/safeKvOperation';

export async function getExamStatusCache(cacheKey: string): Promise<ExamStatus[] | null> {
    return safeKVOperation(() => kv.get(cacheKey));
}

export const setExamStatusCache = async (cacheKey: string, data: any) => {
    return safeKVOperation(() => kv.set(cacheKey, data));
};

export const deleteExamStatusCache = async (cacheKey: string) => {
    return safeKVOperation(() => kv.del(cacheKey));
};
