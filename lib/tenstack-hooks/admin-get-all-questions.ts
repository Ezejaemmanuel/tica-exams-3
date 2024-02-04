// hooks/useQuestions.ts
import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { Question } from '@/app/api/(admin)/get-all-questions/types';



async function fetchQuestions({ queryKey }: { queryKey: [string, string, string] }): Promise<Question[]> {
    const examId = queryKey[2]
    const subject = queryKey[1];
    console.log("this is the examid ", examId);
    console.log("this is the subject", subject)
    const url = addBaseURL(`/api/get-all-questions?examId=${examId}&subject=${subject}`);
    try {
        const response = await fetch(url);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        return response.json();
    } catch (error) {
        throw new Error(`error ooo:${error}`);
    }
}

export function useQuestions(subject: string, examId: string,): UseSuspenseQueryResult<Question[], Error> {
    return useSuspenseQuery({
        queryKey: ['get-all-questions', subject, examId],
        queryFn: fetchQuestions,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
