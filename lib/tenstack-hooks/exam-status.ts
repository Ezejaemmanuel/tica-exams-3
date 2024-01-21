// hooks/useExamStatus.ts
import { ExamStatus } from '@/app/api/exam-status/aside-functions';
import { UseSuspenseQueryResult, useSuspenseQuery } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
// types/ExamStatusTypes.ts


export interface ExamStatusResponse {
    status: ExamStatus;
    examDate?: Date;
    length?: number;
}

async function fetchExamStatus({ queryKey }: { queryKey: [string, string] }): Promise<ExamStatusResponse> {
    const [, classLevel] = queryKey;
    const url = addBaseURL(`/api/exam-status?classLevel=${classLevel}`);
    const response = await fetch(url);

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }
    return response.json();
}


export function useExamStatus(classLevel: 'jss1' | 'ss1'): UseSuspenseQueryResult<ExamStatusResponse, Error> {
    return useSuspenseQuery({
        queryKey: ['examStatus', classLevel],
        queryFn: fetchExamStatus,
        staleTime: 1000 * 60 * 60 * 24,
        // 24 hours

    });
}
