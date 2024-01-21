import React, { Suspense } from 'react'
import ExamStatusComponent from './aside'
import { TwoCardSkeleton } from '@/app/student-dashboard/cardsSkeleton'

const ExamStatusPage = () => {
    return (
        <Suspense fallback={<TwoCardSkeleton />}>

            <ExamStatusComponent />
        </Suspense>

    )
}

export default ExamStatusPage