import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SidebarSkeleton = () => {
    return (
        <>
            {/* Timer Skeleton */}
            <Skeleton className="fixed top-24 left-16 md:left-1/3 transform -translate-x-1/2 px-3 py-0.5 rounded-full w-24" />

            {/* Battery Status Skeleton */}
            <Skeleton className="fixed top-24 right-16 md:right-1/3 transform translate-x-1/2 px-3 py-0.5 rounded-full w-24" />

            {/* Submit Button Skeleton */}
            <Skeleton className="fixed bottom-1 left-1 w-24 h-10 rounded-md" />

            {/* See Progress Button Skeleton */}
            <Skeleton className="fixed bottom-1 right-1 w-32 h-10 rounded-md" />

            {/* Sidebar Skeleton */}
            <aside className="hidden lg:flex lg:flex-col lg:w-1/4 bg-gray-100 dark:bg-gray-800 overflow-auto">
                <Skeleton className="m-4 h-6 w-3/4 rounded-md" />
                <Skeleton className="m-4 h-full w-full rounded-md" />
            </aside>
        </>
    )
}

export default SidebarSkeleton