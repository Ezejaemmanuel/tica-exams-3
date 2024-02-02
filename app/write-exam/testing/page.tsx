import React, { Suspense } from 'react'
import SubjectBadges from './aside'

const UserQuestionTest = () => {
    // const userId = getUserId();
    // if (!userId) {
    //     redirect("/sign-in")
    // }
    return (
        <Suspense fallback={<div>loading.....</div>}>
            <SubjectBadges />
        </Suspense>
    )
}

export default UserQuestionTest