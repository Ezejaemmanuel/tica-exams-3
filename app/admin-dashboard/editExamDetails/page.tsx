import React, { Suspense } from 'react'
import { SetExamDetailsForm } from './aside'

const SetExamDetails = () => {
    return (
        <div>
            <Suspense>
                <SetExamDetailsForm />
            </Suspense>
        </div>
    )
}

export default SetExamDetails