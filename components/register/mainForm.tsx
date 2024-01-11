// MainForm.tsx
"use client";
import React, { useState } from 'react';
import { useForm, Control, FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import * as z from 'zod';
import { Form } from '../ui/form';
import parsePhoneNumberFromString from 'libphonenumber-js/min';
import Address from './address';
import DobGender from './dobGenter';
import UserNameEmail from './usernameEmail';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export type FormData = {
    name: string;
    email: string;
    class: string;
    dob: string;
    phoneNumber: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    country: string;
};

const registerUser = async (userData: FormData) => {
    const response = await fetch('api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    const data: { message: string } = await response.json();
    //console.log("this is the transactions that is returned", data);
    return data;
};
export const MainForm: React.FC = () => {
    const router = useRouter();
    const mutation = useMutation<{ message: string }, Error, FormData>({
        mutationKey: ['registerUser'],
        mutationFn: registerUser,
        onSuccess(data, variables, context) {

            toast.loading(` successfully registered ....redirecting to dashboard in 2 seconds`, { duration: 2000, important: true })
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);

        },
        onError(error, variables, context) {
            console.log(`An error occurred: ${error}`);
            toast.error(`an error:${error.message}`);
        },
    });

    const onSubmit = (data: FieldValues) => {
        const formData = data as FormData; // Type assertion
        console.log("thsi is the formdata", formData);
        toast.promise(
            mutation.mutateAsync(formData),
            {
                loading: 'Registering user...',
                success: (data) => {
                    return `User ${data.message} has been registered`;
                },
                error: 'Error registering user!',
            }
        );
    }
    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email().min(1, { message: "Email is required" }),
        class: z.string().min(1, { message: "Class is required" }),
        dob: z.string().min(1, { message: "Date of Birth is required" }),
        phoneNumber: z.string().min(1, { message: "Phone number is required" }).refine((data) => {
            if (!data) return false; // Check if there's any input
            const phoneNumber = parsePhoneNumberFromString(data);
            return phoneNumber?.isValid() || false; // Check if the phone number is valid
        }, { message: "Invalid phone number" }),
        address: z.string().min(1, { message: "Address is required" }),
        locality: z.string().min(1, { message: "Locality is required" }),
        city: z.string().min(1, { message: "City is required" }),
        state: z.string().min(1, { message: "State is required" }),
        country: z.string().min(1, { message: "Countrry is required" }),
    });

    const [activeStep, setActiveStep] = useState(0);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const { control, handleSubmit, formState: { errors }, trigger } = form;



    const handleNext = async () => {
        let isValid;
        switch (activeStep) {
            case 0:
                isValid = await trigger(["name", "email", "class"]);
                break;
            case 1:
                isValid = await trigger(["dob", "phoneNumber", "gender"]);
                break;
            case 2:
                isValid = await trigger(["address", "locality", "city", "state", "country"]);
                break;
            default:
                isValid = false;
        }
        if (isValid) {
            setActiveStep((prevStep) => prevStep + 1); // go to next step
        }
    };

    const formElements = [<UserNameEmail control={control} />, <DobGender control={control} />, <Address control={control} />];

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center min-h-screen bg-slate-300 dark:bg-black'>
                {formElements[activeStep]}
                <div className='flex flex-wrap mx-auto gap-x-6'>
                    <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep(prev => prev - 1)}
                        className={`px-4 py-2 rounded-xl text-white ${activeStep === 0 ? "opacity-50 bg-slate-600" : "opacity-100 hover:bg-blue-500 focus:bg-blue-700"}`}>
                        Back
                    </Button>
                    <Button
                        disabled={activeStep === formElements.length - 1}
                        onClick={handleNext}
                        className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeStep === formElements.length - 1 ? "opacity-50 bg-slate-600" : "opacity-100 hover:bg-blue-700 focus:bg-blue-800"}`}>
                        Next
                    </Button>
                    {
                        activeStep === formElements.length - 1 ? <Button className='px-4 py-2 text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:bg-blue-800' type='submit'>Submit</Button> : null
                    }
                </div>
            </form>
        </Form>
    );
};

export default MainForm;



