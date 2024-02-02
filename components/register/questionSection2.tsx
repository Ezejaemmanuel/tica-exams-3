"use client";
import React, { useState } from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../ui/select';
import { useExamIds } from '@/lib/tenstack-hooks/exam-ids';
import 'react-phone-number-input/style.css'

import PhoneInput from 'react-phone-number-input'

interface SchoolDetailsProps {
    control: Control;
}

const SchoolDetails: React.FC<SchoolDetailsProps> = ({ control }) => {
    const { examIds, error } = useExamIds();
    const { setValue, watch } = useFormContext(); // useFormContext hook to access setValue
    const phoneNumberValue = watch("phoneNumber"); // This will watch the phoneNumber field for changes
    const [phone, setPhone] = useState(phoneNumberValue);

    return (
        <div className="min-h-[50vh] p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className=" rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600 dark:text-gray-400">
                            <p className="font-medium text-lg">School Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Present School */}
                                <FormField
                                    control={control}
                                    name="presentSchool"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Present School</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Present Class */}
                                <FormField
                                    control={control}
                                    name="presentClass"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Present Class</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Finished Primary */}
                                <FormField
                                    control={control}
                                    name="finishedPrimary"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Have you finished your primary school?</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Mass Server */}
                                <FormField
                                    control={control}
                                    name="massServer"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Are you a mass server?</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={control}
                                    name="piousSociety"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Are you in any pious ?</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="yes">Yes</SelectItem>
                                                        <SelectItem value="no">No</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Exam ID */}
                                <FormField
                                    control={control}
                                    name="phoneNumber"
                                    render={({ field: { onChange, onBlur, name, ref } }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Phone Number</FormLabel>
                                            <p className='text-red-500 text-xs'>WhatsApp number of parents preferably</p>
                                            <FormControl>
                                                <PhoneInput
                                                    placeholder="WhatsApp number or phone number"
                                                    value={phone}
                                                    onChange={(value) => {
                                                        setPhone(value);
                                                        setValue(name, value); // Update react-hook-form state
                                                    }}
                                                    onBlur={onBlur}
                                                    className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                                                    inputRef={ref} // ref from react-hook-form
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Exam ID */}
                                <FormField
                                    control={control}
                                    name="examId"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolDetails;
