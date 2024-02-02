"use client";
import React from 'react';
import { Control, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '../ui/select';

interface FamilyStatusProps {
    control: Control;
}

const FamilyStatus: React.FC<FamilyStatusProps> = ({ control }) => {
    const { register } = useFormContext();

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600 dark:text-gray-400">
                            <p className="font-medium text-lg">Family Status</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Parent Deceased */}
                                <FormField
                                    control={control}
                                    name="parentDeceased"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Is your father or mother deceased?</FormLabel>
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
                                {/* Catholic */}
                                <FormField
                                    control={control}
                                    name="catholic"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Are you a Catholic?</FormLabel>
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
                                {/* Denomination */}
                                <FormField
                                    control={control}
                                    name="denomination"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Mention your denomination</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Supports Entry */}
                                <FormField
                                    control={control}
                                    name="supportsEntry"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Do you support his entering our college?</FormLabel>
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
                                {/* Can Sponsor */}
                                <FormField
                                    control={control}
                                    name="canSponsor"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Are you able to sponsor him?</FormLabel>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FamilyStatus;
