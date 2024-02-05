import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Option } from '@prisma/client';
import { englishQuestions } from './english';
import { generalKnowledgeQuestions } from './general';
import { mathQuestions } from './maths';

export async function GET(request: NextRequest) {
    try {
        // Fetch all examIds from the database
        const exams = await prisma.exam.findMany({
            select: {
                id: true, // Only select the id field
            },
        });

        // For each exam, create the questions
        for (const exam of exams) {
            await createQuestions(exam.id);
        }

        return NextResponse.json({ message: "Data generation completed successfully for all exams." }, { status: 200 });
    } catch (error) {
        console.error('Failed to create questions:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function createQuestions(selectedExamId: string) {
    const questionCreatedAt = new Date();
    const questionUpdatedAt = new Date();

    // Create English questions
    for (const question of englishQuestions) {
        await prisma.englishQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A, // Assuming correct answer is always Option A for simplicity
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }

    // Create Math questions
    for (const question of mathQuestions) {
        await prisma.mathQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A, // Assuming correct answer is always Option A for simplicity
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }

    // Create General Knowledge questions
    for (const question of generalKnowledgeQuestions) {
        await prisma.generalStudiesQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A, // Assuming correct answer is always Option A for simplicity
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }
}

export const dynamic = "force-dynamic"
