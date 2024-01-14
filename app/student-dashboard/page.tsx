import React, { Suspense } from 'react'
import { CardSkeleton } from './cardsSkeleton'
import MainContents from './mainContents'

const StudentDashboard = () => {
    return (
        <div className='mx-auto'>
            <Suspense fallback={<CardSkeleton />}>

                <MainContents />

            </Suspense>
        </div>
    )
}

export default StudentDashboard