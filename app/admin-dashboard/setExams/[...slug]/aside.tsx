// TwoSidedLayout.tsx
import React, { Suspense } from 'react';
import { CardSkeletonArray } from '@/app/student-dashboard/cardsSkeleton';
import { useFormStore } from '@/lib/store/zuestand-store';
import AllQuestionCardPage from './all-question-card';
import SetQuestionsCard from './new-form';

interface TwoSidedLayoutProps {
    subject: string;
    examId: string;
}

const TwoSidedLayout: React.FC<TwoSidedLayoutProps> = ({ subject, examId }) => {

    return (
        <div className="flex">
            <div className="flex-1 p-4 border-r-2 relative border-gray-300 ">
                <SetQuestionsCard
                    questionNumber={0}
                    questionSubject={subject}
                    examId={examId}
                />
            </div>
            <Suspense fallback={<CardSkeletonArray amount={5} orientation='vertical' />}>
                <div className="flex flex-col w-[60%] flex-[2] mx-auto justify-center items-center">
                    <AllQuestionCardPage questionSubject={subject} examId={examId} />
                </div>
            </Suspense>
        </div>
    );
};

export default TwoSidedLayout;
