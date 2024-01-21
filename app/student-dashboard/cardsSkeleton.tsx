import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
    return (
        <main className="flex-1 p-4  mx-auto">
            {/* Skeleton for the first card */}
            <div className="max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4 p-4">
                    <Skeleton className="rounded-full" style={{ width: '100px', height: '100px' }} />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="p-4">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            {/* Skeleton for the second card */}
            <div className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="p-4">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>

            {/* Skeleton for the third card */}
            <div className="max-w-md mx-auto mt-4 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="p-4">
                    <Skeleton className="h-6 w-1/2 mb-2" />
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </main>
    );
}
import React from 'react'

export const TwoCardSkeleton = () => {
    return (
        <div className="flex">
            <div className="max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4 p-4">
                    <Skeleton className="rounded-full" style={{ width: '100px', height: '100px' }} />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
            <div className="max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center space-x-4 p-4">
                    <Skeleton className="rounded-full" style={{ width: '100px', height: '100px' }} />
                    <div>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <div className="space-y-2 p-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    )
}


// components/CardSkeleton.tsx

interface CardSkeletonProps {
    amount: number;
    orientation?: 'vertical' | 'horizontal';
}

export const CardSkeletonArray: React.FC<CardSkeletonProps> = ({ amount, orientation = 'vertical' }) => {
    const containerClasses = orientation === 'vertical' ? 'space-y-4' : 'flex flex-wrap gap-4';

    return (
        <div className={containerClasses}>
            {Array.from({ length: amount }, (_, index) => (
                <div className="max-w-md mx-auto shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-4 p-4">
                        <Skeleton className="rounded-full" style={{ width: '100px', height: '100px' }} />
                        <div>
                            <Skeleton className="h-6 w-48 mb-2" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <div className="space-y-2 p-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
};

