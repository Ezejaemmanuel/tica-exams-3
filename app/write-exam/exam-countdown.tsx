"use client";
import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { differenceInMinutes } from 'date-fns';
import { SubmitState, useExamSubmitStore } from '@/lib/store/zuestand-store';
import { ExamStatus, useExamStatus } from '@/lib/tenstack-hooks/exam-status';
import { toast } from 'sonner';

const ExamCountdown: React.FC = () => {
    const { isError, data: examStatusData } = useExamStatus();
    const { shouldSubmit, setShouldSubmit } = useExamSubmitStore();

    // State to store calculated values for rendering
    const [examEndTime, setExamEndTime] = useState<Date | null>(null);
    const [totalMinutes, setTotalMinutes] = useState<number>(0);

    useEffect(() => {
        if (!examStatusData || examStatusData.status !== ExamStatus.ExamOngoing || isError) {
            return;
        }

        const examDateTime = new Date(examStatusData.examDateTime!);
        const endTime = new Date(examDateTime.getTime() + (examStatusData.length || 0) * 60000);
        setExamEndTime(endTime);

        const now = new Date();
        const minutes = differenceInMinutes(endTime, now);
        setTotalMinutes(minutes);

        const notify = (message: string) => toast.info(message, {
            position: "top-right",
            className: "sm:text-xs",
            duration: 3000
        });
        const warn = (message: string) => toast.error(message, {
            position: "top-right",
            className: "sm:text-xs",
            duration: 3000
        });

        // Timer notifications
        if (minutes === 30) notify("⏳ You have written for so long, 30 minutes remaining. Please crosscheck your work!");
        if (minutes === 20) notify("⏳ 20 minutes left. Time to finalize your answers!");
        if (minutes === 15) warn("⚠️ Only 15 minutes left. Make sure you've answered all questions!");
        if (minutes === 10) {
            warn("⚠️ 10 minutes remaining. Start wrapping things up!");
        }
        if (minutes === 5) warn("⚠️ 5 minutes left. Don't forget to review your answers!");
        if (minutes === 2) warn("⚠️ Only 2 minutes! Almost time's up!");
        if (minutes === 1) warn("⚠️ Last minute! Make it count!");
        if (minutes <= 0.5) warn("⚠️ 30 seconds! Hurry up!");
    }, [isError, examStatusData, setShouldSubmit]);

    if (!examStatusData || examStatusData.status !== ExamStatus.ExamOngoing || isError || !examEndTime) {
        return null;
    }

    const examDateTime = new Date(examStatusData.examDateTime!);
    const totalTime = differenceInMinutes(examEndTime, examDateTime);
    const percentageLeft = (totalMinutes / totalTime) * 100;

    const getBackgroundColorClass = () => {
        if (percentageLeft >= 100) return 'bg-green-500';
        if (percentageLeft >= 90) return 'bg-green-400';
        if (percentageLeft >= 80) return 'bg-green-300';
        if (percentageLeft >= 70) return 'bg-yellow-300';
        if (percentageLeft >= 60) return 'bg-yellow-400';
        if (percentageLeft >= 50) return 'bg-yellow-500';
        if (percentageLeft >= 40) return 'bg-yellow-600';
        if (percentageLeft >= 30) return 'bg-red-400';
        if (percentageLeft >= 20) return 'bg-red-500';
        if (percentageLeft >= 10) return 'bg-red-600';
        if (percentageLeft >= 5) return 'bg-red-700';
        return 'bg-red-800';
    };

    return (
        <Countdown
            date={examEndTime}
            onComplete={() => {
                // Check the current state before setting it to ShouldSubmit
                if (shouldSubmit !== SubmitState.ShouldSubmit && shouldSubmit !== SubmitState.Submitted) {
                    setShouldSubmit(SubmitState.ShouldSubmit);
                }
            }}
            renderer={({ days, hours, minutes, seconds, completed }) => {
                if (completed) {
                    return <span className="inline-flex fixed top-24 left-16 md:left-1/3 transform -translate-x-1/2 px-3 py-0.5 rounded-full text-xs md:text-sm font-medium bg-green-500 text-white z-10">
                        Exam Finished
                    </span>
                } else {
                    const timeLeft = `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    const bgColorClass = getBackgroundColorClass();
                    const pulseClass = totalMinutes <= 10 ? 'animate-pulse' : '';
                    return (
                        <div>
                            <span className={`inline-flex fixed top-30 md:top-24 left-16 md:left-1/3 transform -translate-x-1/2 px-3 py-0.5 rounded-full text-xs md:text-sm font-medium ${bgColorClass} text-white z-10 ${pulseClass}`}>
                                Time left:
                                <span className="font-mono ml-1"> {timeLeft} </span>
                            </span>
                        </div>
                    )
                }
            }}
        />
    );
};

export default ExamCountdown;
