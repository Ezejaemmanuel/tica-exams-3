// components/UserQuestion.tsx
"use client";
import { useUserQuestion } from '@/lib/tenstack-hooks/userQuestion';
import React from 'react';

interface UserQuestionProps {
    initialAcronym: string;
}

const UserQuestion: React.FC<UserQuestionProps> = ({ initialAcronym }) => {
    const { data, isError, error, isFetching, navigateQuestions } = useUserQuestion({ initialAcronym });

    if (isFetching) return <div className="text-center text-gray-500">Loading...</div>;
    if (isError && error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            {data && (
                <>
                    <div className="text-lg font-semibold mb-4">Question {data.questionNumber}</div>
                    <div className="mb-2 p-2 bg-white shadow rounded-md w-full">
                        <p className="text-gray-700">{data.question}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mt-4">
                        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">{data.optionA}</button>
                        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">{data.optionB}</button>
                        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">{data.optionC}</button>
                        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">{data.optionD}</button>
                    </div>
                    <div className="flex justify-between w-full mt-6">
                        <button
                            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition-colors"
                            onClick={() => navigateQuestions('prev')}
                        >
                            Previous
                        </button>
                        <button
                            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition-colors"
                            onClick={() => navigateQuestions('next')}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserQuestion;
