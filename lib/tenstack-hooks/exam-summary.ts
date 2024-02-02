import { ExamInstructionsProps } from '@/app/api/exam-Summary/route';
import { QueryKey } from '@tanstack/react-query';
// hooks/useExamQuery.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';

// Define the type for the error
interface ExamQueryError {
    message: string;
}

// Fetch function for the exam data
async function fetchExamData({ queryKey }: { queryKey: QueryKey }): Promise<ExamInstructionsProps> {
    // const [, examId] = queryKey;
    const url = addBaseURL("api/exam-Summary");
    console.log("this is the url inside of the useExamSummary hook", url);
    const response = await fetch(url);
    if (!response.ok) {
        const errorData: ExamQueryError = await response.json();
        console.log("this is the error data", errorData);
        throw new Error(`Failed to load exam instructions: ${errorData.message}`);
    }
    const data = await response.json();
    console.log("this is the data", data);
    return data;
}

// React Query hook
export function useExamSummary() {

    return useSuspenseQuery<ExamInstructionsProps, ExamQueryError>({
        queryKey: ["exam-summary"],
        queryFn: fetchExamData,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}



