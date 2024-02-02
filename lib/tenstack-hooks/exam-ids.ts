// hooks/useExamIdsQuery.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { addBaseURL } from '../addBaseUrl';

// Define the type for the error
interface ExamIdsQueryError {
    error: string;
}

// Fetch function for the exam IDs
async function fetchExamIds(): Promise<string[]> {
    const url = addBaseURL("api/exam-ids")
    const response = await fetch(url);
    if (!response.ok) {
        const errorData: ExamIdsQueryError = await response.json();
        console.log("this is the error ooooo", errorData);
        throw new Error(errorData.error);
    }
    const data = await response.json();
    return data.examIds;
}

// React Query hook using useSuspenseQuery
export function useExamIds() {
    const router = useRouter();
    const { data: examIds, error } = useSuspenseQuery<string[], ExamIdsQueryError>({
        queryKey: ['exam-ids'],
        queryFn: fetchExamIds,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });

    useEffect(() => {
        // If the examIds array is empty and there's no error, redirect to the no-exam page
        if (examIds && examIds.length === 0) {
            console.log("there was an error or something like that ");
            router.push('/no-exam');
        }
    }, [examIds, error, router]);

    return { examIds, error };
}
