import { $Enums } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { kv } from '@vercel/kv'; // Assuming kv is your configured Vercel KV client
import { CombinedQuestionAnswer, CombinedQuestionAnswers } from './combinedData';

const prisma = new PrismaClient();

interface QuestionWithUserAnswer {
    id: string;
    questionAcronym?: string;
    question: string;
    optionA: string;
    optionB: string;
    optionC: string;
    optionD: string;
    correctAnswer: $Enums.Option;
    userAnswer?: string; // This will be added from the combined data
}

// Function to fetch questions and add user answers
export async function fetchQuestionsAndAddUserAnswers(userId: string, examId: string): Promise<QuestionWithUserAnswer[] | null> {
    console.log(`Starting to fetch questions and add user answers for userId: ${userId} and examId: ${examId}`);
    const cacheKey = `questionsWithUserAnswers:${userId}:${examId}`;

    try {
        // Attempt to retrieve questions with user answers from cache
        console.log(`Attempting to retrieve questions with user answers from cache with key: ${cacheKey}`);
        let questionsWithUserAnswers: QuestionWithUserAnswer[] | null = await kv.get<QuestionWithUserAnswer[]>(cacheKey);

        if (!questionsWithUserAnswers) {
            console.log('Questions with user answers not found in cache, fetching from database...');

            // Fetching combined data
            const combinedDataKey = `tica:combinedData:${userId}:${examId}`;
            let combinedData: CombinedQuestionAnswer[] | null = await kv.get<CombinedQuestionAnswer[]>(combinedDataKey);

            if (!combinedData) {
                console.log('Combined data not found in cache, generating...');
                combinedData = await CombinedQuestionAnswers(userId, examId);
                await kv.set(combinedDataKey, combinedData);
                console.log('Combined data generated and stored in cache.');
            } else {
                console.log('Combined data successfully retrieved from cache.');
            }

            // Fetching all questions for the exam
            console.log('Fetching all questions for the exam...');
            const questions = await prisma.exam.findUnique({
                where: { id: examId },
                include: {
                    englishQuestions: true,
                    mathQuestions: true,
                    generalStudiesQuestions: true,
                },
            });

            if (!questions) {
                console.error('No questions found for the given examId');
                return null;
            } else {
                console.log('Questions successfully fetched from the database.');
            }

            // Flattening all questions into a single array
            console.log('Flattening all questions into a single array...');
            const allQuestions: QuestionWithUserAnswer[] = [
                ...questions.englishQuestions,
                ...questions.mathQuestions,
                ...questions.generalStudiesQuestions,
            ];
            console.log(`Total questions fetched: ${allQuestions.length}`);

            // Adding userAnswer to each question from the combined data
            console.log('Adding userAnswer to each question from the combined data...');
            questionsWithUserAnswers = allQuestions.map(question => {
                const userAnswer = combinedData?.find(item => item.questionId === question.id)?.userAnswer;
                const questionAcronym = combinedData?.find(item => item.questionId === question.id)?.questionAcronym;

                return { ...question, userAnswer, questionAcronym };
            });

            // Caching the fetched and processed questions with user answers
            await kv.set(cacheKey, questionsWithUserAnswers);
            console.log('Questions with user answers successfully fetched from the database and stored in cache.');
        } else {
            console.log('Questions with user answers successfully retrieved from cache.');
        }

        return questionsWithUserAnswers;
    } catch (error) {
        console.error('Error fetching questions or combining data:', error);
        return null;
    }
}
