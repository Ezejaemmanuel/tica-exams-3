// DobGender.tsx
"use client";
import React, { useState } from 'react';
import { FieldValues, Control, useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

interface DobGenderProps {
    control: Control<FieldValues>;
    key_: string;
}

const DobGender: React.FC<DobGenderProps> = ({ control, key_ }) => {
    const { setValue, watch } = useFormContext(); // useFormContext hook to access setValue
    const phoneNumberValue = watch("phoneNumber"); // This will watch the phoneNumber field for changes
    const [phone, setPhone] = useState(phoneNumberValue);
    return (
        <div key={key_} className="max-w-xs p-6 mx-auto mt-6 bg-slate-100 dark:bg-gray-900 rounded-lg shadow-lg md:max-w-lg">
            <div className="relative inline-block w-64 mb-10">
                <FormField
                    control={control}
                    name="gender"
                    render={({ field }: { field: FieldValues }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Gender</FormLabel>
                            <p className='text-red-500 text-xs'>This school is only meant for boys....you should not sign in if you are a girl </p>
                            <FormControl>
                                <Input placeholder="Gender" size={70} {...field} value={"MALE"} className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" disabled />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="w-full md:w-fit">
                <FormField
                    control={control}
                    name="dob"
                    render={({ field }: { field: FieldValues }) => (
                        <FormItem>
                            <FormLabel className="text-yellow-500 dark:text-yellow-300">Date of Birth</FormLabel>
                            <FormControl>
                                <Input placeholder="Date of Birth" size={50} {...field} type='date' className="p-2 mt-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="w-full md:w-fit">
                <FormField
                    control={control}
                    name="phoneNumber"
                    render={({ field: { onChange, onBlur, name, ref } }) => (
                        <FormItem>
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
            </div>
        </div>
    );
};

export default DobGender;
