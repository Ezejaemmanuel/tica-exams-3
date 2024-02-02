// CheckAuthenticatedUser.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { ExamStatus, useExamStatus } from '@/lib/tenstack-hooks/exam-status';
import Countdown from 'react-countdown';
import { formatDistanceToNowStrict, isWithinInterval } from 'date-fns';
import { useUser } from '@clerk/nextjs';
import { useUserInfo } from '@/lib/tenstack-hooks/userInfo';
import IsGoingOn from './isgoingon';

export const CheckAuthenticatedUser: React.FC = () => {
    //console.log('CheckAuthenticatedUser: Rendering component');
    const pathname = usePathname(); // Use the usePathname hook to get the current pathname
    const { isSignedIn } = useUser();

    // If the pathname is '/write-exam', do not display the component
    if (pathname === '/write-exam' || pathname === '/admin-dashboard' || !isSignedIn) {
        return null;
    }
    //console.log('CheckAuthenticatedUser: User signed in status:', isSignedIn);


    //console.log('CheckAuthenticatedUser: User is signed in, proceeding to fetch user info');
    return <ExamCountdown />;

};

// FetchUserInfo.tsx





// ExamCountdown.tsx



// ExamCountdown.tsx
// ExamCountdown.tsx



const ExamCountdown: React.FC = () => {
    const { isError, data: examStatusData } = useExamStatus();
    const [status, setStatus] = useState('not-yet');

    useEffect(() => {
        if (isError || !examStatusData || !examStatusData.examDateTime || typeof examStatusData.length !== 'number') {
            setStatus('error'); // Use a new status for error or missing data
            return;
        }

        const { examDateTime, length } = examStatusData;
        const updateStatus = () => {
            const now = new Date();
            const examDate = new Date(examDateTime);
            const examEnd = new Date(examDate.getTime() + length * 60000);

            if (now < examDate) {
                setStatus('exam-date-set');
            } else if (now >= examDate && now <= examEnd) {
                setStatus('exam-ongoing');
            } else if (now > examEnd) {
                setStatus('exam-finished');
            }
        };

        updateStatus();
        const intervalId = setInterval(updateStatus, 60000);

        return () => clearInterval(intervalId);
    }, [examStatusData, isError]);
    if (status === 'error') {
        return null;
    }
    switch (status) {
        case 'exam-date-set':
            return (
                <Countdown

                    date={examStatusData && examStatusData.examDateTime ? new Date(examStatusData.examDateTime) : new Date()}
                    renderer={({ days, hours, minutes, seconds, completed }) => {

                        const isFinalHour = days === 0 && hours < 1;
                        const countdownClass = isFinalHour ? 'bg-red-500 animate-pulse' : 'bg-green-500';
                        return (
                            <div className={`fixed top-0 left-0 w-full ${countdownClass} text-black text-sm text-center z-50 p-2`}>
                                Exam starts in... {days ? `${days} days, ` : ''}{hours ? `${hours} hours, ` : ''}{minutes ? `${minutes} minutes, ` : ''}{seconds.toString().padStart(2, '0')} seconds
                            </div>
                        );

                    }}
                />
            );

        case 'exam-ongoing':
            return <IsGoingOn />;

        case 'exam-finished':

            const finishedSince = examStatusData && examStatusData.examDateTime ? formatDistanceToNowStrict(new Date(examStatusData.examDateTime)) : '';
            return <div className='fixed top-0 left-0 w-full bg-red-300 text-black text-sm text-center z-50 p-2'>Exam finished {finishedSince} ago</div>;

        case 'error':
            // Handle the error state or missing data here
            return <div>No exam yet 2</div>;


        default:
            return <div>No exam yet 3</div>;

    }
};

export default ExamCountdown;
