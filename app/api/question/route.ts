// pages/api/getUserQuestion.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

// A mapping from acronyms to Prisma model names
const subjectModelMap: Record<string, keyof typeof prisma> = {
    E: 'englishQuestion',
    M: 'mathQuestion',
    G: 'generalStudiesQuestion',
};

export async function GET(req: NextRequest) {
    // Parse the URL search parameters
    const searchParams = new URL(req.url).searchParams;

    // Retrieve the userId and questionAcronym from the search parameters
    const userId = searchParams.get('userId');
    const questionAcronym = searchParams.get('questionAcronym');
    console.log("Received parameters:", { userId, questionAcronym });

    // Check if the required parameters are present
    if (!userId || !questionAcronym) {
        console.error("Missing parameters");
        return new NextResponse(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
    }

    // Split the questionAcronym into subject acronym and question number
    const [subjectAcronym, questionNumber] = questionAcronym.split('-');
    console.log("Parsed acronym and question number:", { subjectAcronym, questionNumber });

    // Get the corresponding Prisma model name using the subject acronym
    const questionModel = subjectModelMap[subjectAcronym];
    console.log("Determined question model:", questionModel);

    // Check if the subject acronym is valid
    if (!questionModel) {
        console.error("Invalid subject acronym");
        return NextResponse.json({ error: 'Invalid subject acronym' }, { status: 400 });
    }

    try {
        // Find the UserExam entry for the given user and class level "JSS1"
        const userExam = await prisma.userExam.findFirst({
            where: {
                userId: userId,
                examFinished: false,
                exam: {
                    classLevel: 'JSS1', // Use the class level "JSS1"
                },
            },
            include: {
                exam: true, // Include the related exam
            },
        });

        // Check if the UserExam entry was found
        if (!userExam) {
            console.error("UserExam not found for user or e:", userId);
            return NextResponse.json({ error: 'UserExam not found' }, { status: 404 });
        }

        // Fetch the question from the appropriate subject model based on the examId
        // Define a type that includes all model names in Prisma that have a `findUnique` method
        type PrismaModelWithFindUnique = keyof Pick<typeof prisma, 'englishQuestion' | 'mathQuestion' | 'generalStudiesQuestion'>;

        // Use a type assertion to tell TypeScript that `questionModel` is of the type `PrismaModelWithFindUnique`
        const questionModel = subjectModelMap[subjectAcronym] as PrismaModelWithFindUnique;

        // Now TypeScript knows that `prisma[questionModel]` has a `findUnique` method
        const question = await prisma[questionModel].findUnique({
            where: {
                examId_questionNumber: {
                    examId: userExam.examId,
                    questionNumber: parseInt(questionNumber),
                },
            },
        });

        // Check if the question was found
        if (!question) {
            console.error("Question not found");
            return NextResponse.json({ error: 'Question not found' }, { status: 404 });
        }

        // Return the question data
        console.log("Returning question data:", question);
        return NextResponse.json(question, { status: 200 });
    } catch (error) {
        // Handle any unexpected errors
        console.error("An unknown error occurred", error);
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
