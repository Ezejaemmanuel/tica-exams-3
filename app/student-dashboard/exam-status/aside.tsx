// components/ExamStatusComponent.tsx
"use client";
import React from 'react';
import { format, addMinutes } from 'date-fns';
import { useExamStatus } from '@/lib/tenstack-hooks/exam-status';

interface ExamStatusComponentProps {
    classLevel: 'jss1' | 'ss1' | "jss2";
}

const ExamStatusComponent: React.FC<ExamStatusComponentProps> = ({ classLevel }) => {
    const { data, isError, error } = useExamStatus();
    console.log("this is the data", data);
    if (isError) {
        return <div className="text-red-500">Error: {error?.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    const examDateTime = data.examDateTime ? new Date(data.examDateTime) : null;
    const examEndDate = examDateTime && data.length ? addMinutes(examDateTime, data.length) : null;

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Exam Status</h2>
            {examDateTime && (
                <div className="space-y-2">
                    <p className="text-gray-700">
                        <span className="font-medium">Date:</span> {format(examDateTime, 'PPPP')}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">status</span> {data.status}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Time:</span> {format(examDateTime, 'p')}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-medium">Duration:</span> {data.length} minutes
                    </p>
                    {examEndDate && (
                        <p className="text-gray-700">
                            <span className="font-medium">End Time:</span> {format(examEndDate, 'p')}
                        </p>
                    )}
                </div>
            )}
            {!examDateTime && <p className="text-gray-700">Exam details are not available.</p>}
        </div>
    );
};

export default ExamStatusComponent;
