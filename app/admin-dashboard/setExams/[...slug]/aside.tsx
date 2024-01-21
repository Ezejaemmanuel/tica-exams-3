"use client";
import React, { Suspense, useState } from 'react';
import SetQuestionsCard from "./form-to-set-question";
import AllQuestionCardPage from "./one-question-card";
import { CardSkeletonArray } from '@/app/student-dashboard/cardsSkeleton';

export interface FormDefaultValues {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: 'A' | 'B' | 'C' | 'D';
}

interface TwoSidedLayoutProps {
    subject: string;
    examId: string;
}

const TwoSidedLayout: React.FC<TwoSidedLayoutProps> = ({ subject, examId }) => {
    // Use useState to manage the default values
    const [defaultValues, setDefaultValues] = useState<FormDefaultValues>({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: 'A'
    });

    // Function to update the default values
    const updateDefaultValues = (newValues: FormDefaultValues) => {
        setDefaultValues(newValues);
    };

    return (
        <div className="flex">
            <div className="flex-1 p-4 border-r-2 relative border-gray-300 ">
                <SetQuestionsCard
                    defaultValues={defaultValues}
                    questionNumber={0}
                    questionSubject={subject}
                    examId={examId}
                // updateDefaultValues={updateDefaultValues} // Pass the update function as a prop
                />
            </div>
            <Suspense fallback={<CardSkeletonArray amount={5} orientation='vertical' />}>
                <div className="flex-1">
                    {/* Right component content goes here */}
                    <AllQuestionCardPage updateDefaultValues={updateDefaultValues} questionSubject={subject}
                        examId={examId} />
                </div>
            </Suspense>
        </div>
    );
};

export default TwoSidedLayout;
