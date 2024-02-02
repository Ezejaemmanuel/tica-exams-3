import { useExamStore } from '../store/zuestand-store';
import { ExamInstructionsProps } from '@/app/api/exam-Summary/route';
import { addBaseURL } from '../addBaseUrl';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchExamData = async (): Promise<ExamInstructionsProps> => {
    //console.log('fetchExamData: Invoked');
    const { examData, setExamData } = useExamStore.getState();

    if (examData) {
        //console.log('fetchExamData: Using cached data from Zustand store/sessionStorage');
        return examData;
    } else {
        //console.log('fetchExamData: Fetching data from backend');
        const response = await fetch(addBaseURL("api/exam-Summary"));
        if (!response.ok) {
            const errorData = await response.json();

            console.error('fetchExamData: Failed to load exam instructions from backend the erorr message is ', errorData);
            //console.log('fetchExamData: Throwing error');
            throw new Error('Failed to load exam instructions');
        }
        const newData: ExamInstructionsProps = await response.json();
        //console.log('fetchExamData: Data fetched from backend, updating Zustand store/sessionStorage');
        setExamData(newData);
        return newData;
    }
};

export default fetchExamData;



export function useExamSummaryZuestanded() {
    //console.log('useExamSummary: Hook invoked');
    return useSuspenseQuery({
        queryKey: ['exam-summary'],
        queryFn: fetchExamData,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
