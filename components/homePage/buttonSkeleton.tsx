import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ButtonSkeleton = () => {
    return (
        <div className="mt-8 flex flex-wrap gap-4 text-center">
            {/* <Skeleton draggable className="block w-full rounded px-12 py-3 sm:w-auto" /> */}
            <Skeleton className="block w-full rounded px-16 py-3 sm:w-auto" >
                loading
            </Skeleton>
            <Skeleton className="block w-full rounded px-12 py-3 sm:w-auto" />
        </div>
    )
}

export default ButtonSkeleton