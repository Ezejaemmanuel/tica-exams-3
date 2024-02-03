// pages/calculateResult.tsx
"use client";
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addBaseURL } from '@/lib/addBaseUrl';
import { PuffLoader } from 'react-spinners';
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import { SubmitState, useExamSubmitStore, useUserExamStatusStore } from '@/lib/store/zuestand-store';
import { UserExamStatus } from '@/lib/api/redis/exam-status';
import { useRouter } from 'next/navigation';

const CalculateResult = () => {
    const router = useRouter();
    const { shouldSubmit, setShouldSubmit } = useExamSubmitStore();
    const queryClient = useQueryClient();

    const { updateUserExamStatus } = useUserExamStatusStore();

    const { mutateAsync: calculateResultMutation, isPending, isError, isSuccess } = useMutation({
        mutationKey: ['calculateResult'],
        mutationFn: async () => {
            const response = await fetch(addBaseURL('api/calculateResult'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include necessary data for the mutation
            });

            if (!response.ok) {
                throw new Error('Failed to calculate result');
            }

            return response.json();
        },
        onSuccess: () => {
            updateUserExamStatus(UserExamStatus.ResultPresent);
            setShouldSubmit(SubmitState.Submitted)
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            router.push('/student-dashboard');
        },
    });

    useEffect(() => {
        calculateResultMutation();
    }, []);

    return (
        <div className="flex justify-center items-center bg-white dark:bg-black h-screen">
            {isPending && <PuffLoader color="#36D7B7" size={150} />}
            {isError && <MdCancel className="text-red-500" size="150" />}
            {isSuccess && <MdCheckCircle className="text-green-500" size="150" />}
        </div>
    );
};

export default CalculateResult;
