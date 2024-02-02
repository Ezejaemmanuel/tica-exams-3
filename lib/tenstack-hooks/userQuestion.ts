

import { useEffect } from 'react';
import { QueryKey, useQueryClient, useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';
import { addBaseURL } from '@/lib/addBaseUrl';
import { useExamSummaryZuestanded } from './exam-summary-2';
import { useQuestionStore } from '../store/zuestand-store';

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

type SubjectAcronymMap = {
    [key: string]: string;
    English: 'E';
    Mathematics: 'M';
    'General Studies': 'G';
};

const subjectAcronymMap: SubjectAcronymMap = {
    English: 'E',
    Mathematics: 'M',
    'General Studies': 'G'
};

interface UseUserQuestionResult extends UseSuspenseQueryResult<Question, Error> {
    navigateQuestions: (direction: 'next' | 'prev') => void;
    currentSubject: string;
    currentQuestionNumber: number;
    currentAcronym: string;
}

export function useUserQuestion({ initialAcronym }: UseUserQuestionProps): UseUserQuestionResult {
    const {
        questionAcronym,
        currentQuestionAcronym,
        currentSubject,
        currentQuestionNumber,
        setQuestionAcronym,
        setCurrentQuestionAcronym,
        setCurrentSubject,
        setCurrentQuestionNumber,
    } = useQuestionStore();

    useEffect(() => {
        const initialSubjectAcronym = initialAcronym.split('-')[0];
        const initialSubject = Object.keys(subjectAcronymMap).find(key => subjectAcronymMap[key] === initialSubjectAcronym) || '';
        const initialQuestionNumber = parseInt(initialAcronym.split('-')[1], 10) || 0;

        setQuestionAcronym(initialAcronym);
        setCurrentQuestionAcronym(initialAcronym);
        setCurrentSubject(initialSubject);
        setCurrentQuestionNumber(initialQuestionNumber);
    }, [initialAcronym, setQuestionAcronym, setCurrentQuestionAcronym, setCurrentSubject, setCurrentQuestionNumber]);

    const queryClient = useQueryClient();
    const { data: examSummary } = useExamSummaryZuestanded();

    async function fetchUserQuestion({ queryKey }: { queryKey: QueryKey }) {
        // console.log("thsi is the querykey", queryKey);
        const acronym = Array.isArray(queryKey) ? queryKey[1] : "E-1";
        // console.log("this is the acronym", acronym);
        // const baseURL = addBaseURL(`api/question?questionAcronym=${acronym}`);
        const baseURL = addBaseURL(`api/question?questionAcronym=${acronym}`);

        const response = await fetch(baseURL);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        const data: Question = await response.json();
        return data;
    }

    const queryResult = useSuspenseQuery<Question, Error>({
        queryKey: ['userQuestion', questionAcronym],
        queryFn: fetchUserQuestion,
        staleTime: 1000 * 60 * 60,
    });

    useEffect(() => {
        if (!examSummary) return;
        const [subjectAcronym, questionNumber] = questionAcronym.split('-');
        const currentNumber = parseInt(questionNumber);
        const subjectName = Object.keys(subjectAcronymMap).find(key => subjectAcronymMap[key] === subjectAcronym);
        const currentSubjectIndex = examSummary.subjects.findIndex(subject => subject.name === subjectName);
        const totalQuestionsForCurrentSubject = examSummary.subjects[currentSubjectIndex]?.questionCount || 0;

        const prefetchCount = 10;
        for (let i = 1; i <= prefetchCount; i++) {
            let nextNumber = currentNumber + i;
            let nextSubjectIndex = currentSubjectIndex;

            if (nextNumber > totalQuestionsForCurrentSubject) {
                nextNumber -= totalQuestionsForCurrentSubject;
                nextSubjectIndex = (nextSubjectIndex + 1) % examSummary.subjects.length;
            }

            const nextSubjectName = examSummary.subjects[nextSubjectIndex].name;
            const nextAcronym = `${subjectAcronymMap[nextSubjectName]}-${nextNumber}`;
            if (!queryClient.getQueryData(['userQuestion', nextAcronym])) {
                queryClient.prefetchQuery({
                    queryKey: ['userQuestion', nextAcronym],
                    queryFn: fetchUserQuestion,
                });
            }
        }
    }, [questionAcronym, queryClient, examSummary]);

    return {
        ...queryResult,
        navigateQuestions: (direction: 'next' | 'prev') => {
            if (!examSummary) return;
            const [subjectAcronym, questionNumber] = questionAcronym.split('-');
            let newNumber = parseInt(questionNumber) + (direction === 'next' ? 1 : -1);
            let subjectName = Object.keys(subjectAcronymMap).find(key => subjectAcronymMap[key] === subjectAcronym);
            let newSubjectIndex = examSummary.subjects.findIndex(subject => subject.name === subjectName);
            let totalQuestionsForCurrentSubject = examSummary.subjects[newSubjectIndex]?.questionCount || 0;

            if (newNumber > totalQuestionsForCurrentSubject) {
                newSubjectIndex = (newSubjectIndex + 1) % examSummary.subjects.length;
                newNumber = 1;
            } else if (newNumber < 1) {
                newSubjectIndex = (newSubjectIndex - 1 + examSummary.subjects.length) % examSummary.subjects.length;
                newNumber = examSummary.subjects[newSubjectIndex]?.questionCount || 0;
            }

            subjectName = examSummary.subjects[newSubjectIndex].name;
            const newAcronym = `${subjectAcronymMap[subjectName]}-${newNumber}`;

            // Adjust the logic for setting the currentAcronym to ensure it reflects the state before the navigation action
            // This means setting the currentAcronym to the questionAcronym before updating the questionAcronym to the new value
            setCurrentQuestionAcronym(questionAcronym); // Set the currentAcronym to the current state before updating
            setQuestionAcronym(newAcronym); // Then update the questionAcronym to the new value
            setCurrentSubject(subjectName);
            setCurrentQuestionNumber(newNumber);
        },

        currentSubject,
        currentQuestionNumber,
        currentAcronym: currentQuestionAcronym,
    };
}

