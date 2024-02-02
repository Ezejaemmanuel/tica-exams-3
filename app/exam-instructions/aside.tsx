// ExamInstructions.tsx
"use client";
import 'react-vertical-timeline-component/style.min.css';

import React, { ReactNode } from 'react';
import { useTheme } from 'next-themes';
import SectionHeading from './section-heading';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import { Book, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { useExamSummary } from '@/lib/tenstack-hooks/exam-summary';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useExamSummaryZuestanded } from '@/lib/tenstack-hooks/exam-summary-2';

interface ExamSubject {
    name: string;
    questionCount: number;
}

interface ExamStep {
    className: string;
    contentStyle: React.CSSProperties;
    contentArrowStyle: React.CSSProperties;
    date: string;
    iconStyle: React.CSSProperties;
    icon: ReactNode;
    title: string;
    content: string;
}

interface ExamInstructionsProps {
    subjects: ExamSubject[];
    examDuration: number; // in minutes
}

const ExamInstructions: React.FC = () => {
    const searchParams = useSearchParams();
    const examId = searchParams.get("examId");
    const router = useRouter();

    // const { data: examSummary } = useExamSummary();
    const { data: examSummary } = useExamSummaryZuestanded();
    const { resolvedTheme } = useTheme();

    const getThemeStyles = (lightStyle: React.CSSProperties, darkStyle: React.CSSProperties) => {
        return resolvedTheme === 'light' ? lightStyle : darkStyle;
    };

    const steps: ExamStep[] = [
        {
            className: "bg-blue-200",
            contentStyle: getThemeStyles(
                { background: 'rgb(0, 0, 255)', color: '#fff' },
                { background: 'rgb(0, 0, 128)', color: '#fff' }
            ),
            contentArrowStyle: getThemeStyles(
                { borderRight: '7px solid  rgb(0, 0, 255)' },
                { borderRight: '7px solid  rgb(0, 0, 128)' }
            ),
            date: "Before the Exam",
            iconStyle: getThemeStyles(
                { background: 'rgb(0, 0, 255)', color: '#fff' },
                { background: 'rgb(0, 0, 128)', color: '#fff' }
            ),
            icon: <Book />,
            title: "Review the Subjects",
            content: `Make sure to review the following subjects: ${examSummary.subjects.map(s => s.name).join(', ')}.`,
        },
        {
            className: "bg-green-200",
            contentStyle: getThemeStyles(
                { background: 'rgb(0, 128, 0)', color: '#fff' },
                { background: 'rgb(0, 64, 0)', color: '#fff' }
            ),
            contentArrowStyle: getThemeStyles(
                { borderRight: '7px solid  rgb(0, 128, 0)' },
                { borderRight: '7px solid  rgb(0, 64, 0)' }
            ),
            date: "Exam Duration",
            iconStyle: getThemeStyles(
                { background: 'rgb(0, 128, 0)', color: '#fff' },
                { background: 'rgb(0, 64, 0)', color: '#fff' }
            ),
            icon: <Clock />,
            title: "Keep Track of Time",
            content: `The exam will last a total of ${examSummary.examDuration} minutes. Manage your time wisely to answer all questions.`,
        },
        {
            className: "bg-yellow-200",
            contentStyle: getThemeStyles(
                { background: 'rgb(255, 255, 0)', color: '#000' },
                { background: 'rgb(128, 128, 0)', color: '#000' }
            ),
            contentArrowStyle: getThemeStyles(
                { borderRight: '7px solid  rgb(255, 255, 0)' },
                { borderRight: '7px solid  rgb(128, 128, 0)' }
            ),
            date: "Answering Questions",
            iconStyle: getThemeStyles(
                { background: 'rgb(255, 255, 0)', color: '#000' },
                { background: 'rgb(128, 128, 0)', color: '#000' }
            ),
            icon: <CheckCircle />,
            title: "Answer Confidently",
            content: `Start with the questions you know well to secure those points early on. There are ${examSummary.subjects.map(s => `${s.questionCount} questions in ${s.name}`).join(', ')}.`,
        },
        {
            className: "bg-red-200",
            contentStyle: getThemeStyles(
                { background: 'rgb(255, 0, 0)', color: '#fff' },
                { background: 'rgb(128, 0, 0)', color: '#fff' }
            ),
            contentArrowStyle: getThemeStyles(
                { borderRight: '7px solid  rgb(255, 0, 0)' },
                { borderRight: '7px solid  rgb(128, 0, 0)' }
            ),
            date: "Unsure Questions",
            iconStyle: getThemeStyles(
                { background: 'rgb(255, 0, 0)', color: '#fff' },
                { background: 'rgb(128, 0, 0)', color: '#fff' }
            ),
            icon: <HelpCircle />,
            title: "Attempt All Questions",
            content: "If unsure, make an educated guess. There's no penalty for wrong answers.",
        },
    ];

    return (
        <section id="exam-instructions" className="relative scroll-mt-28 mb-28  mt-24 sm:mb-40">
            <SectionHeading>Exam Instructions</SectionHeading>
            <VerticalTimeline lineColor="yellow" animate={true}>
                {steps.map((step, index) => (
                    <VerticalTimelineElement
                        key={index}
                        dateClassName='text-rose-500'
                        visible={true}
                        contentStyle={step.contentStyle}
                        contentArrowStyle={step.contentArrowStyle}
                        date={step.date}
                        icon={step.icon}
                        iconStyle={step.iconStyle}
                    >
                        <h3 className={`font-extrabold capitalize text-lg ${index % 2 === 0 ? "text-yellow-600" : "text-yellow-400"}`}>{step.title}</h3>
                        <p className="font-normal text-base leading-relaxed dark:text-white text-black !mt-0">{step.content}</p>
                    </VerticalTimelineElement>
                ))}
            </VerticalTimeline>
            <Button onClick={() => router.push("/write-exam")}>
                start Exam
            </Button>
        </section>
    );
};

export default ExamInstructions;
