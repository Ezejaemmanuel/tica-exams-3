import React, { Dispatch, SetStateAction } from 'react';
import { formatDistanceToNow, parseISO, addMinutes, formatDistance } from 'date-fns';
import { useExamStatus, ExamStatusResponse } from "@/lib/tenstack-hooks/exam-status";
import { Dialog, DialogContent } from "../ui/dialog";
import { ExamNotAvailable, ExamAvailable, ExamOngoing, ExamCompleted } from "@/components/card-status";
import { ExamStatus } from '@/app/api/exam-status/aside-functions';

interface ExamStatusProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    classLevel: 'jss1' | 'ss1';
}

export const ExamStatusPage: React.FC<ExamStatusProps> = ({ isOpen, setIsOpen, classLevel }) => {
    const { data: examStatusData, isLoading, isError } = useExamStatus(classLevel);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !examStatusData) {
        return <div>Error loading exam status.</div>;
    }

    const examState: ExamStatus = examStatusData.status;
    const examDate: Date | null = examStatusData.examDate || null;
    const examLength: number = examStatusData.length || 0; // Length of the exam in minutes
    const now = new Date();

    let timeUntilExam = '';
    let timeSinceExam = '';
    let examEndTime: Date | null = null;

    if (examDate) {
        timeUntilExam = formatDistanceToNow(examDate);
        examEndTime = addMinutes(examDate, examLength);
        timeSinceExam = formatDistance(now, examEndTime);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-transparent">
                {(() => {
                    switch (examState) {
                        case ExamStatus.NotYet:
                            return <ExamNotAvailable content="The exam is not yet available." setIsOpen={setIsOpen} />;
                        case ExamStatus.ExamDateSet:
                            const availableContent = `The exam is set to start in ${timeUntilExam} and will last for ${examLength} minutes.`;
                            return <ExamAvailable content={availableContent} setIsOpen={setIsOpen} />;
                        case ExamStatus.ExamOngoing:
                            const ongoingContent = `The exam started ${timeSinceExam} ago. Time remaining: ${examEndTime ? formatDistance(now, examEndTime) : ''}.`;
                            return <ExamOngoing content={ongoingContent} setIsOpen={setIsOpen} />;
                        case ExamStatus.ExamFinished:
                            const completedContent = `The exam finished ${timeSinceExam} ago.`;
                            return <ExamCompleted content={completedContent} setIsOpen={setIsOpen} />;
                        case ExamStatus.ResultOut:
                            return <div>Results are out!</div>;
                        default:
                            return <div>Unknown status: {examState}</div>;
                    }
                })()}
            </DialogContent>
        </Dialog>
    );
};
