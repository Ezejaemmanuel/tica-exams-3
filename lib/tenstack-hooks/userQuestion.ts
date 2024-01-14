// hooks/useUserQuestion.ts

import { QueryKey, useQueryClient, useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { addBaseURL } from '@/lib/addBaseUrl';

interface Question {
    id: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}

interface UseUserQuestionProps {
    initialAcronym: string;
}

const subjectOrder = ['E', 'M', 'G'];
const totalQuestionsPerSubject = 30;
interface UseUserQuestionResult extends UseSuspenseQueryResult<Question, Error> {
    navigateQuestions: (direction: 'next' | 'prev') => void;
}

export function useUserQuestion({ initialAcronym }: UseUserQuestionProps): UseUserQuestionResult {
    console.log("Initializing useUserQuestion hook with initialAcronym:", initialAcronym);
    const [questionAcronym, setQuestionAcronym] = useState(initialAcronym);
    const queryClient = useQueryClient();

    async function fetchUserQuestion({ queryKey }: { queryKey: QueryKey }) {
        const acronym = Array.isArray(queryKey) ? queryKey[1] : "E-1";
        console.log("Fetching user question with acronym:", acronym);
        const baseURL = addBaseURL(`/api/getUserQuestion?questionAcronym=${acronym}`);
        const response = await fetch(baseURL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data: Question = await response.json();
        console.log("Fetched question data:", data);
        return data;
    }

    const queryResult = useSuspenseQuery<Question, Error>({
        queryKey: ['userQuestion', questionAcronym],
        queryFn: fetchUserQuestion,
    });

    useEffect(() => {
        console.log("useEffect triggered with questionAcronym:", questionAcronym);
        const [subjectAcronym, questionNumber] = questionAcronym.split('-');
        const currentNumber = parseInt(questionNumber);
        const currentSubjectIndex = subjectOrder.indexOf(subjectAcronym);
        console.log("Current subject and question number:", subjectAcronym, currentNumber);

        const nextNumbers = [
            currentNumber === totalQuestionsPerSubject ? 1 : currentNumber + 1,
            currentNumber >= totalQuestionsPerSubject - 1 ? 2 - (totalQuestionsPerSubject - currentNumber) : currentNumber + 2,
        ];
        const prevNumber = currentNumber === 1 ? totalQuestionsPerSubject : currentNumber - 1;

        const prevSubjectIndex = currentNumber === 1 ? (currentSubjectIndex - 1 + subjectOrder.length) % subjectOrder.length : currentSubjectIndex;
        const prevSubjectAcronym = subjectOrder[prevSubjectIndex];

        nextNumbers.forEach((nextNumber, index) => {
            const nextSubjectIndex = currentNumber > totalQuestionsPerSubject - 2 && index === 1 ? (currentSubjectIndex + 1) % subjectOrder.length : currentSubjectIndex;
            const nextSubjectAcronym = subjectOrder[nextSubjectIndex];
            const nextAcronym = `${nextSubjectAcronym}-${nextNumber}`;
            console.log("Prefetching next question with acronym:", nextAcronym);

            if (!queryClient.getQueryData(['userQuestion', nextAcronym])) {
                queryClient.prefetchQuery({
                    queryKey: ['userQuestion', nextAcronym],
                    queryFn: fetchUserQuestion,
                });
            }
        });

        const prevAcronym = `${prevSubjectAcronym}-${prevNumber}`;
        console.log("Prefetching previous question with acronym:", prevAcronym);
        if (!queryClient.getQueryData(['userQuestion', prevAcronym])) {
            queryClient.prefetchQuery({
                queryKey: ['userQuestion', prevAcronym],
                queryFn: fetchUserQuestion,
            });
        }
    }, [questionAcronym, queryClient]);

    return {
        ...queryResult,
        navigateQuestions: (direction: 'next' | 'prev') => {
            console.log("Navigating questions in direction:", direction);
            const [subjectAcronym, questionNumber] = questionAcronym.split('-');
            let newNumber = parseInt(questionNumber) + (direction === 'next' ? 1 : -1);
            let newSubjectIndex = subjectOrder.indexOf(subjectAcronym);

            if (newNumber > totalQuestionsPerSubject) {
                newNumber = 1;
                newSubjectIndex = (newSubjectIndex + 1) % subjectOrder.length;
            } else if (newNumber < 1) {
                newNumber = totalQuestionsPerSubject;
                newSubjectIndex = (newSubjectIndex - 1 + subjectOrder.length) % subjectOrder.length;
            }

            const newAcronym = `${subjectOrder[newSubjectIndex]}-${newNumber}`;
            console.log("New question acronym after navigation:", newAcronym);
            setQuestionAcronym(newAcronym);
        },
    };
}
