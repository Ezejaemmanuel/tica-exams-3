// components/SubjectBadges.tsx
"use client";
import { ExamSubject } from '@/app/api/exam-Summary/route';
import { Badge } from '@/components/ui/badge';
import { useExamSummaryZuestanded } from '@/lib/tenstack-hooks/exam-summary-2';
import React from 'react';

const BadgeLocal = ({ number }: { number: number }) => (
    <Badge className="flex justify-center text-xs font-thin md:text-md md:w-10 md:h-10 items-center w-5 h-5 bg-blue-500 text-white rounded-full">
        {number}
    </Badge>
);

const SubjectSection = ({ subject }: { subject: ExamSubject }) => (
    <div>
        <h2 className="text-xl font-bold mb-4">{subject.name}</h2>
        <div className="flex flex-wrap gap-2">
            {Array.from({ length: subject.questionCount }, (_, i) => (
                <BadgeLocal key={i} number={i + 1} />
            ))}
        </div>
    </div>
);

export const SubjectBadges = () => {
    const { data: examData } = useExamSummaryZuestanded();

    return (
        <div className="p-4">
            {examData.subjects.map((subject) => (
                <div key={subject.name} className="mb-8">
                    <SubjectSection subject={subject} />
                </div>
            ))}
        </div>
    );
};

export default SubjectBadges;
