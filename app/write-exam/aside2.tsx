
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import SubjectBadges from './subjectSection'
import ExamCountdown from './exam-countdown'
import BatteryStatus from './batteryStatus'

const SideBarAndCo = () => {
    return (
        <>

            <BatteryStatus />
            <Suspense >
                <ExamCountdown />
            </Suspense>

            <aside className="hidden md:flex md:flex-col md:w-1/4 bg-gray-100 dark:bg-gray-800 overflow-auto">
                <div className="p-4">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Questions</h2>
                    <SubjectBadges />
                </div>
            </aside>
        </>
    )
}

export default SideBarAndCo