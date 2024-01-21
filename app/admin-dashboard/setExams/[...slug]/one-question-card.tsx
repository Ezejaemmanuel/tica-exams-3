import { useQuestions } from '@/lib/tenstack-hooks/admin-get-all-questions';
import React from 'react';
import ExamCard from './exam-card';

export interface FormDefaultValues {
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    answer: 'A' | 'B' | 'C' | 'D';
}

interface AllQuestionCardPageProps {
    updateDefaultValues: (newValues: FormDefaultValues) => void;
    examId: string;
    questionSubject: string;
}

const AllQuestionCardPage: React.FC<AllQuestionCardPageProps> = ({ updateDefaultValues, examId, questionSubject }) => {
    const { data: allQuestions } = useQuestions(questionSubject, examId);

    return (
        <div className='overflow-hidden w-full flex-1'>
            {allQuestions?.map((question) => (
                <ExamCard
                    key_={question.id}
                    questionNumber={question.questionNumber}
                    question={question.question}
                    optionA={question.optionA}
                    optionB={question.optionB}
                    optionC={question.optionC}
                    optionD={question.optionD}
                    correctAnswer={question.correctAnswer}
                    updateDefaultValues={updateDefaultValues}
                />
            ))}
        </div>
    );
};

export default AllQuestionCardPage;