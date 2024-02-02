import React, { Suspense } from 'react'
import { UserQuestion } from './aside';
import { UserQuestionSkeleton } from './skeleton';

const UserQuestionTest = () => {
    // const userId = getUserId();
    // if (!userId) {
    //     redirect("/sign-in")
    // }
    return (
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Suspense fallback={<UserQuestionSkeleton />} >
                <UserQuestion initialAcronym={'E-1'} />
            </Suspense>
        </div>
    )
}

export default UserQuestionTest