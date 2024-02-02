import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

export const UserQuestionSkeleton = () => {
    return (
        <div className="flex flex-col items-center justify-center min-w-24 p-4 relative md:p-8">
            <div className="w-full max-w-2xl min-w-[300px] p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
                {/* Mimic the header with question number and subject */}
                <div className="flex items-center justify-between mb-4">
                    <Skeleton className="h-6 w-1/4 rounded-md" />
                    <Skeleton className="h-6 w-1/4 rounded-md" />
                </div>
                {/* Mimic the question text */}
                <Skeleton className="h-4 w-full rounded-md mb-6" />
                {/* Mimic the options */}
                <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                    <Skeleton className="h-4 w-3/4 rounded-md" />
                </div>
                {/* Mimic the navigation buttons */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <Skeleton className="h-10 w-full sm:w-1/3 rounded-md" />
                    <Skeleton className="h-10 w-full sm:w-1/3 rounded-md" />
                </div>
            </div>
        </div>
    );
};
