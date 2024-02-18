import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { ExamStatusZustand, useExamStatusStore } from '../store/zuestand-store';

export enum ExamStatus {
    NotYet = 'not-yet',
    ExamDateSet = 'exam-date-set',
    ExamOngoing = 'exam-ongoing',
    ExamFinished = 'exam-finished',
    ResultOut = 'result-out',
}

export interface ExamStatusKVValue {
    examDateTime?: Date;
    length?: number;
    status?: ExamStatus;
}

// Function to calculate the current exam status
const calculateExamStatus = (data: ExamStatusZustand): ExamStatusKVValue => {
    const now = new Date();
    let status: ExamStatus | undefined;

    if (data.examDateTime) {
        const examDateTime = new Date(data.examDateTime);
        const examEndTime = new Date(examDateTime.getTime() + (data.length || 0) * 60000);

        if (now < examDateTime) {
            status = ExamStatus.ExamDateSet;
        } else if (now >= examDateTime && now <= examEndTime) {
            status = ExamStatus.ExamOngoing;
        } else {
            // Adjust this logic based on your actual logic for checking result status
            status = ExamStatus.ExamFinished; // or ExamStatus.ResultOut based on your condition
        }
    }

    return {
        ...data,
        status,
    };
};

const fetchExamStatus = async (): Promise<ExamStatusKVValue | null> => {
    const { examStatusData, setExamStatusData } = useExamStatusStore.getState();
    console.log("this is the exam status returned from Zustand", examStatusData);


    console.log('Fetching exam status data from backend');
    const url = addBaseURL(`api/exam-status`);
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
    }

    const newData: ExamStatusZustand = await response.json();
    setExamStatusData(newData, 2); // Update Zustand store with new data

    // Check if the backend returned data with a status property
    if ('status' in newData) {
        throw new Error('Backend data should not include a status property');
    }

    console.log("this is the exam status data", newData);
    const updatedData = calculateExamStatus(newData);
    return updatedData;
};

export function useExamStatus(): UseQueryResult<ExamStatusKVValue, Error> {
    return useQuery({
        queryKey: ['examStatus-v2'],
        queryFn: fetchExamStatus,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
