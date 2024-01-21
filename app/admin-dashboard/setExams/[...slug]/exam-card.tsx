// ExamCard.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormValues, useFormStore } from '@/lib/store/zuestand-store';

interface ExamCardProps {
    questionId: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D'; // Ensure this is typed correctly
}

const ExamCard: React.FC<ExamCardProps> = ({
    questionId,
    questionNumber,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
}) => {
    const { formValues, setFormValues } = useFormStore();
    const handleEditClick = () => {
        setFormValues({
            questionId: questionId,
            questionNumber: questionNumber,
            question: question,
            optionA: optionA,
            optionB: optionB,
            optionC: optionC,
            optionD: optionD,
            answer: correctAnswer, // or whatever the default should be
        });
    };
    return (
        <main className="flex flex-col items-center min-w-0 max-w-full mx-auto justify-center flex-1 p-4 relative md:p-8">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md space-y-2 dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Question {questionNumber}</h2>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{question}</p>
                <div className="mt-6 space-y-4">
                    <RadioGroup aria-labelledby={`question${questionNumber}`} className="flex flex-col space-y-2">
                        <Label className="flex items-center space-x-2" htmlFor={`optionA-${questionNumber}`}>
                            <RadioGroupItem className="peer" id={`optionA-${questionNumber}`} value="A" />
                            <span className="text-gray-900 dark:text-gray-100">{optionA}</span>
                        </Label>
                        <Label className="flex items-center space-x-2" htmlFor={`optionB-${questionNumber}`}>
                            <RadioGroupItem className="peer" id={`optionB-${questionNumber}`} value="B" />
                            <span className="text-gray-900 dark:text-gray-100">{optionB}</span>
                        </Label>
                        <Label className="flex items-center space-x-2" htmlFor={`optionC-${questionNumber}`}>
                            <RadioGroupItem className="peer" id={`optionC-${questionNumber}`} value="C" />
                            <span className="text-gray-900 dark:text-gray-100">{optionC}</span>
                        </Label>
                        <Label className="flex items-center space-x-2" htmlFor={`optionD-${questionNumber}`}>
                            <RadioGroupItem className="peer" id={`optionD-${questionNumber}`} value="D" />
                            <span className="text-gray-900 dark:text-gray-100">{optionD}</span>
                        </Label>
                    </RadioGroup>
                </div>
                <div className='text-sm'>
                    correct answer {correctAnswer}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <Button
                        className="w-full sm:w-1/3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                    {/* ... Delete button ... */}
                </div>
            </div>
        </main>
    );
};

export default ExamCard;