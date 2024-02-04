// Import React and necessary hooks and components
"use client";
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { useExamSummaryZuestanded } from '@/lib/tenstack-hooks/exam-summary-2';
import { useClickedQuestionBadgeStore, useDrawerStore, useQuestionStore, useUserAnswersStore } from '@/lib/store/zuestand-store';
import { ExamSubject } from '../api/exam-Summary/types';
import { FormSchemaForAnswers } from './aside';
import { addBaseURL } from '@/lib/addBaseUrl';
import { useMutation } from '@tanstack/react-query';

// BadgeLocal component
const BadgeLocal = ({ number, color, onClick }: { number: number; color: string; onClick: () => void }) => (
    <Badge onClick={onClick} className={`cursor-pointer flex justify-center text-xs font-thin  md:text-sm lg:text-md  md:w-8 md:h-8 lg:w-10 lg:h-10 items-center w-5 h-5 text-white rounded-full ${color}`}>
        {number}
    </Badge>
);
const registerUser = async (userAnswer: FormSchemaForAnswers) => {
    const url = addBaseURL(`api/answer`); // Removed query parameter
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userAnswer), // questionAcronym is now part of the body
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    const data: { message: string } = await response.json();
    return data;
};
// SubjectSection component
const SubjectSection = ({ subject, userAnswers, currentQuestionAcronym }: { subject: ExamSubject; userAnswers: { [key: string]: string }; currentQuestionAcronym: string }) => {
    const { setQuestionAcronym, setCurrentSubject, setCurrentQuestionNumber } = useQuestionStore();
    const { updateUserAnswer } = useUserAnswersStore.getState();
    const { isSubmitMode, toggleSubmitMode } = useClickedQuestionBadgeStore();
    const { isOpen, openDrawer, closeDrawer } = useDrawerStore();

    const subjectPrefix = {
        English: 'E',
        'General Studies': 'G',
        Mathematics: 'M',
    }[subject.name];
    const submitQuestionMutation = useMutation<{ message: string }, Error, FormSchemaForAnswers>({
        mutationKey: ['answer', currentQuestionAcronym],
        mutationFn: registerUser,
        onSuccess(data, variables, context) {
            if (variables.selectedOption) {

                updateUserAnswer(currentQuestionAcronym, variables.selectedOption)
            }
        },
        onError(error, variables, context) {
            // console.log(`An error occurred: ${error}`);
        },
    });
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">{subject.name}</h2>
            <div className="flex flex-wrap gap-2">
                {Array.from({ length: subject.questionCount }, (_, i) => {
                    const questionNumber = i + 1;
                    const questionAcronym = `${subjectPrefix}-${questionNumber}`;
                    let color = 'bg-red-500'; // Default color for unanswered questions
                    if (userAnswers && userAnswers[questionAcronym]) {
                        color = 'bg-blue-500'; // Color for answered questions
                    }
                    if (questionAcronym === currentQuestionAcronym) {
                        color = 'bg-purple-500 animate-pulse'; // Color for the current question
                    }
                    return (
                        <BadgeLocal
                            key={i}
                            number={questionNumber}
                            color={color}
                            onClick={() => {
                                setQuestionAcronym(questionAcronym);
                                setCurrentSubject(subject.name);
                                setCurrentQuestionNumber(questionNumber);
                                toggleSubmitMode(true);
                                closeDrawer();

                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

// SubjectBadges component
export const SubjectBadges = () => {
    const { data: examData } = useExamSummaryZuestanded();
    const userAnswers = useUserAnswersStore((state) => state.userAnswersData) || {};
    const currentQuestionAcronym = useQuestionStore((state) => state.questionAcronym);

    return (
        <div className="p-4">
            {examData && examData.subjects.map((subject) => (
                <div key={subject.name} className="mb-8 text-xs md:text-base">
                    <SubjectSection subject={subject} userAnswers={userAnswers} currentQuestionAcronym={currentQuestionAcronym} />
                </div>
            ))}
        </div>
    );
};

export default SubjectBadges;