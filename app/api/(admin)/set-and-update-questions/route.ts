// pages/api/questions/[examId].ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { FormValues } from '@/app/admin-dashboard/setExams/[...slug]/new-form';
import { checkAuthPermission } from '@/lib/auth/utils';


async function checkExamExists(examId: string) {
    const exam = await prisma.exam.findUnique({
        where: { id: examId },
    });
    if (!exam) {
        throw new Error(`Exam with ID ${examId} does not exist.`);
    }
}
export async function POST(req: NextRequest) {
    await checkAuthPermission("only_admin_and_superadmin");

    console.log('Received POST request');
    const examId = req.nextUrl.searchParams.get('examId');
    const subject = req.nextUrl.searchParams.get("subject");
    console.log(`Exam ID: ${examId}, Subject: ${subject}`);
    const questionData: FormValues = await req.json();
    console.log('Question data received:', questionData);
    if (!examId) {
        console.log('Invalid examId, sending 400 response');
        return NextResponse.json({ error: 'Invalid examid' }, { status: 400 });
    }
    try {
        // Check if the exam exists before proceeding
        await checkExamExists(examId);

        console.log(`Attempting to create a new question for subject: ${subject}`);
        // The rest of your POST method logic here...
    } catch (error) {
        console.error('Failed to create question:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
        }
    }

    try {
        console.log(`Attempting to create a new question for subject: ${subject}`);
        if (subject === "english") {
            const newQuestion = await prisma.englishQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                    examId: examId,
                },
            });
            console.log('English question created successfully:', newQuestion);
            return NextResponse.json({ message: 'English question created successfully' });
        } else if (subject === "maths") {
            const newQuestion = await prisma.mathQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                    examId: examId,
                },
            });
            console.log('Math question created successfully:', newQuestion);
            return NextResponse.json({ message: 'Math question created successfully' });
        } else if (subject === "generalStudies") {
            const newQuestion = await prisma.generalStudiesQuestion.create({
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                    examId: examId,
                },
            });
            console.log('General Studies question created successfully:', newQuestion);
            return NextResponse.json({ message: 'General Studies question created successfully' });
        } else {
            console.log('Invalid subject, sending 400 response');
            return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to create question:', error);
        return NextResponse.json({ error: 'Failed to create question' }, { status: 400 });
    }
}

export async function PUT(req: NextRequest) {
    console.log('Received PUT request');
    const questionData: FormValues = await req.json();
    console.log('Question data received:', questionData);
    const examId = req.nextUrl.searchParams.get('examId');
    if (!examId) {
        return NextResponse.json({ error: 'No exam ID provided' }, { status: 400 });
    }
    const subject = req.nextUrl.searchParams.get("subject");
    console.log(`Exam ID: ${examId}, Subject: ${subject}, Question ID: ${questionData.questionId}`);
    if (!questionData.questionId) {
        console.log('Question ID is required for update, sending 400 response');
        return NextResponse.json({ error: 'Question ID is required for update.' }, { status: 400 });
    }
    try {
        // Check if the exam exists before proceeding
        await checkExamExists(examId);

        console.log(`Attempting to create a new question for subject: ${subject}`);
        // The rest of your POST method logic here...
    } catch (error) {
        console.error('Failed to create question:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
        }
    }
    try {
        console.log(`Attempting to update question with ID: ${questionData.questionId} for subject: ${subject}`);
        if (subject === "english") {
            const updatedQuestion = await prisma.englishQuestion.update({
                where: { id: questionData.questionId },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                },
            });
            console.log('English question updated successfully:', updatedQuestion);
            return NextResponse.json({ message: 'English question updated successfully' });
        } else if (subject === "maths") {
            const updatedQuestion = await prisma.mathQuestion.update({
                where: { id: questionData.questionId },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                },
            });
            console.log('Math question updated successfully:', updatedQuestion);
            return NextResponse.json({ message: 'Math question updated successfully' });
        } else if (subject === "generalStudies") {
            const updatedQuestion = await prisma.generalStudiesQuestion.update({
                where: { id: questionData.questionId },
                data: {
                    question: questionData.question,
                    optionA: questionData.optionA,
                    optionB: questionData.optionB,
                    optionC: questionData.optionC,
                    optionD: questionData.optionD,
                    correctAnswer: questionData.answer,
                },
            });
            console.log('General Studies question updated successfully:', updatedQuestion);
            return NextResponse.json({ message: 'General Studies question updated successfully' });
        } else {
            console.log('Invalid subject, sending 400 response');
            return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to update question:', error);
        return NextResponse.json({ error: 'Failed to update question' }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest) {
    console.log('Received DELETE request');
    const examId = req.nextUrl.searchParams.get('examId');
    const subject = req.nextUrl.searchParams.get('subject');
    const questionId = req.nextUrl.searchParams.get('questionId');
    console.log(`Exam ID: ${examId}, Subject: ${subject}, Question ID: ${questionId}`);

    if (!examId || !subject || !questionId) {
        console.log('Invalid parameters, sending 400 response');
        return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }
    try {
        // Check if the exam exists before proceeding
        await checkExamExists(examId);

        console.log(`Attempting to create a new question for subject: ${subject}`);
        // The rest of your POST method logic here...
    } catch (error) {
        console.error('Failed to create question:', error);
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        } else {
            return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
        }
    }
    try {
        console.log(`Attempting to delete question with ID: ${questionId} for subject: ${subject}`);
        if (subject === "english") {
            await prisma.englishQuestion.delete({
                where: { id: questionId },
            });
            console.log('English question deleted successfully');
            return NextResponse.json({ message: 'English question deleted successfully' });
        } else if (subject === "maths") {
            await prisma.mathQuestion.delete({
                where: { id: questionId },
            });
            console.log('Math question deleted successfully');
            return NextResponse.json({ message: 'Math question deleted successfully' });
        } else if (subject === "generalStudies") {
            await prisma.generalStudiesQuestion.delete({
                where: { id: questionId },
            });
            console.log('General Studies question deleted successfully');
            return NextResponse.json({ message: 'General Studies question deleted successfully' });
        } else {
            console.log('Invalid subject, sending 400 response');
            return NextResponse.json({ error: 'Invalid subject' }, { status: 400 });
        }
    } catch (error) {
        console.error('Failed to delete question:', error);
        return NextResponse.json({ error: 'Failed to delete question' }, { status: 400 });
    }
}
