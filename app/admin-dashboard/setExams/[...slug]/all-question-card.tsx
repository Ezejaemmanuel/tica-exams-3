// AllQuestionCardPage.tsx
"use client";
import React, { useEffect } from 'react';
import { useQuestions } from '@/lib/tenstack-hooks/admin-get-all-questions';
import { useFormStore, FormValues } from '@/lib/store/zuestand-store';
import ExamCard from './exam-card';

interface AllQuestionCardPageProps {
    examId: string;
    questionSubject: string;
}

const AllQuestionCardPage: React.FC<AllQuestionCardPageProps> = ({ examId, questionSubject }) => {
    const { data: allQuestions } = useQuestions(questionSubject, examId);
    const { setAllQuestionsLength, allQuestionsLength } = useFormStore();

    useEffect(() => {
        if (allQuestions) {
            setAllQuestionsLength(allQuestions.length);
        }
    }, [allQuestions, setAllQuestionsLength]);
    // Create a reversed copy of the allQuestions array
    const reversedQuestions = [...allQuestions].reverse();

    return (
        <div className='overflow-hidden '>
            <div>There are {allQuestionsLength}  questions</div>
            {reversedQuestions?.map((question) => (
                <ExamCard
                    key_={question.id}
                    questionNumber={question.questionNumber}
                    question={question.question}
                    optionA={question.optionA}
                    optionB={question.optionB}
                    optionC={question.optionC}
                    optionD={question.optionD}
                    correctAnswer={question.correctAnswer as "A" | "B" | "C" | "D"}
                />
            ))}
        </div>
    );
};
export default AllQuestionCardPage;
