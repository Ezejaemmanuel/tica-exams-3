

// Import necessary modules and types
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { kv } from '@vercel/kv';
import { UserExam } from '@prisma/client';
import { getUserId } from '@/lib/auth/utils';
import { safeKVOperation } from '@/lib/api/redis/safeKvOperation';

// Define the type for the question without a question number
interface QuestionType {
    id: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray<T>(array: T[]): T[] {
    //console.log('Shuffling array:', array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    //console.log('Shuffled array:', array);
    return array;
}

// Function to create a random mapping of question IDs to numbers
function createRandomMapping(questions: { id: string }[], subjectAcronym: string): Record<string, string> {
    //console.log(`Creating random mapping for subject ${subjectAcronym} with questions:`, questions);
    const shuffledQuestions = shuffleArray(questions);
    const mapping: Record<string, string> = {};
    shuffledQuestions.forEach((question, index) => {
        const number = index + 1;
        mapping[`${subjectAcronym}-${number}`] = question.id;
    });
    //console.log(`Created mapping for subject ${subjectAcronym}:`, mapping);
    return mapping;
}

// Function to generate and store the random question mapping in Redis
async function generateRandomQuestionMapping(userId: string, examId: string): Promise<Record<string, string>> {
    //console.log(`Generating random question mapping for user ${userId} and exam ${examId}`);
    const englishQuestions = await prisma.englishQuestion.findMany({
        where: { examId },
        select: { id: true }
    });
    const mathQuestions = await prisma.mathQuestion.findMany({
        where: { examId },
        select: { id: true }
    });
    const generalStudiesQuestions = await prisma.generalStudiesQuestion.findMany({
        where: { examId },
        select: { id: true }
    });
    const englishMapping = createRandomMapping(englishQuestions, 'E');
    const mathMapping = createRandomMapping(mathQuestions, 'M');
    const generalStudiesMapping = createRandomMapping(generalStudiesQuestions, 'G');

    const combinedMapping = { ...englishMapping, ...mathMapping, ...generalStudiesMapping };
    //console.log("this is the question mapping", combinedMapping);
    const cacheKey = `tica:questionMapping:${userId}:${examId}`;
    await kv.set(cacheKey, combinedMapping);
    //console.log(`Stored combined mapping in Redis with key ${cacheKey}:`, combinedMapping);

    return combinedMapping;
}

// Function to get userExam data, first from cache, then from database if necessary
async function getUserExamData(userId: string): Promise<UserExam | null> {
    //console.log(`Getting userExam data for user ${userId}`);
    const cacheKey = `tica:userExam:${userId}`;
    let userExam: UserExam | null = await kv.get<UserExam>(cacheKey);
    //console.log(`Cache hit for userExam data:`, userExam);

    if (!userExam) {
        //console.log(`Cache miss for userExam data, querying database for user ${userId}`);
        userExam = await prisma.userExam.findFirst({
            where: { userId, examFinished: false },
            include: { exam: true },
        });
        //console.log(`Queried userExam data from database:`, userExam);

        if (userExam) {
            await kv.set(cacheKey, userExam, { ex: 60 * 60 * 24 });
            //console.log(`Stored userExam data in Redis with key ${cacheKey}:`, userExam);
        }
    }

    return userExam;
}


async function getQuestionData(subjectAcronym: string, questionId: string): Promise<QuestionType | null> {
    //console.log(`Getting question data for subject ${subjectAcronym} and question ID ${questionId}`);
    const cacheKey = `tica:questionData:${questionId}`;

    let question: QuestionType | null = await safeKVOperation(() => kv.get<QuestionType>(cacheKey));
    //console.log(`Cache hit for question data:`, question);

    if (!question) {
        //console.log(`Cache miss for question data, querying database for subject ${subjectAcronym} and question ID ${questionId}`);
        if (subjectAcronym === 'E') {
            question = await prisma.englishQuestion.findUnique({
                where: { id: questionId },
                select: {
                    id: true,
                    question: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                },
            });
        } else if (subjectAcronym === 'M') {
            question = await prisma.mathQuestion.findUnique({
                where: { id: questionId },
                select: {
                    id: true,
                    question: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                },
            });
        } else if (subjectAcronym === 'G') {
            question = await prisma.generalStudiesQuestion.findUnique({
                where: { id: questionId },
                select: {
                    id: true,
                    question: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                },
            });
        }
        //console.log(`Retrieved question data:`, question);

        if (question) {
            await safeKVOperation(() => kv.set(cacheKey, question));
            //console.log(`Stored question data in Redis with key ${cacheKey}:`, question);
        }
    }

    return question;
}
// The GET function for the API endpoint
export async function GET(req: NextRequest): Promise<NextResponse> {
    const userId = getUserId();
    // //console.log('Retrieved user ID:', userId);
    const searchParams = new URL(req.url).searchParams;
    const questionAcronym = searchParams.get('questionAcronym');
    console.log('Retrieved question acronym from search params:', questionAcronym);

    if (!userId || !questionAcronym) {
        //console.log('Missing parameters: userId or questionAcronym is null');
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const userExam = await getUserExamData(userId);
    if (!userExam) {
        //console.log('UserExam not found for user:', userId);
        return NextResponse.json({ error: 'UserExam not found' }, { status: 404 });
    }

    const cacheKey = `tica:questionMapping:${userId}:${userExam.examId}`;
    let questionMapping: Record<string, string> | null = await kv.get<Record<string, string>>(cacheKey);
    //console.log(`Retrieved question mapping from Redis with key ${cacheKey}:`, questionMapping);

    if (!questionMapping) {
        //console.log('Question mapping not found in Redis, generating new mapping');
        questionMapping = await generateRandomQuestionMapping(userId, userExam.examId);
    }

    const [subjectAcronym, questionNumber] = questionAcronym.split('-');
    if (!subjectAcronym || !questionNumber) {
        //console.log('Invalid questionAcronym format:', questionAcronym);
        return NextResponse.json({ error: 'Invalid questionAcronym format' }, { status: 400 });
    }


    const questionId = questionMapping[questionAcronym];
    if (!questionId) {
        //console.log(`Question ID not found in mapping for acronym ${questionAcronym}`);
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    const question = await getQuestionData(subjectAcronym, questionId);
    if (!question) {
        //console.log(`Question data not found for subject ${subjectAcronym} and question ID ${questionId}`);
        return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }

    //console.log('Sending question data in response:', question);
    return NextResponse.json(question, { status: 200 });
}
