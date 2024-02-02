// SidebarSkeleton.tsx
import React from 'react';
import { Skeleton } from '../ui/skeleton';

const SidebarSkeleton = () => {
    return (
        <nav className="space-y-10">
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-md p-2">
                    <Skeleton className="w-5 h-5" />
                    <Skeleton className="w-36 h-4" />
                </div>
            ))}
        </nav>
    );
};

export default SidebarSkeleton;
