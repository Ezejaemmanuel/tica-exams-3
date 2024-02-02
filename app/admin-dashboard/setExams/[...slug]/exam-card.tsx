"use client";
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useFormStore } from '@/lib/store/zuestand-store';
import { toast } from 'sonner';
import { addBaseURL } from '@/lib/addBaseUrl';

interface ExamCardProps {
    questionId: string;
    questionSubject: string;
    examId: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
}

const ExamCard: React.FC<ExamCardProps> = ({
    questionId,
    examId,
    questionSubject,
    questionNumber,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
}) => {
    const { setFormValues } = useFormStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const queryClient = useQueryClient();


    const deleteMutation = useMutation({
        mutationFn: async () => {
            const url = addBaseURL(`api/set-and-update-questions?questionId=${questionId}&examId=${examId}&subject=${questionSubject}`)

            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            toast.info("invalidating questions", { duration: 1000 })

            queryClient.invalidateQueries({ queryKey: ["get-all-questions"] });

        },
        onSettled: () => {
            setIsDialogOpen(false);
        },

    });

    const handleDelete = () => {
        setIsDialogOpen(false);
        toast.promise(
            deleteMutation.mutateAsync(),
            {
                loading: 'Deleting question...',
                success: 'Question deleted successfully',
                error: 'Error deleting question',
            }
        );
    };

    return (
        <main className="flex flex-col items-center min-w-md max-w-full mx-auto justify-center flex-1 p-4 relative md:p-8">
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
                        onClick={() => setFormValues({
                            questionId: questionId,
                            questionNumber: questionNumber,
                            question: question,
                            optionA: optionA,
                            optionB: optionB,
                            optionC: optionC,
                            optionD: optionD,
                            answer: correctAnswer,
                        })}
                    >
                        Edit
                    </Button>
                    <Button
                        className="w-full sm:w-1/3 text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Delete
                    </Button>
                    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" style={{ display: 'none' }}>Show Dialog</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete question {questionNumber}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel asChild>
                                    <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                </AlertDialogCancel>
                                <AlertDialogAction asChild>
                                    <Button onClick={handleDelete}>Continue</Button>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </main>
    );
};

export default ExamCard;
