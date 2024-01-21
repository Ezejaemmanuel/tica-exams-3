"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormValues, useFormStore } from "@/lib/store/zuestand-store";
import { useEffect } from "react";



// Define the props for the SetQuestionsCard component
interface SetQuestionsCardProps {
    questionNumber: number;
    questionSubject: string;
    examId: string;
}


interface SetQuestionsCardProps {
    questionNumber: number;
    questionSubject: string;
    examId: string;
}

const formSchema = z.object({
    question: z.string().min(1, 'Question is required'),
    optionA: z.string().min(1, 'Option A is required'),
    optionB: z.string().min(1, 'Option B is required'),
    optionC: z.string().min(1, 'Option C is required'),
    optionD: z.string().min(1, 'Option D is required'),
    answer: z.enum(['A', 'B', 'C', 'D']),
});

export default function SetQuestionsCard({ questionNumber, questionSubject, examId }: SetQuestionsCardProps) {
    const { formValues, setFormValues } = useFormStore(); // Use the store

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: formValues
    });

    const { reset } = form;

    useEffect(() => {
        // This will reset the form with the new values whenever formValues changes
        console.log("this is the formValue", formValues);
        reset(formValues);
    }, [formValues, reset]);

    const onSubmit = (values: FormValues) => {
        setFormValues(values); // Update the store with new form values
        console.log(values);
    };


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
                                        Submit
                                    </Button>
                                    <Button
                                        className="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-md px-4 py-2"
                                        variant="outline"
                                    >
                                        Add Question
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


