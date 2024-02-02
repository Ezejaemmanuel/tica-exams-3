import { NextRequest, NextResponse } from 'next/server';
import { englishQuestions } from './english';
import { generalKnowledgeQuestions } from './general';
import { mathQuestions } from './maths';
import { prisma } from '@/lib/db';
import { Option } from '@prisma/client';
export async function GET(request: NextRequest) {
    try {
        const selectedExamId = "JSS2-feb-2024-jss2_first_exam";

        await createQuestions(selectedExamId);

        return NextResponse.json({ message: "Data generation completed successfully." }, { status: 200 });
    } catch (error) {
        console.error('Failed to create user auth:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

async function createQuestions(selectedExamId: string) {
    const questionCreatedAt = new Date();
    const questionUpdatedAt = new Date();

    for (const question of englishQuestions) {
        await prisma.englishQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A,
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }

    for (const question of mathQuestions) {
        await prisma.mathQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A,
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }

    for (const question of generalKnowledgeQuestions) {
        await prisma.generalStudiesQuestion.create({
            data: {
                question: question.question,
                optionA: question.optionA,
                optionB: question.optionB,
                optionC: question.optionC,
                optionD: question.optionD,
                correctAnswer: Option.A,
                examId: selectedExamId,
                createdAt: questionCreatedAt,
                updatedAt: questionUpdatedAt,
            },
        });
    }
}
