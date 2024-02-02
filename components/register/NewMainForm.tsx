// MainForm.tsx
"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner'; // Assuming 'sonner' is a typo for a toast library

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import CandidateDetails from './candidateDetails';
import ParentDetails from './question3';
import FamilyStatus from './question4';
import CandidateProfile from './question5';
import SchoolDetails from './questionSection2';
import parsePhoneNumberFromString from 'libphonenumber-js/min';
import { addBaseURL } from '@/lib/addBaseUrl';
// Create a Date object for today
const today = new Date();

// Set the time to 2 AM
today.setHours(2, 0, 0, 0); // 2 AM, 0 minutes, 0 seconds, 0 milliseconds

// Convert to UTC time string in 24-hour format
const internationalTime = today.toLocaleTimeString('en-US', {
    hour12: false,
    timeZone: 'UTC'
});

console.log(internationalTime); // Outputs: "02:00:00"


const formSchema = z.object({
    candidatesFullName: z.string().min(1, { message: "Candidate's Full Name is required" }),
    dateOfBirth: z.string().min(1, { message: "Date of Birth is required" }),
    dateOfBaptism: z.string().min(1, { message: "Date of Baptism is required" }),
    dateOfHolyCommunion: z.string().optional(),
    dateOfHolyConfirmation: z.string().optional(),
    presentSchool: z.string().min(1, { message: "Present School is required" }),
    presentClass: z.string().min(1, { message: "Present Class is required" }),
    finishedPrimary: z.enum(['yes', 'no']),
    massServer: z.enum(['yes', 'no']),
    piousSociety: z.enum(['yes', 'no']),

    examId: z.string().min(1, { message: "Exam ID is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }).refine((data) => {
        if (!data) return false; // Check if there's any input
        const phoneNumber = parsePhoneNumberFromString(data);
        return phoneNumber?.isValid() || false; // Check if the phone number is valid
    }, { message: "Invalid phone number" }),
    fathersName: z.string().min(1, { message: "Father's Name is required" }),
    mothersName: z.string().min(1, { message: "Mother's Name is required" }),
    homeTown: z.string().min(1, { message: "Home Town is required" }),
    stateOfOrigin: z.string().min(1, { message: "State of Origin is required" }),
    localGovernmentArea: z.string().min(1, { message: "Local Government Area is required" }),
    residentialAddress: z.string().min(1, { message: "Residential Address is required" }),
    parentDeceased: z.enum(['yes', 'no']),
    catholic: z.enum(['yes', 'no']),
    denomination: z.string().min(1, { message: "Denomination is required" }),
    supportsEntry: z.enum(['yes', 'no']),
    canSponsor: z.enum(['yes', 'no']),
    candidateProfile: z.string().min(1, { message: "Candidate's Profile is required" }),
});
export type FormSchema = z.infer<typeof formSchema>;

export const MainForm: React.FC = () => {
    const router = useRouter();
    const mutation = useMutation<{ message: string }, Error, FormSchema>({
        mutationKey: ['registerCandidate'],
        mutationFn: async (formData) => {
            // Your submission logic here
            const url = addBaseURL(`api/register`);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("this is hte error data", errorData);
                throw new Error(errorData.error);
            }

            return await response.json();
        },
        onSuccess(data) {
            toast.success(`Candidate registered successfully: ${data.message}`);
            router.push('/student-dashboard');
        },
        onError(error) {
            toast.error(`Registration failed: ${error.message}`);
        },
    });

    const [activeStep, setActiveStep] = useState(0);
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const { handleSubmit, control, trigger } = form;

    const onSubmit = (data: any) => {
        const typedData = data as FormSchema;
        console.log("this is the data that is submitted ", data);
        mutation.mutate(typedData);
    };

    const handleNext = async () => {
        const stepFields = [
            ['candidatesFullName', 'dateOfBirth', 'dateOfBaptism', 'dateOfHolyCommunion', 'dateOfHolyConfirmation'],
            ['presentSchool', 'presentClass', 'finishedPrimary', 'massServer', 'piousSociety', 'examId'],
            ['fathersName', 'mothersName', 'homeTown', 'stateOfOrigin', 'localGovernmentArea', 'residentialAddress'],
            ['parentDeceased', 'catholic', 'denomination', 'supportsEntry', 'canSponsor'],
            ['candidateProfile']
        ];

        const isValid = await trigger(stepFields[activeStep]);
        if (isValid) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const formElements = [
        <CandidateDetails key="candidate-details" control={control} />,
        <SchoolDetails key="school-details" control={control} />,
        <ParentDetails key="parent-details" control={control} />,
        <FamilyStatus key="family-status" control={control} />,
        <CandidateProfile key="candidate-profile" />,
    ];

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-center min-h-screen mx-auto  w-full md:max-w-[50%]  '>
                {formElements[activeStep]}
                <div className='flex flex-wrap mx-auto gap-x-6'>
                    <Button
                        disabled={activeStep === 0}
                        onClick={() => setActiveStep((prev) => prev - 1)}
                        className='button-style'>
                        Back
                    </Button>
                    {activeStep < formElements.length - 1 && (
                        <Button
                            onClick={handleNext}
                            className='button-style'>
                            Next
                        </Button>
                    )}
                    {activeStep === formElements.length - 1 && (
                        <Button type='submit' disabled={mutation.isPending} className=' disabled:bg-pink-500'>Submit</Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default MainForm;
