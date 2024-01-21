// pages/api/questions/[examId].ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export interface QuestionData {
    id?: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: 'A' | 'B' | 'C' | 'D';
    examId: string;
    subject: string;
}

export async function POST(req: NextRequest) {
    const questionData: QuestionData = await req.json();

    try {
        if (questionData.subject === "English") {
            const newQuestion = await prisma.englishQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                    examId: questionData.examId,
                },
            });
            return NextResponse.json({ message: 'English question created successfully' });
        } else if (questionData.subject === "Math") {
            const newQuestion = await prisma.mathQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                    examId: questionData.examId,
                },
            });
            return NextResponse.json({ message: 'Math question created successfully' });
        } else if (questionData.subject === "GeneralStudies") {
            const newQuestion = await prisma.generalStudiesQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                    examId: questionData.examId,
                },
            });
            return NextResponse.json({ message: 'General Studies question created successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to create question:', error);
        return NextResponse.json({ error: 'Failed to create question' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    const questionData: QuestionData = await req.json();

    if (!questionData.id) {
        return NextResponse.json({ error: 'Question ID is required for update.' }, { status: 400 });
    }

    try {
        if (questionData.subject === "English") {
            const updatedQuestion = await prisma.englishQuestion.update({
                where: { id: questionData.id },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                },
            });
            return NextResponse.json({ message: 'English question updated successfully' });
        } else if (questionData.subject === "Math") {
            const updatedQuestion = await prisma.mathQuestion.update({
                where: { id: questionData.id },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                },
            });
            return NextResponse.json({ message: 'Math question updated successfully' });
        } else if (questionData.subject === "GeneralStudies") {
            const updatedQuestion = await prisma.generalStudiesQuestion.update({
                where: { id: questionData.id },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.correctAnswer,
                },
            });
            return NextResponse.json({ message: 'General Studies question updated successfully' });
        } else {
            return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to update question:', error);
        return NextResponse.json({ error: 'Failed to update question' }, { status: 400 });
    }
}
