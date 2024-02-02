// ExamPage.tsx
import React, { Suspense } from 'react';
import ExamInstructions from './aside';
import { CardSkeletonArray } from '../student-dashboard/cardsSkeleton';

const subjects = [
    { name: 'Mathematics', questionCount: 10 },
    { name: 'Science', questionCount: 15 },
    { name: 'History', questionCount: 5 },
];

const ExamPage = () => {
    return (
        <>
            <Suspense fallback={<CardSkeletonArray amount={5} orientation='vertical' />}>
                <ExamInstructions />
            </Suspense>
            {/* Other components for the exam page */}
        </>
    );
};

export default ExamPage;
