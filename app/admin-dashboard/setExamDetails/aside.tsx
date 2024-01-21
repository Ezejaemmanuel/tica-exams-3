"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import TimePicker from 'react-time-picker';
import { useMutation } from "@tanstack/react-query";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const examDetailsSchema = z.object({
    // examStartDate: z.date().min(new Date(), "Please enter the exam time"),
    examStartDate: z.date(),
    classLevel: z.enum(["JSS1", "SS1"]),
    length: z.coerce.number().gte(1).lte(9999999999),
    examTime: z.string().min(1, "Please enter the exam time"),
});

// Infer the TypeScript type from the Zod schema
export type ExamDetails = z.infer<typeof examDetailsSchema>;

export function SetExamDetailsForm() {
    const router = useRouter();
    const form = useForm<ExamDetails>({
        resolver: zodResolver(examDetailsSchema),
        defaultValues: {
            length: 1,
        },
    });


    const createExamMutation = useMutation({
        mutationKey: ['createExam'],
        mutationFn: async (examDetails: ExamDetails) => {
            const response = await fetch('/api/create-exam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(examDetails),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            return response.json();
        },
        onSuccess: () => {
            toast.loading(' redirecting to dashboard in 2 seconds ');

            setTimeout(() => {
                router.push('/admin-dashboard');
            }, 2000);
        },
        onError: (error: Error) => {
            toast.error(`Error: ${error.message}`);
        },
    });

    const onSubmit = (values: ExamDetails) => {
        // Parse the examStartDate to create a Date object
        const examDate = new Date(values.examStartDate);
        // Parse the examTime string to extract hours and minutes
        const [hours, minutes] = values.examTime.split(':').map(Number);
        // Set the hours and minutes for the examDate
        examDate.setHours(hours, minutes, 0, 0);

        // Create a new object with the updated examTime as a Date object
        const updatedValues = {
            ...values,
            examStartDate: examDate,
        };

        console.log("this is the values in the frontend 00000", updatedValues);

        toast.promise(
            createExamMutation.mutateAsync(updatedValues),
            {
                loading: 'Creating exam...',
                success: 'Exam created successfully!',
                error: 'Error creating exam!',
            }
        );
    };


    return (
        <div className="max-w-lg mx-auto items-center  shadow-lg border flex justify-center  md:my-12 bg-white dark:bg-black rounded-lg p-6 space-y-6">
            <Form {...form} >
                <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  m-10">

                    <FormField
                        control={form.control}
                        name='examStartDate'
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-semibold text-gray-700 dark:text-gray-300">Exam Start Date</FormLabel>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick the date for the exams </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            // disabled={(date) =>
                                            //   date > new Date() || date < new Date("1900-01-01")
                                            // }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="classLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700 dark:text-gray-300">Class Level</FormLabel>

                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="class involved" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="JSS1">jss1</SelectItem>
                                        <SelectItem value="SS1">ss1</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="examTime"
                        render={({ field, fieldState }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="font-semibold text-gray-700 dark:text-gray-300">Exam Time</FormLabel>
                                <FormControl>
                                    <TimePicker
                                        onChange={field.onChange}
                                        value={field.value}
                                        disableClock={true}
                                        className="w-full text-black dark:text-white"
                                    />
                                </FormControl>
                                {fieldState.error && (
                                    <FormMessage className="text-red-500">{fieldState.error.message}</FormMessage>
                                )}
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Enter the time for the exam.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700 dark:text-gray-300">Length of Exam (minutes)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Length of exam in minutes" {...field} className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm" />
                                </FormControl>
                                <FormDescription className="text-gray-500 dark:text-gray-400">
                                    Enter the duration of the exam in minutes.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={createExamMutation.isPending} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
}
