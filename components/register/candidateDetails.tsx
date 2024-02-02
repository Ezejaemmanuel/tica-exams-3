// CandidateDetails.tsx
"use client";
import React from 'react';
import { Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface CandidateDetailsProps {
    control: Control;
}

const CandidateDetails: React.FC<CandidateDetailsProps> = ({ control }) => {
    return (
        <div className="min-h-screen  bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
            <div className="container max-w-screen-lg mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                    <div className="grid  gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                        <div className="text-gray-600 dark:text-gray-400">
                            <p className="font-medium text-lg">Candidate Details</p>
                            <p>Please fill out all the fields.</p>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                {/* Candidate's Full Name */}
                                <FormField
                                    control={control}
                                    name="candidatesFullName"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Candidate&apos;s Full Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Date of Birth */}
                                <FormField
                                    control={control}
                                    name="dateOfBirth"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Date of Birth</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Date of Baptism */}
                                <FormField
                                    control={control}
                                    name="dateOfBaptism"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Date of Baptism</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Date of Holy Communion */}
                                <FormField
                                    control={control}
                                    name="dateOfHolyCommunion"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Date of Holy Communion</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* Date of Holy Confirmation */}
                                <FormField
                                    control={control}
                                    name="dateOfHolyConfirmation"
                                    render={({ field }) => (
                                        <FormItem className="md:col-span-5">
                                            <FormLabel>Date of Holy Confirmation</FormLabel>
                                            <FormControl>
                                                <Input {...field} type="date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
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

export default CandidateDetails;
