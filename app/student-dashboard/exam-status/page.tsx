import React, { Suspense } from 'react'
import ExamStatus from './aside'

const ExamStatusPage = () => {
    return (
        <Suspense fallback={<div>loading-</div>}>
            <ExamStatus classLevel={'jss1'} />
        </Suspense>
    )
}

export default ExamStatusPage