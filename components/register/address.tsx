// Address.tsx
"use client";
import React from 'react';
import { FieldValues, Control } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface AddressProps {
    control: Control<FieldValues>;
}

const Address: React.FC<AddressProps> = ({ control }) => {
    return (
        <div className="w-full max-w-lg px-8 pt-6 pb-8 mx-auto mb-4 bg-slate-100 dark:bg-gray-900 rounded shadow-md">
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <FormField
                        control={control}
                        name="address"
                        render={({ field }: { field: FieldValues }) => (
                            <FormItem>
                                <FormLabel className="text-yellow-500 dark:text-yellow-300">Full Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="address" {...field} className="bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 mt-1 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <FormField
                        control={control}
                        name="locality"
                        render={({ field }: { field: FieldValues }) => (
                            <FormItem>
                                <FormLabel className="text-yellow-500 dark:text-yellow-300">Locality</FormLabel>
                                <FormControl>
                                    <Input placeholder="Locality" {...field} className="bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 mt-1 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </div>

            <div className="flex flex-wrap mb-2 -mx-3">
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <FormField
                        control={control}
                        name="city"
                        render={({ field }: { field: FieldValues }) => (
                            <FormItem>
                                <FormLabel className="text-yellow-500 dark:text-yellow-300">City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} className="bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 mt-1 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <FormField
                        control={control}
                        name="state"
                        render={({ field }: { field: FieldValues }) => (
                            <FormItem>
                                <FormLabel className="text-yellow-500 dark:text-yellow-300">State</FormLabel>
                                <FormControl>
                                    <Input placeholder="State" {...field} className="bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 mt-1 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="w-full px-3 mb-6 md:w-1/3 md:mb-0">
                    <FormField
                        control={control}
                        name="country"
                        render={({ field }: { field: FieldValues }) => (
                            <FormItem>
                                <FormLabel className="text-yellow-500 dark:text-yellow-300">Country</FormLabel>
                                <FormControl>
                                    <Input placeholder="Country" {...field} className="bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm p-2 mt-1 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default Address;
