"use client";
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface ParentDetailsProps {
    control: Control;
}

const ParentDetails: React.FC<ParentDetailsProps> = ({ control }) => {
    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600 dark:text-gray-400">
                            <p className="font-medium text-lg">Parent Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Father's Name */}
                                <FormField
                                    control={control}
                                    name="fathersName"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Name Of Father</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Mother's Name */}
                                <FormField
                                    control={control}
                                    name="mothersName"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Name Of Mother</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Home Town */}
                                <FormField
                                    control={control}
                                    name="homeTown"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Home Town</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* State of Origin */}
                                <FormField
                                    control={control}
                                    name="stateOfOrigin"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>State of Origin</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Local Government Area */}
                                <FormField
                                    control={control}
                                    name="localGovernmentArea"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Local Government Area</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Residential Address */}
                                <FormField
                                    control={control}
                                    name="residentialAddress"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Residential Address</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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

export default ParentDetails;
