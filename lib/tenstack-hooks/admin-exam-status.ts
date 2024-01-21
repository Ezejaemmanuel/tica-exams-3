// hooks/useExamStatus.ts

import { ExamStatus, ExamStatusEnum } from '@/app/api/(admin)/admin-exam-status/route';
import { useSuspenseQuery } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';



type ExamStatusResponse = {
    status: ExamStatusEnum;
    data?: ExamStatus[];
    error?: string;
};

export const useExamStatus = (revalidate: string) => {
    return useSuspenseQuery<ExamStatusResponse>({
        queryKey: ['examStatus', revalidate],
        queryFn: async ({ queryKey }) => {
            const [, revalidate] = queryKey;
            const url = addBaseURL(`/api/admin-exam-status?revalidate=${revalidate}`)
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json();
                console.log("this is the error data", errorData);
                throw new Error("errorData.error");
            }
            return response.json();
        },
    });
};
