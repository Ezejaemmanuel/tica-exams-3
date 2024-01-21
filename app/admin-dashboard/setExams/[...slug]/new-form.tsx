// Assuming these components and hooks are already defined and imported correctly
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

// Define the props for the SetQuestionsCard component
interface SetQuestionsCardProps {
    questionNumber: number;
    questionSubject: string;
    examId: string;
}

// Define the form schema using zod
const formSchema = z.object({
    id: z.string().optional(),
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
const updateQuestion = async (questionData: FormValues) => {
    const response = await fetch(`/api/questions?questionId=${questionData.id}&exam`, {
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
    const response = await fetch('/api/questions', {
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

export default function SetQuestionsCard({ questionNumber, questionSubject, examId }: SetQuestionsCardProps) {
    const queryClient = useQueryClient();
    const { formValues, setFormValues } = useFormStore(); // Use the store

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formValues
    });
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
        onSettled: () => {
            // Invalidate the questions query to refetch it
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
        onSettled: () => {
            // Invalidate the questions query to refetch it
        },


    });

    // Handle form submission with strict types
    const onSubmit = (values: FormValues) => {
        const mutationFn = values.id ? updateMutation.mutateAsync : createMutation.mutateAsync;
        const action = values.id ? 'Updating' : 'Creating';

        toast.promise(
            mutationFn(values),
            {
                loading: `${action} question...`,
                success: 'Question saved successfully!',
                error: (err) => `Failed to save question: ${err.message}`,
            }
        );
    };

    // Handle adding a new question
    const handleAddNewQuestion = () => {
        reset(); // Reset the form for a new question
        // Set the question number to "Adding New" or a similar indicator
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
                            question {formValues.questionNumber}
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
