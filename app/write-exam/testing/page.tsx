import React, { Suspense } from 'react'
import UserQuestion from '../[sub]/_exam-components/usequstion'

const UserQuestionTest = () => {
    return (
        <Suspense>
            <UserQuestion userId={''} initialAcronym={'E-1'} />
        </Suspense>
    )
}

export default UserQuestionTest