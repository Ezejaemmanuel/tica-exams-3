// pages/api/getUserQuestion.ts

// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db';

// // A mapping from acronyms to Prisma model names


// export async function GET(req: NextRequest) {
//     // Parse the URL search parameters
//     const searchParams = new URL(req.url).searchParams;

//     // Retrieve the userId and questionAcronym from the search parameters
//     const userId = searchParams.get('userId');
//     const questionAcronym = searchParams.get('questionAcronym');
//     console.log("Received parameters:", { userId, questionAcronym });

//     // Check if the required parameters are present
//     if (!userId || !questionAcronym) {
//         console.error("Missing parameters");
//         return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
//     }

//     // Split the questionAcronym into subject acronym and question number
//     const [subjectAcronym, questionNumber] = questionAcronym.split('-');
//     console.log("Parsed acronym and question number:", { subjectAcronym, questionNumber });

//     // Get the corresponding Prisma model name using the subject acronym
//     const questionModel = subjectModelMap[subjectAcronym];
//     console.log("Determined question model:", questionModel);

//     // Check if the subject acronym is valid
//     if (!questionModel) {
//         console.error("Invalid subject acronym");
//         return NextResponse.json({ error: 'Invalid subject acronym' }, { status: 400 });
//     }

//     // Fetch the question from the appropriate subject model based on the examId
//     try {
//         const userExam = await prisma.userExam.findFirst({
//             where: {
//                 userId: userId,
//                 examFinished: false,
//                 exam: {
//                     classLevel: 'JSS1', // Use the class level "JSS1"
//                 },
//             },
//             include: {
//                 exam: true, // Include the related exam
//             },
//         });

//         // Check if the UserExam entry was found
//         if (!userExam) {
//             console.error("UserExam not found for user or e:", userId);
//             return NextResponse.json({ error: 'UserExam not found' }, { status: 404 });
//         }

//         let question: QuestionType | null;

//         // Check which model to query based on the questionModel value
//         if (questionModel === 'englishQuestion') {
//             question = await prisma.englishQuestion.findUnique({
//                 where: {
//                     examId: userExam.examId,
//                     questionNumber: parseInt(questionNumber),
//                 },
//                 select: {
//                     id: true,
//                     optionA: true,
//                     optionB: true,
//                     optionC: true,
//                     optionD: true,
//                     question: true,
//                     questionNumber: true,

//                 }
//             });
//         } else if (questionModel === 'mathQuestion') {
//             question = await prisma.mathQuestion.findUnique({
//                 where: {
//                     examId: userExam.examId,
//                     questionNumber: parseInt(questionNumber),


//                 },
//                 select: {
//                     id: true,
//                     optionA: true,
//                     optionB: true,
//                     optionC: true,
//                     optionD: true,
//                     question: true,
//                     questionNumber: true,

//                 }
//             });
//         } else if (questionModel === 'generalStudiesQuestion') {
//             question = await prisma.generalStudiesQuestion.findUnique({
//                 where: {
//                     examId: userExam.examId,
//                     questionNumber: parseInt(questionNumber),
//                 },
//                 select: {
//                     id: true,
//                     optionA: true,
//                     optionB: true,
//                     optionC: true,
//                     optionD: true,
//                     question: true,
//                     questionNumber: true,

//                 }
//             });
//         } else {
//             console.error("Invalid question model");
//             return NextResponse.json({ error: 'Invalid question model' }, { status: 400 });
//         }

//         // Check if the question was found
//         if (!question) {
//             console.error("Question not found");
//             return NextResponse.json({ error: 'Question not found' }, { status: 404 });
//         }

//         // Return the question data
//         console.log("Returning question data:", question);
//         return NextResponse.json(question, { status: 200 });
//     } catch (error) {
//         // Handle any unexpected errors
//         console.error("An unknown error occurred", error);
//         return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
//     }
// }


// pages/api/getUserQuestion.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { EnglishQuestion, MathQuestion, GeneralStudiesQuestion, UserExam } from '@prisma/client'; // Import the types from Prisma client
import { kv } from '@vercel/kv';
import { getUserExamData, getQuestionData } from './cache';

// A mapping from acronyms to Prisma model names
const subjectModelMap: Record<string, keyof typeof prisma> = {
    E: 'englishQuestion',
    M: 'mathQuestion',
    G: 'generalStudiesQuestion',
};

interface QuestionType {
    id: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}

// Define the type for the KV operation function

// Function to get userExam data, first from cache, then from database if necessary


export async function GET(req: NextRequest): Promise<NextResponse> {
    // Parse the URL search parameters
    const searchParams = new URL(req.url).searchParams;

    // Retrieve the userId and questionAcronym from the search parameters
    const userId = searchParams.get('userId');
    const questionAcronym = searchParams.get('questionAcronym');
    console.log("Received parameters:", { userId, questionAcronym });

    // Check if the required parameters are present
    if (!userId || !questionAcronym) {
        console.error("Missing parameters");
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Split the questionAcronym into subject acronym and question number
    const [subjectAcronym, questionNumberStr] = questionAcronym.split('-');
    console.log("Parsed acronym and question number:", { subjectAcronym, questionNumberStr });

    // Convert question number to an integer
    const questionNumber = parseInt(questionNumberStr);
    if (isNaN(questionNumber)) {
        console.error("Invalid question number");
        return NextResponse.json({ error: 'Invalid question number' }, { status: 400 });
    }

    // Get the userExam data using the getUserExamData function
    const userExam = await getUserExamData(userId);

    // Check if the userExam was found
    if (!userExam) {
        console.error('UserExam not found for userId:', userId);
        return NextResponse.json({ error: 'UserExam not found' }, { status: 404 });
    }

    // Get the question data using the getQuestionData function
    const question = await getQuestionData(userExam.examId, subjectAcronym, questionNumber);

    // Check if the question was found
    if (!question) {
        console.error('Question not found for userExamId and questionAcronym:', { userExamId: userExam.examId, questionAcronym });
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    // Return the question data
    console.log('Returning question data:', question);
    return NextResponse.json(question, { status: 200 });
}
