// AllQuestionCardPage.tsx
"use client";
import React, { useEffect } from 'react';
import { useQuestions } from '@/lib/tenstack-hooks/admin-get-all-questions';
import { useFormStore } from '@/lib/store/zuestand-store';
import ExamCard from './exam-card';
import { Badge } from '@/components/ui/badge';
import SubjectButtons from './buttons-selection';

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
        <div className='min-h-screen '>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='pt-6 pb-8 space-y-4'>
                    <Badge>
                        There are {allQuestionsLength} questions
                    </Badge>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-start'>
                        <SubjectButtons examId={examId} />
                    </div>
                    <div className='grid  gap-4'>
                        {reversedQuestions?.map((question, index) => (
                            <ExamCard
                                key={question.id}
                                examId={examId}
                                questionSubject={questionSubject}
                                questionId={question.id}
                                questionNumber={index + 1}
                                question={question.question}
                                optionA={question.optionA}
                                optionB={question.optionB}
                                optionC={question.optionC}
                                optionD={question.optionD}
                                correctAnswer={question.correctAnswer as "A" | "B" | "C" | "D"}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllQuestionCardPage;
