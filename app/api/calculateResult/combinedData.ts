import { kv } from '@vercel/kv'; // Assuming kv is your configured Vercel KV client
import { getAllAnswers } from '../answer/aside';

console.log('Script started');

// Define interfaces for our data structures
interface QuestionMapping {
    [questionAcronym: string]: string; // Maps question acronyms to question IDs
}

interface UserAnswers {
    [questionAcronym: string]: string; // Maps question acronyms to user's selected options (answers)
}

export interface CombinedQuestionAnswer {
    questionId: string;
    userAnswer: string;
    questionAcronym: string;
}

console.log('Interfaces defined');

// Function to retrieve question mapping and user answers, then combine and store them
export async function CombinedQuestionAnswers(userId: string, examId: string) {
    console.log(`CombinedQuestionAnswers function called with userId: ${userId} and examId: ${examId}`);
    try {
        const questionMappingKey: string = `tica:questionMapping:${userId}:${examId}`;
        console.log(`Retrieving question mapping with key: ${questionMappingKey}`);
        const questionMapping: QuestionMapping | null = await kv.get<QuestionMapping>(questionMappingKey);
        console.log('Question mapping retrieved:', questionMapping);
        if (!questionMapping) {
            throw new Error('Question mapping not found');
        }

        // const userAnswersKey: string = `tica:answers:${userId}`;
        // console.log(`Retrieving user answers with key: ${userAnswersKey}`);
        // const userAnswers: UserAnswers | null = await kv.get<UserAnswers>(userAnswersKey);
        const userAnswers = await getAllAnswers(userId);
        console.log('User answers retrieved:', userAnswers);
        if (!userAnswers) {
            throw new Error('User answers not found');
        }

        console.log('Combining question mapping and user answers');
        const combinedData: CombinedQuestionAnswer[] = Object.entries(userAnswers).map(([questionAcronym, userAnswer]): CombinedQuestionAnswer => {
            const questionId: string = questionMapping[questionAcronym];
            return { questionId, userAnswer, questionAcronym };
        });
        console.log('Combined data:', combinedData);

        const combinedDataKey: string = `tica:combinedData:${userId}`;
        console.log(`Storing combined data with key: ${combinedDataKey}`);
        await kv.set<CombinedQuestionAnswer[]>(combinedDataKey, combinedData);
        console.log('Combined data stored successfully');

        return combinedData;
    } catch (error) {
        console.error('Error retrieving, combining, or storing data:', error);
        throw error;
    }
}

console.log('Function definition complete');

