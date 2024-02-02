

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '../addBaseUrl';
import { useUserExamStatusStore } from '../store/zuestand-store';
import { UserExamStatus } from '../api/redis/exam-status';

// Function to calculate the current exam status


const fetchExamStatus = async (): Promise<UserExamStatus | null> => {
    const { userExamStatusData, setUserExamStatusData } = useUserExamStatusStore.getState();

    // If data exists in the store, calculate status and return it without fetching
    if (userExamStatusData) {
        console.log('Using cached exam status data from Zustand store');
        return userExamStatusData;
    } else {
        console.log('Fetching exam status data from backend');
        const url = addBaseURL(`api/user-exam-status`);
        const response = await fetch(url, { cache: "no-store" });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        const newData: UserExamStatus = await response.json();
        // Calculate exam status before updating the store
        setUserExamStatusData(newData); // Update Zustand store with new data
        return newData;
    }
};

export function useUserExamStatus(): UseQueryResult<UserExamStatus, Error> {
    return useQuery({
        queryKey: ['userExamStatus'],
        queryFn: fetchExamStatus,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
        // onSuccess can be used if additional actions are needed after fetching
    });
}
