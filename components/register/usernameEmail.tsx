// UserNameEmail.tsx
"use client";

import React from 'react';
import { FieldValues, Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface UserNameEmailProps {
    control: Control<FieldValues>;
    key_: string;
}

const UserNameEmail: React.FC<UserNameEmailProps> = ({ control, key_ }) => {
    return (
        <div key={key_} className="max-w-xs p-6 mx-auto mt-6 bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg md:max-w-lg">
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
                    name="class"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Class</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none">
                                        <SelectValue placeholder="Select the class that you are applying for" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="jss1">JSS1</SelectItem>
                                    <SelectItem value="ss1">SS1</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Please enter the class that you are applying for here.
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
