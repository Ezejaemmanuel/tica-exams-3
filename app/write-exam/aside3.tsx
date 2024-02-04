

"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useUserQuestion } from "@/lib/tenstack-hooks/userQuestion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import BatteryStatus from './batteryStatus';

const formSchema = z.object({
    selectedOption: z.enum(["optionA", "optionB", "optionC", "optionD"]).optional(),
});
export type FormSchemaForAnswers = z.infer<typeof formSchema>;

interface UserQuestionProps {
    initialAcronym: string;
}

export const UserQuestion: React.FC<UserQuestionProps> = ({ initialAcronym }) => {
    const { data, isError, error, isFetching, navigateQuestions, currentQuestionNumber, currentSubject } = useUserQuestion({ initialAcronym });
    // const [initialValue, setInitialValue] = useState(initialAcronym);
    const form = useForm<FormSchemaForAnswers>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            selectedOption: undefined, // Ensure no option is selected by default
        },
    });

    function onSubmit(data: FormSchemaForAnswers) {

        // console.log("Submitted data:", data.selectedOption);
    }

    const handleNavigate = (direction: 'next' | 'prev') => {
        navigateQuestions(direction);
    };



    return (
        <div className="flex flex-row h-screen bg-white dark:bg-gray-900">
            <span className="inline-flex fixed top-24 left-16 md:left-1/3 transform -translate-x-1/2 px-3 py-0.5 rounded-full text-sm font-medium bg-green-500 text-white z-10">
                Timer:
                <span className="font-mono ml-1">00:30:00</span>
            </span>
            <BatteryStatus />
            <Button className="fixed bottom-1 left-1 w-auto sm:w-auto px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Submit
            </Button>
            <Button className="fixed bottom-1 right-1 w-auto sm:w-auto px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                See progress
            </Button>
            <aside className="hidden lg:flex lg:flex-col lg:w-1/4 bg-gray-100 dark:bg-gray-800 overflow-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Questions</h2>
                    <div className="grid grid-cols-5 gap-2 mt-4" />
                </div>
            </aside>
            <main className="flex flex-col items-center justify-center flex-1 p-4 relative md:p-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Question {currentQuestionNumber}</h2>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{currentSubject}</h2>
                        </div>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{data.question}</p>
                        <FormField
                            control={form.control}
                            name="selectedOption"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormControl>
                                        <div className="mt-6 space-y-4">
                                            <RadioGroup id={`${data.question}`}  {...field}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                                defaultValue=''

                                                aria-labelledby="question1" className="flex flex-col space-y-2" >
                                                <Label className="flex items-center space-x-2" >
                                                    <RadioGroupItem className="peer" value="optionA" />
                                                    <span className="text-gray-900 dark:text-gray-100">{data.optionA}</span>
                                                </Label>
                                                <Label className="flex items-center space-x-2" >
                                                    <RadioGroupItem className="peer" value="optionB" />
                                                    <span className="text-gray-900 dark:text-gray-100">{data.optionB}</span>
                                                </Label>
                                                <Label className="flex items-center space-x-2" >
                                                    <RadioGroupItem className="peer" value="optionC" />
                                                    <span className="text-gray-900 dark:text-gray-100">{data.optionC}</span>
                                                </Label>
                                                <Label className="flex items-center space-x-2" >
                                                    <RadioGroupItem className="peer" value="optionD" />
                                                    <span className="text-gray-900 dark:text-gray-100">{data.optionD}</span>
                                                </Label>
                                            </RadioGroup>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                            <Button type="submit" onClick={() => handleNavigate('prev')} className="w-full sm:w-1/3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                Prev Question
                            </Button>
                            <Button type="submit" onClick={() => handleNavigate('next')} className="w-full sm:w-1/3 text-white bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                                Next Question
                            </Button>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    );
};
