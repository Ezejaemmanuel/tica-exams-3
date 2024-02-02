// PaymentProofsSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const PaymentProofsSkeleton = () => {
    return (
        <div>
            {Array.from({ length: 3 }).map((_, index) => (
                <section key={index} className="flex flex-col md:flex-row bg-gray-900 rounded-lg h-auto md:h-96 w-full justify-center p-10 ring-2 ring-yellow-700 my-4">
                    <div className="md:w-1/3 overflow-auto flex justify-center">
                        <Skeleton className="h-40 w-40" />
                    </div>
                    <div className="md:w-2/3 space-y-3 p-6">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-36" />
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </section>
            ))}
        </div>
    );
};

export default PaymentProofsSkeleton;
