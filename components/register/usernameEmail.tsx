// UserNameEmail.tsx
"use client";

import React from 'react';
import { FieldValues, Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useExamIds } from '@/lib/tenstack-hooks/exam-ids';

interface UserNameEmailProps {
    control: Control<FieldValues>;
}

const UserNameEmail: React.FC<UserNameEmailProps> = ({ control, }) => {
    const { examIds, error } = useExamIds();
    return (
        <div className="max-w-xs p-6 mx-auto mt-6 bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg md:max-w-lg">
            <div className="mb-10">
                <FormField
                    control={control}
                    name="name"
                    render={({ field }: { field: FieldValues }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Official fullname</FormLabel>
                            <FormControl>
                                <Input size={50} placeholder="Username..." {...field} className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={control}
                    name="email"
                    render={({ field }: { field: FieldValues }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Official Email</FormLabel>
                            <FormControl>
                                <Input size={50} placeholder="Email..." {...field} className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div>
                <FormField
                    control={control}
                    name="examId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Exam ID</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none">
                                        <SelectValue placeholder="Select your exam" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {examIds?.map((examId) => {
                                        // Assuming examId is in the format "classLevel-month-year-uniqueId"
                                        const [classLevel, month, year, uniqueId] = examId.split('-');
                                        const displayText = `Exam for class ${classLevel} that will take place in ${month} ${year} with exam ID: ${uniqueId}`;
                                        return (
                                            <SelectItem key={examId} value={examId}>
                                                {displayText}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Please select your exam ID.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default UserNameEmail;
