// Assuming these components and hooks are already defined and imported correctly
"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from "react";
import { useFormStore } from "@/lib/store/zuestand-store";
import { toast } from "sonner";
import { addBaseURL } from "@/lib/addBaseUrl";

// Define the props for the SetQuestionsCard component
interface SetQuestionsCardProps {
    questionNumber: number;
    questionSubject: string;
    examId: string;
}

// Define the form schema using zod
const formSchema = z.object({
    questionId: z.string().optional(),
    question: z.string().min(1, 'Question is required'),
    optionA: z.string().min(1, 'Option A is required'),
    optionB: z.string().min(1, 'Option B is required'),
    optionC: z.string().min(1, 'Option C is required'),
    optionD: z.string().min(1, 'Option D is required'),
    answer: z.enum(['A', 'B', 'C', 'D']),
});

// Define the form values type from the schema
export type FormValues = z.infer<typeof formSchema>;

// Define the mutation functions with strict types


export default function SetQuestionsCard({ questionNumber, questionSubject, examId }: SetQuestionsCardProps) {
    const queryClient = useQueryClient();
    const { formValues, setFormValues } = useFormStore(); // Use the store
    console.log("this is the formValues that is coming from the redis store", formValues);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formValues
    });
    const updateQuestion = async (questionData: FormValues) => {
        console.log("ths is the id inside of the updatequestion function", questionData.questionId);
        const url = addBaseURL(`api/set-and-update-questions?questionId=${questionData.questionId}&examId=${examId}&subject=${questionSubject}`)
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });

        if (!response.ok) {
            throw new Error('Failed to update question');
        }

        return response.json();
    };

    const createQuestion = async (questionData: Omit<FormValues, 'id'>) => {
        const url = addBaseURL(`api/set-and-update-questions?examId=${examId}&subject=${questionSubject}`)

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(questionData),
        });

        if (!response.ok) {
            throw new Error('Failed to create question');
        }

        return response.json();
    };
    const { reset, handleSubmit, control } = form;

    // Define the mutations using useMutation with strict types
    const updateMutation = useMutation<{ message: string }, Error, FormValues>({
        mutationFn: updateQuestion,
        mutationKey: ["updating-question"],
        onMutate: async (newData) => {
            // Add optimistic update logic here
        },
        onError: (err, newData, context) => {
            // Rollback the optimistic update
        },
        onSuccess: () => {
            // Invalidate the questions query to refetch it
            toast.info("invalidating questions", { duration: 1000 })

            queryClient.invalidateQueries({ queryKey: ["get-all-questions"] });
            handleAddNewQuestion();
        },

    });


    const createMutation = useMutation<{ message: string }, Error, Omit<FormValues, 'id'>>({
        mutationFn: createQuestion,
        mutationKey: ["creating-question"],
        onMutate: async (newData) => {
            // Add optimistic update logic here
        },
        onError: (err, newData, context) => {
            // Rollback the optimistic update
        },
        onSuccess: () => {
            toast.info("invalidating questions", { duration: 1000 })

            // Invalidate the questions query to refetch it
            queryClient.invalidateQueries({ queryKey: ["get-all-questions"] });
            handleAddNewQuestion()
        },



    });

    // Handle form submission with strict types
    const onSubmit = (values: FormValues) => {
        console.log("Form submission started with values:", values);
        console.log("this is the value id ", values.questionId);
        if (values.questionId) {
            // Update existing question
            console.log("Starting update mutation for existing question with ID:", values.questionId);
            toast.promise(
                updateMutation.mutateAsync(values),
                {
                    loading: 'Updating question...',
                    success: 'Question updated successfully!',
                    error: 'Failed to update question.',
                }
            );
        } else {
            // Create new question
            console.log("Starting create mutation for new question");
            toast.promise(
                createMutation.mutateAsync(values),
                {
                    loading: 'Creating question...',
                    success: 'Question created successfully!',
                    error: 'Failed to create question.',
                }
            );
        }
    };


    // Handle adding a new question
    const handleAddNewQuestion = () => {
        console.log("Handling add new question");
        // Reset the form for a new question, ensuring that the `id` field is not set
        reset({
            questionId: "",
            question: '',
            optionA: '',
            optionB: '',
            optionC: '',
            optionD: '',
            answer: 'A', // Set a default value or keep it empty based on your requirements
        });
        console.log("Form reset for new question");
        // Optionally, update the form store if needed
        setFormValues({
            ...form.getValues(),
            questionNumber: 0,
            questionId: "",
        });

    };

    // useEffect to reset the form when questionNumber changes
    useEffect(() => {
        // This will reset the form with the new values whenever formValues changes
        console.log("this is the formValue", formValues);
        reset(formValues);
    }, [formValues, reset]);
    return (
        <div className="max-w-lg mx-auto bg-white  dark:bg-black p-4">
            <div className="flex flex-col gap-4">
                <Card className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <CardHeader className="bg-gray-200 dark:bg-gray-700 p-4">
                        <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-200">Exam Questions</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                            {formValues.questionNumber === 0 ? <div>creating new question</div> : <div>updating question {formValues.questionNumber}</div>}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="question"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Question</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    {...field}
                                                    className="min-h-[100px] bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-800 dark:text-gray-200"
                                                    placeholder="Enter your question"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* FormField structures for each option (A, B, C, D) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {['A', 'B', 'C', 'D'].map((option) => (
                                        <FormField
                                            key={option}
                                            control={form.control}
                                            name={`option${option}` as "optionA" | "optionB" | "optionC" | "optionD"}

                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{`Option ${option}`}</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-gray-800 dark:text-gray-200"
                                                            placeholder={`Option ${option}`}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                                {/* FormField for the answer selection */}
                                <FormField
                                    control={form.control}
                                    name="answer"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="dark:text-white text-black">Answer</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>

                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select the correct answer" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="A">Option A</SelectItem>
                                                    <SelectItem value="B">Option B</SelectItem>
                                                    <SelectItem value="C">Option C</SelectItem>
                                                    <SelectItem value="D">Option D</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage color="blue" />
                                        </FormItem>
                                    )}
                                />
                                <CardFooter className="bg-gray-200 dark:bg-gray-700 p-4 flex justify-end space-x-4">
                                    <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2" type="submit">
                                        {formValues.questionId ? 'Update Question' : 'Create Question'}
                                    </Button>
                                    <Button
                                        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2"
                                        variant="outline"
                                        onClick={handleAddNewQuestion}
                                    >
                                        Add New Question
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>


                    </CardContent>

                </Card>

            </div>
        </div>
    )
}
