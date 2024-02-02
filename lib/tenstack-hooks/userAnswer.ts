// hooks/useFetchUserAnswers.ts
import { useSuspenseQuery } from '@tanstack/react-query';
import { UserAnswers, useUserAnswersStore } from '../store/zuestand-store';
import { addBaseURL } from '../addBaseUrl';

async function fetchUserAnswers(): Promise<UserAnswers> {
    const { userAnswersData, setUserAnswersData } = useUserAnswersStore.getState();

    if (userAnswersData && Object.keys(userAnswersData).length > 0) {
        return userAnswersData;
    }

    const url = addBaseURL("api/answer")
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch user answers');
    }
    let fetchedAnswers: UserAnswers | null = await response.json();
    if (fetchedAnswers === null) {
        fetchedAnswers = {}; // Replace with your default UserAnswers object
    }
    setUserAnswersData(fetchedAnswers);
    return fetchedAnswers;
};

export function useUserAnswers() {
    return useSuspenseQuery<UserAnswers>({
        queryKey: ['user-answers'],
        queryFn: fetchUserAnswers,
        staleTime: 1000 * 60 * 60 * 24, // 24 hours
    });
}
