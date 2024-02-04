"use client";
import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { addBaseURL } from '@/lib/addBaseUrl';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import { PaymentConfirmationWithUser } from '@/app/api/(admin)/getPaymentProofs/types';



type PymentProofsResponse = PaymentConfirmationWithUser[];

const fetchUsers = async ({ queryKey, pageParam = 1 }: { queryKey: (string | number | undefined)[], pageParam?: number }) => {
    const baseUrl = addBaseURL(`api/getPaymentProofs?page=${pageParam}`)
    const res = await fetch(baseUrl);
    if (!res.ok) {
        const errorData: { error: string } = await res.json();
        console.log("this is the error ooooo", errorData);
        throw new Error(errorData.error);
    }
    const data: PymentProofsResponse = await res.json();
    return data;
};

// type ComponentProps = {
//     payment: PymentProofs;
// };




export type paymentData = {
    name: string;
    examId: string;
    userId: string;
    paymentId: string;
};

type MutationData = paymentData;

function Component({ payment }: { payment: PaymentConfirmationWithUser }) {
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    // const [amount, setAmount] = useState(payment.amount);

    const mutation = useMutation<MutationData, Error, paymentData>({
        mutationFn: async (values: paymentData) => {
            const response = await fetch('/api/confirmPayment', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData)
            }

            return response.json();
        },
        onError() {
            toast.error("something went wrong.......")
        },
        onSuccess(data, variables, context) {
            toast.success("user payment confirmed")
            // queryClient.invalidateQueries({ queryKey: ["users-payment-proofs"] });

        },
    });

    const handleConfirm = () => {
        const promise = mutation.mutateAsync({
            name: payment.user.name,
            examId: payment.examId,
            userId: payment.userId,
            paymentId: payment.id
        });

        toast.promise(
            promise,
            {
                loading: 'Submitting...',
                success: 'Submission successful',
                error: 'Submission failed',
            }
        );
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            <section className="flex flex-col md:flex-row bg-gray-900 text-yellow-300 rounded-lg h-auto md:h-96 w-full items-center justify-center p-10 ring-2 ring-yellow-700">
                <div className="md:w-1/3 overflow-auto flex justify-center">
                    <img
                        alt={payment.user.name}
                        height={800}
                        width={800}
                        className="object-contain md:object-scale-down lg:w-1/2 lg:h-1/2"
                        src={payment.paymentUrl || ""}
                    />
                </div>
                <div className="md:w-1/3 space-y-3 p-6 rounded-sm">
                    <h2 className="text-lg font-semibold">{payment.user.name}</h2>
                    <p className="text-lg">Phone: {payment.user.officialPhoneOrWhatsappNumber}</p>
                    <p className={`text-lg ${payment.paymentConfirmed ? 'text-blue-500' : 'text-red-500'}`}>status: {payment.paymentConfirmed ? 'confirmed' : 'unconfirmed'}</p>

                    <p className="text-xs">Created: {formatDistanceToNow(new Date(payment.createdAt), { addSuffix: true })}</p>
                    <div className='flex space-x-2'>
                        <Button onClick={() => setIsOpen(true)} className=''>
                            confirm payment
                        </Button>
                        <Button>
                            view student
                        </Button>
                    </div>
                </div>
            </section>



            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="transition-all duration-300 ease-in-out bg-gray-800">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-lg font-bold text-white">Confirm Payment</DialogTitle>
                        <p className="text-gray-300 mt-2">Do you want to confirm the payment of {payment.user.name}?</p>
                    </DialogHeader>
                    <form>

                        <DialogFooter className="flex flex-col gap-4 mt-6">
                            <Button onClick={handleConfirm} className="text-gray-900 bg-yellow-500 hover:bg-yellow-400" variant="default">
                                Confirm
                            </Button>
                            <Button onClick={handleCancel} className="text-gray-900 bg-yellow-500 hover:bg-yellow-400" variant="default">
                                Cancel
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}

const PaymentProofsList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        isPending
    } = useSuspenseInfiniteQuery({
        queryFn: fetchUsers,
        queryKey: ['users-payment-proofs'],
        getNextPageParam: (lastPage, allPages) => allPages.length + 1,
        initialPageParam: 1,
        staleTime: 1000 * 60 * 60 * 24,
    });

    return (
        <div className=' gap-4 p-12'>
            {data.pages.map((page, i) => (
                <div key={i} >
                    {page.map((payment) => (
                        <Component key={payment.id} payment={payment} />
                    ))}
                </div>
            ))}
            <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? 'Loading more...'
                    : hasNextPage
                        ? 'Load More'
                        : 'Nothing more to load'}
            </Button>

        </div>
    );
};

export default PaymentProofsList;
