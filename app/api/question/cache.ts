import { UserExam } from "@prisma/client";
import { prisma } from "@/lib/db";
import { safeKVOperation } from "../safeKvOperation";
import { kv } from "@vercel/kv";
interface QuestionType {
    id: string;
    questionNumber: number;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
}
const subjectModelMap: Record<string, keyof typeof prisma> = {
    E: 'englishQuestion',
    M: 'mathQuestion',
    G: 'generalStudiesQuestion',
};
export async function getUserExamData(userId: string): Promise<UserExam | null> {
    const cacheKey = `tica:userExam:${userId}`;
    console.log('Attempting to retrieve userExam from cache with key:', cacheKey);
    let userExam: UserExam | null = await safeKVOperation(() => kv.get<UserExam>(cacheKey));

    if (!userExam) {
        console.log('userExam not found in cache, fetching from database for userId:', userId);
        userExam = await prisma.userExam.findFirst({
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

        if (userExam) {
            console.log('userExam fetched from database:', userExam);
            // Cache the userExam data for 24 hours if fetched from the database
            await safeKVOperation(() => kv.set(cacheKey, userExam, { ex: 60 * 60 * 24 }));
            console.log('userExam data cached for 24 hours with key:', cacheKey);
        } else {
            console.log('userExam not found in database for userId:', userId);
            throw new Error("userExam not found in database for userId:");

        }
    } else {
        console.log('userExam retrieved from cache:', userExam);
    }

    return userExam;
}

// Function to get question data, first from cache, then from database if necessary
export async function getQuestionData(userExamId: string, subjectAcronym: string, questionNumber: number): Promise<QuestionType | null> {
    const cacheKey = `tica:question:${userExamId}:${subjectAcronym}:${questionNumber}`;
    console.log('Attempting to retrieve question from cache with key:', cacheKey);
    let question: QuestionType | null = await safeKVOperation(() => kv.get<QuestionType>(cacheKey));

    if (!question) {
        console.log('Question not found in cache, fetching from database for subjectAcronym and questionNumber:', { subjectAcronym, questionNumber });

        // Determine the Prisma model to query based on the subject acronym
        const questionModel = subjectModelMap[subjectAcronym];
        if (!questionModel) {
            console.error('Invalid subject acronym:', subjectAcronym);
            return null;
        }

        // Fetch the question from the appropriate subject model based on the examId

        // Check which model to query based on the questionModel value
        if (questionModel === 'englishQuestion') {
            question = await prisma.englishQuestion.findUnique({
                where: {
                    examId: userExamId,
                    questionNumber: questionNumber,
                },
                select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    question: true,
                    questionNumber: true,

                }
            });
        } else if (questionModel === 'mathQuestion') {
            question = await prisma.mathQuestion.findUnique({
                where: {
                    examId: userExamId,
                    questionNumber: questionNumber,


                },
                select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    question: true,
                    questionNumber: true,

                }
            });
        } else if (questionModel === 'generalStudiesQuestion') {
            question = await prisma.generalStudiesQuestion.findUnique({
                where: {
                    examId: userExamId,
                    questionNumber: questionNumber,
                },
                select: {
                    id: true,
                    optionA: true,
                    optionB: true,
                    optionC: true,
                    optionD: true,
                    question: true,
                    questionNumber: true,

                }
            });
        } else {
            console.error("Invalid question model");
            throw new Error("Invalid question model");

        }

        if (question) {
            console.log('Question fetched from database:', question);
            // Cache the question data for 24 hours if fetched from the database
            await safeKVOperation(() => kv.set(cacheKey, question, { ex: 60 * 60 * 24 }));
            console.log('Question data cached for 24 hours with key:', cacheKey);
        } else {
            console.log('Question not found in database for subjectAcronym and questionNumber:', { subjectAcronym, questionNumber });
        }
    } else {
        console.log('Question retrieved from cache:', question);
    }

    return question;
}