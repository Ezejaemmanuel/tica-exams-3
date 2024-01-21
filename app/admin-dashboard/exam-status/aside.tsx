"use client";
import React, { useState, Suspense } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { ExamStatus, ExamStatusEnum } from '@/app/api/(admin)/admin-exam-status/route';
import { useExamStatus } from '@/lib/tenstack-hooks/admin-exam-status';
import { Badge } from '@/components/ui/badge';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import CustomCard from '@/components/customCard';
import AddNewExam from './add-new-exam';

function ExamStatusComponent() {
    const [revalidate, setRevalidate] = useState<string>('false');
    const { data, status, error } = useExamStatus(revalidate).data;

    const handleRevalidateClick = () => {
        setRevalidate('true');
    };

    const renderExamCard = (exam: ExamStatus) => {
        const examDate = new Date(exam.exam.date);
        const isUpcoming = examDate > new Date();
        const dateDisplay = format(examDate, 'PPPP');
        const fromNow = formatDistanceToNow(examDate, { addSuffix: true });
        const durationDisplay = `${exam.exam.lengthOfExam} minutes`;
        const questionsDisplay = `The exam contains ${exam.englishQuestionsCount} English questions, ${exam.mathQuestionsCount} Math questions, and ${exam.generalStudiesQuestionsCount} General Studies questions.`;
        const studentsDisplay = `The exam will ${isUpcoming ? 'be' : 'was'} written by ${exam.usersWritingExamCount} students.`;

        return (
            <CustomCard
                icon={FaCalendarAlt}
                title={`Exam ID: ${exam.exam.id}`}
                content={`For ${exam.exam.classLevel}, which ${isUpcoming ? 'will take place on' : 'took place on'} ${dateDisplay} (${fromNow}). The exam ${isUpcoming ? 'will last' : 'lasted'} for ${durationDisplay}. ${questionsDisplay} ${studentsDisplay}`}
                cardColor="bg-white dark:bg-black text-black dark:text-white"
                ringColor="ring-blue-200 dark:ring-blue-900"
                contentTextSize='text-xs'
            // Add any additional props you need for CustomCard
            />
        );
    };

    return (
        <div className="space-y-4">
            <div className='flex space-x-2'>
                {status === ExamStatusEnum.ExamData && data && data.map(renderExamCard)}
                <AddNewExam additionalText={'Click the button below to add a new exam'} />
            </div>
            {status === ExamStatusEnum.NoExamYet && (
                <AddNewExam additionalText={'no exam has been set,Click to add a new exam'} />
            )}
            {error && (
                <div className="text-red-500">Error fetching exam status: {error}</div>
            )}
            <Badge
                onClick={handleRevalidateClick}
                className={`mt-4 px-4 py-2 text-white font-bold rounded fixed bottom-10 right-3 cursor-pointer ${revalidate === 'true'
                    ? 'bg-red-500 hover:bg-red-700 animate-bounce'
                    : 'bg-blue-500 hover:bg-blue-700'
                    }`}
            >
                {revalidate === 'true' ? 'Data is not cached... Click to enable caching' : 'Revalidate Data'}
            </Badge>
        </div>
    );
}

export default ExamStatusComponent;
