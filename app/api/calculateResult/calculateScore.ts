import { PrismaClient, Result } from '@prisma/client';
import { fetchQuestionsAndAddUserAnswers } from './aside';
import { prisma } from '@/lib/db';

console.log('Script started');

// Assuming fetchQuestionsAndAddUserAnswers is implemented as discussed

export async function calculateScoresAndSave(userId: string, examId: string): Promise<Result> {
    console.log(`Starting calculateScoresAndSave for userId: ${userId} and examId: ${examId}`);

    const userExam = await prisma.userExam.findUnique({
        where: {
            userId,
            examId,
        },
    });

    console.log('UserExam retrieved:', userExam);

    if (!userExam) {
        console.error('UserExam not found');
        throw new Error('UserExam not found');
    }

    const userExamId = userExam.id;
    console.log(`UserExam ID: ${userExamId}`);

    const questionsWithUserAnswers = await fetchQuestionsAndAddUserAnswers(userId, examId);
    console.log('Questions with user answers:', questionsWithUserAnswers);

    if (!questionsWithUserAnswers) {
        console.error('Failed to fetch questions or combine data');
        throw new Error('Failed to fetch questions or combine data');
    }

    // Initialize scores
    let englishScore = 0;
    let mathScore = 0;
    let generalStudiesScore = 0;

    console.log('Calculating scores');

    // Calculate scores
    questionsWithUserAnswers.forEach(question => {
        const subject = question.questionAcronym ? question.questionAcronym.charAt(0) : '';
        if (question.userAnswer && question.userAnswer === question.correctAnswer) {
            switch (subject) {
                case 'E':
                    englishScore++;
                    break;
                case 'M':
                    mathScore++;
                    break;
                case 'G':
                    generalStudiesScore++;
                    break;
            }
        }
    });

    console.log(`Scores calculated: English: ${englishScore}, Math: ${mathScore}, General Studies: ${generalStudiesScore}`);

    // Calculate total score
    const totalScore = englishScore + mathScore + generalStudiesScore;
    console.log(`Total score: ${totalScore}`);

    // Calculate aggregate score
    // Assuming there are equal numbers of questions in each subject
    const aggregate = (englishScore + mathScore + generalStudiesScore) / 3;
    console.log(`Aggregate score: ${aggregate}`);

    // Save or update the result in the database
    console.log('Saving result to database');
    const result = await prisma.result.upsert({
        where: {
            userId: userId,
            examId: examId,
        },
        update: {
            englishScore,
            mathsScore: mathScore, // Note: Ensure the field name matches your schema (mathsScore or mathScore)
            generalStudiesScore,
            totalScore,
            aggregate,
        },
        create: {
            userId,
            examId,
            englishScore,
            mathsScore: mathScore, // Note: Ensure the field name matches your schema (mathsScore or mathScore)
            generalStudiesScore,
            totalScore,
            aggregate,
            userExamId,
            position: 0, // Placeholder, calculate as needed
            passed: true, // Placeholder, set based on your passing criteria
        },
    });

    console.log('Result saved:', result);

    return result;
}

console.log('Function definition complete');
