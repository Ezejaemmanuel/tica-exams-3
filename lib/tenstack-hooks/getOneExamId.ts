

// hooks/useExamIdsQuery.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';

// Define the type for the error
interface ExamIdsQueryError {
    error: string;
}

// Fetch function for the exam IDs
async function fetchExamIds(): Promise<string> {
    const url = addBaseURL("api/getOneExamId")
    const response = await fetch(url);
    if (!response.ok) {
        const errorData: ExamIdsQueryError = await response.json();
        console.log("this is the error ooooo", errorData);
        throw new Error(errorData.error);
    }
    const data = await response.json();
    return data.examId;
}

// React Query hook using useSuspenseQuery
export function useExamIds() {
    return useSuspenseQuery<string, ExamIdsQueryError>({
        queryKey: ['exam-ids'],
        queryFn: fetchExamIds,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });


}
