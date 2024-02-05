
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addBaseURL } from '@/lib/addBaseUrl';
import AnswerMutationState from './mutationState';
import { useUserAnswers } from '@/lib/tenstack-hooks/userAnswer';
import { SubmitState, useClickedQuestionBadgeStore, useExamSubmitStore, useQuestionStore, useUserAnswersStore, useUserExamStatusStore } from '@/lib/store/zuestand-store';
import SubjectBadgesDrawer from './drawer';
import { ExamStatus, useExamStatus } from '@/lib/tenstack-hooks/exam-status';
import { CustomAlert } from '@/components/custom-alert';
import { FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { PuffLoader } from 'react-spinners';
import { useUserExamStatus } from '@/lib/tenstack-hooks/user-exam-status';
import { UserExamStatus } from '@/lib/api/redis/exam-status';
import Link from 'next/link';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useUserQuestion } from '@/lib/tenstack-hooks/userQuestion';

const formSchema = z.object({
    selectedOption: z.enum(["A", "B", "C", "D", "non"]).optional(),
    questionAcronym: z.string(), // Add questionAcronym to the schema
});
export type FormSchemaForAnswers = z.infer<typeof formSchema>;

interface UserQuestionProps {
    initialAcronym: string;
}

export const UserQuestion: React.FC<UserQuestionProps> = ({ initialAcronym }) => {
    const router = useRouter();
    const { updateUserAnswer } = useUserAnswersStore.getState();
    const { shouldSubmit, setShouldSubmit } = useExamSubmitStore();
    const { isError, data: examStatusData } = useExamStatus();
    const { isSubmitMode, toggleSubmitMode } = useClickedQuestionBadgeStore();

    console.log("thsi is the examstatus that is returned inside the aside 1", examStatusData);
    const { isError: isErroForUser } = useUserExamStatus();
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
    const userExamStatusData = useUserExamStatusStore((state) => state.userExamStatusData);
    const updateUserExamStatusData = useUserExamStatusStore((state) => state.updateUserExamStatus);

    const [alertOpen, setAlertOpen] = useState(false);
    const [alertContent, setAlertContent] = useState(<></>);
    const [alertBgColor, setAlertBgColor] = useState('bg-black');
    const { data, error, isFetching, navigateQuestions } = useUserQuestion({ initialAcronym });
    // const { data, isError, error, isFetching, navigateQuestions, currentQuestionNumber, currentSubject, currentAcronym } = useUserQuestion({ initialAcronym });

    const { data: userAnswersTenstack } = useUserAnswers(); // Fetch user answers
    const userAnswers = useUserAnswersStore((state) => state.userAnswersData) || {};
    const currentSubject = useQuestionStore(state => state.currentSubject);
    const currentQuestionNumber = useQuestionStore(state => state.currentQuestionNumber);
    const currentAcronym = useQuestionStore(state => state.currentQuestionAcronym);
    console.log("this is the useranswers inside of userquestion", userAnswers);


    // console.log("this is he user answers", userAnswers);
    console.log("this is the currentAcronymn", currentAcronym);
    const currentUserAnser = userAnswers[currentAcronym];

    const form = useForm<FormSchemaForAnswers>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selectedOption: userAnswers[currentAcronym] as FormSchemaForAnswers["selectedOption"] || "non",
            questionAcronym: currentAcronym, // Set the initial value for questionAcronym
        },
    });

    const registerUser = async (userAnswer: FormSchemaForAnswers) => {
        const url = addBaseURL(`api/answer`); // Removed query parameter
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userAnswer), // questionAcronym is now part of the body
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        const data: { message: string } = await response.json();
        return data;
    };


    const calculateResultMutation = useMutation({
        mutationKey: ['calculateResult'],
        mutationFn: async (acronym: string) => {
            const url = addBaseURL('api/calculateResult');
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ acronym }),
            });

            if (!response.ok) {
                throw new Error('Failed to calculate result');
            }

            return response.json();
        },
        onMutate: () => {
            setAlertContent(<PuffLoader color="#36D7B7" size={100} />);
            setAlertBgColor('bg-white');
            setAlertOpen(true);
        },
        onSuccess: () => {


            setAlertContent(<MdCheckCircle className="text-green-500" size="100" />);
            setAlertBgColor('bg-green-500');
            setTimeout(() => setAlertOpen(false), 1000);
            updateUserExamStatusData(UserExamStatus.ResultPresent);
            setShouldSubmit(SubmitState.Submitted);
            sessionStorage.clear();

            router.push('/student-dashboard');

        },
        onError: (error) => {
            setAlertContent(<MdCancel className="text-red-500" size="100" />);
            setAlertBgColor('bg-red-500');
            setTimeout(() => setAlertOpen(false), 3000);
            router.push("/student-dashboard")
        },
    });

    const handleConfirmSubmit = () => {
        setIsAlertDialogOpen(false); // Close the dialog
        calculateResultMutation.mutateAsync(initialAcronym); // Trigger the new mutation with the initialAcronym
    };

    const handleSubmitButtonClick = () => {
        setIsAlertDialogOpen(true); // Open the alert dialog when submit button is clicked
    };

    function onSubmit(data: FormSchemaForAnswers) {
        // console.log("i am about to submit", data);
        // Ensure that the selected option is not "non" and is different from the previously selected answer
        if (data.selectedOption !== "non" && data.selectedOption !== currentUserAnser as FormSchemaForAnswers["selectedOption"]) {
            // console.log("this is the updated data in the submit form", { ...data, questionAcronym: currentAcronym })
            submitQuestionMutation.mutateAsync({ ...data, questionAcronym: currentAcronym }); // Ensure questionAcronym is included
        }
        // Update the form's selectedOption to reflect the current or previous user answer
        form.setValue('selectedOption', currentUserAnser as FormSchemaForAnswers["selectedOption"] || "non", { shouldValidate: false });
    }

    useEffect(() => {
        if (shouldSubmit === SubmitState.ShouldSubmit) {
            router.push('/calculateResult'); // Redirect to the calculateResult page
        }
    }, [shouldSubmit, router]);


    const submitQuestionMutation = useMutation<{ message: string }, Error, FormSchemaForAnswers>({
        mutationKey: ['answer', currentAcronym],
        mutationFn: registerUser,
        onSuccess(data, variables, context) {
            if (variables.selectedOption) {

                updateUserAnswer(currentAcronym, variables.selectedOption);
            }
        },
        onError(error, variables, context) {
            // console.log(`An error occurred: ${error}`);
        },
    });

    const handleNavigate = (direction: 'next' | 'prev') => {

        navigateQuestions(direction);
        // form.setValue('selectedOption', currentUserAnser as FormSchemaForAnswers["selectedOption"] || "non", { shouldValidate: false });

    };

    // The rest of your component remains unchanged


    if (examStatusData?.status === ExamStatus.NotYet) {
        return (
            <AlertDialog open={examStatusData?.status === ExamStatus.NotYet}>
                <AlertDialogContent className="text-red-700 bg-red-100">
                    <AlertDialogHeader className="flex items-center space-x-2">
                        <FaExclamationTriangle className="text-red-500" />
                        <AlertDialogTitle>Access Denied</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        there is no exam yet
                    </AlertDialogDescription>
                    {/* <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                        <AlertDialogCancel asChild>
                            <button className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">Cancel</button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                            <button className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600" >Confirm</button>
                        </AlertDialogAction>
                    </AlertDialogFooter> */}
                </AlertDialogContent>
            </AlertDialog>
        )
    }
    console.log("this is he exmastatus data ", examStatusData);
    console.log("this is the userExam")
    if (examStatusData?.status !== ExamStatus.ExamOngoing || userExamStatusData === UserExamStatus.ResultPresent || userExamStatusData === UserExamStatus.Submitted) {
        return (
            <AlertDialog open={true}>
                <AlertDialogContent className="text-red-700 bg-red-100">
                    <AlertDialogHeader className="flex items-center space-x-2">
                        <FaExclamationTriangle className="text-red-500" />
                        <AlertDialogTitle>Access Denied</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                        the exam might has finished or have not started yet or you have already submitted
                    </AlertDialogDescription>
                    <AlertDialogFooter className="flex justify-end space-x-2 mt-4">
                        {/* <AlertDialogCancel asChild>
                            <button className="px-4 py-2 rounded text-white bg-gray-500 hover:bg-gray-600">Cancel</button>
                        </AlertDialogCancel> */}
                        <AlertDialogAction asChild>
                            <Link href={"/student-dashboard"} className="px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600" >Confirm</Link>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        )
    }
    return (
        <>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl  p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                    <div className="flex items-center justify-between">
                        <h2 className="md:text-xl text-sm  font-bold text-gray-900 dark:text-gray-100">Question {currentQuestionNumber}</h2>
                        <h2 className="md:text-xl text-sm font-bold text-gray-900 dark:text-gray-100">{currentSubject}</h2>
                    </div>
                    <p className="mt-2 text-gray-600 text-xs md:text-sm dark:text-gray-400">{data.question}</p>
                    <FormField
                        control={form.control}
                        name="selectedOption"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                    <div className="mt-6 space-y-4">
                                        <RadioGroup id={`${data.question}`}  {...field}
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}

                                            aria-labelledby="question1" className="flex flex-col space-y-2" >
                                            <Label className="flex items-center space-x-2" >
                                                <RadioGroupItem className="peer" value="A" />
                                                <span className="text-gray-900 dark:text-gray-100">{data.optionA}</span>
                                            </Label>
                                            <Label className="flex items-center space-x-2" >
                                                <RadioGroupItem className="peer" value="B" />
                                                <span className="text-gray-900 dark:text-gray-100">{data.optionB}</span>
                                            </Label>
                                            <Label className="flex items-center space-x-2" >
                                                <RadioGroupItem className="peer" value="C" />
                                                <span className="text-gray-900 dark:text-gray-100">{data.optionC}</span>
                                            </Label>
                                            <Label className="flex items-center space-x-2" >
                                                <RadioGroupItem className="peer" value="D" />
                                                <span className="text-gray-900 dark:text-gray-100">{data.optionD}</span>
                                            </Label>
                                            <Label className=" hidden items-center space-x-2" >
                                                <RadioGroupItem className="peer" value="non" />
                                                <span className="text-gray-900 dark:text-gray-100">{""}</span>
                                            </Label>
                                        </RadioGroup>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='fixed bottom-5 left-[50%] w-auto sm:w-auto px-4 py-2'>
                        <AnswerMutationState mutationKey={["answer", currentAcronym]} />
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                        <Button
                            type="submit"
                            onClick={() => handleNavigate('prev')}
                            className="w-full sm:w-1/3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                        >
                            Previous Question
                        </Button>
                        {isSubmitMode ? (
                            <Button
                                type="submit"
                                onClick={() => {
                                    handleNavigate('next'); // Assuming this function handles the submit action
                                    toggleSubmitMode(false); // Switch back to normal mode after submission
                                }}
                                className="w-full sm:w-1/3 text-white bg-red-600 text-xs md:text-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 animate-pulse"
                            >
                                Submit
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                onClick={() => handleNavigate('next')}
                                className="w-full sm:w-1/3 text-white bg-green-600 text-xs md:text-md hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                                Next Question
                            </Button>
                        )}

                        <Button
                            type="button"
                            onClick={handleSubmitButtonClick}
                            className="fixed bottom-2 left-2  md:bottom-[5%] md:left-[30%] text-xs md:text-md  w-auto sm:w-auto px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Submit
                        </Button>

                        {/* Custom Alert Dialog for submission confirmation */}
                        <CustomAlert
                            open={isAlertDialogOpen}
                            onOpenChange={setIsAlertDialogOpen}
                            Icon={<FaExclamationTriangle className="text-red-500" />}
                            onConfirm={handleConfirmSubmit}
                            title='You want to submit????'
                            description="Are you sure you want to submit the questions? The exam will end if you submit."
                            bgColor={'bg-red-300'} textColor={'text-black font-bold text-md'}                        // Assuming your CustomAlertDialog supports an icon prop
                        />


                        <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                            <AlertDialogContent className={`bg-black flex items-center justify-center p-4`}>
                                {alertContent}
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </form>
            </Form>


        </>

    );
};
